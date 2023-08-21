import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listPoints } from '../../graphql/queries';
import { API, Storage } from 'aws-amplify';
import {
	deletePoint as deletePointMutation,
	createPoint as createPointMutation,
	updatePoint as updatePointMutation,
} from '../../graphql/mutations';

const initialState = {
	pointsData: [],
	status: 'idle',
	drawnMarker: { lat: null, lng: null },
};

const pointsSlice = createSlice({
	name: 'points',
	initialState,
	reducers: {
		drawMarker: (state, action) => {
			state.drawnMarker = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPoints.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchPoints.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.pointsData = action.payload;
			})
			.addCase(fetchPoints.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(deletePoint.fulfilled, (state, action) => {
				state.pointsData = state.pointsData.filter(
					(point) => point.id !== action.payload
				);
			})
			.addCase(addPoint.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(addPoint.fulfilled, (state, action) => {
				const point = action.payload.createPoint;
				state.pointsData.push(point);
				state.status = 'idle';
			})
			.addCase(updatePoint.fulfilled, (state, action) => {
				state.pointsData = state.pointsData.map((point) =>
					point.id === action.payload.id
						? { ...point, ...action.payload }
						: point
				);
				state.status = 'idle';
			});
	},
});

export const fetchPoints = createAsyncThunk('points/fetchPoints', async () => {
	try {
		const apiData = await API.graphql({ query: listPoints });
		const pointsFromAPI = apiData.data.listPoints.items;
		await Promise.all(
			pointsFromAPI.map(async (point) => {
				if (point.image) {
					const url = await Storage.get(point.image);
					point.image = url;
				}
				return point;
			})
		);
		return pointsFromAPI;
	} catch (error) {
		console.log(error);
	}
});

export const deletePoint = createAsyncThunk(
	'points/deletePoint',
	async ({ id, imageName }) => {
		try {
			await Storage.remove(imageName);
			await API.graphql({
				query: deletePointMutation,
				variables: { input: { id } },
			});
			return id;
		} catch (error) {
			console.log(error);
		}
	}
);
export const addPoint = createAsyncThunk('points/addPoint', async (data) => {
	data.imageName = data.image; // grab image name
	try {
		const res = await API.graphql({
			query: createPointMutation,
			variables: { input: data },
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const updatePoint = createAsyncThunk(
	'points/updatePoint',
	async (data) => {
		data.imageName = data.image; // grab image name
		try {
			await API.graphql({
				query: updatePointMutation,
				variables: { input: data },
			});
			return data;
		} catch (error) {
			console.log(error);
		}
	}
);
export const { drawMarker } = pointsSlice.actions;

export default pointsSlice.reducer;

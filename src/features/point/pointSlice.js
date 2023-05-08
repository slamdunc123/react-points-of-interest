import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listPoints } from '../../graphql/queries';
import { API } from 'aws-amplify';
import {
	deletePoint as deletePointMutation,
	createPoint as createPointMutation,
	updatePoint as updatePointMutation,
} from '../../graphql/mutations';

const initialState = {
	pointsData: [],
	status: 'idle',
};

const pointsSlice = createSlice({
	name: 'points',
	initialState,
	reducers: {},
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
			.addCase(addPoint.fulfilled, (state, action) => {
				const point = action.payload.createPoint;
				state.pointsData.push(point);
			})
			.addCase(updatePoint.fulfilled, (state, action) => {
				state.pointsData = state.pointsData.map((point) =>
					point.id === action.payload.id
						? { ...point, ...action.payload }
						: point
				);
			});
	},
});

export const fetchPoints = createAsyncThunk('points/fetchPoints', async () => {
	try {
		const apiData = await API.graphql({ query: listPoints });
		const pointsFromAPI = apiData.data.listPoints.items;
		return pointsFromAPI;
	} catch (error) {
		console.log(error);
	}
});

export const deletePoint = createAsyncThunk(
	'points/deletePoint',
	async (id) => {
		try {
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

export const allPoints = (state) => state.points.pointsData;

export default pointsSlice.reducer;

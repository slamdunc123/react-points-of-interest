import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listMaps } from '../../graphql/queries';
import { API } from 'aws-amplify';

const initialState = {
	mapsData: [],
	status: 'idle',
};

const mapsSlice = createSlice({
	name: 'maps',
	initialState,
	reducers: {},
		extraReducers(builder) {
			builder
				.addCase(fetchMaps.pending, (state, action) => {
					state.status = 'loading';
				})
				.addCase(fetchMaps.fulfilled, (state, action) => {
					state.status = 'succeeded';
					state.mapsData = action.payload;
				})
				.addCase(fetchMaps.rejected, (state, action) => {
					state.status = 'failed';
					state.error = action.error.message;
				});
		},
});

export const fetchMaps = createAsyncThunk('maps/fetchMaps', async () => {
	try {
		const apiData = await API.graphql({ query: listMaps });
		const mapsFromAPI = apiData.data.listMaps.items;
		return mapsFromAPI;
	} catch (error) {
		console.log(error);
	}
});

export const allMaps = (state) => state.maps.mapsData;

export default mapsSlice.reducer;

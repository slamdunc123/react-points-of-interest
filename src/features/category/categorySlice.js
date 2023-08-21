import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listCategories } from '../../graphql/queries';
import { API } from 'aws-amplify';

const initialState = {
	categoriesData: [],
	status: 'idle',
};

const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchCategories.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.categoriesData = action.payload;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	async () => {
		try {
			const apiData = await API.graphql({ query: listCategories });
			const categoriesFromAPI = apiData.data.listCategories.items;
			return categoriesFromAPI;
		} catch (error) {
			console.log(error);
		}
	}
);

export default categorySlice.reducer;

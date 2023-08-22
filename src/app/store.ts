import { configureStore } from '@reduxjs/toolkit';
import pointsReducer from '../features/point/pointSlice';
import mapsReducer from '../features/map/mapSlice';
import categoryReducer from '../features/category/categorySlice';

export const store = configureStore({
	reducer: {
		points: pointsReducer,
		maps: mapsReducer,
		categories: categoryReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

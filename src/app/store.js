import { configureStore } from '@reduxjs/toolkit';
import pointsReducer from '../features/point/pointSlice';
import mapsReducer from '../features/map/mapSlice';

export const store = configureStore({
	reducer: {
		points: pointsReducer,
		maps: mapsReducer,
	},
});

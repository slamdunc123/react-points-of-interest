import { configureStore } from '@reduxjs/toolkit';
import pointsReducer from '../features/point/pointSlice';

export const store = configureStore({
	reducer: {
		points: pointsReducer,
	},
});

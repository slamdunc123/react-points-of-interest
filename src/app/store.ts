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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

import React from 'react';
import { PointType } from '../MapContainer/MapContainer';
import Box from '@mui/material/Box';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { useAppSelector } from '../../app/hooks';
import { columns } from './columns';

type PointsDataGridPropsType = {
	mapContainerStyle: any;
	points: PointType[];
	handleGridRowOnClick: (e: GridRowParams<any>) => void;
};
const PointsDataGrid = ({
	mapContainerStyle,
	points,
	handleGridRowOnClick,
}: PointsDataGridPropsType) => {
	const categories: any[] = useAppSelector(
		(state) => state.categories.categoriesData
	);

	const getCategoryName = (categoryId: string) => {
		const newPoint = categories.find((item) => item.id === categoryId);
		return newPoint.name;
	};

	const pointsWithCategoryName = points.map((point) => ({
		...point,
		categoryName: getCategoryName(point.categoryId),
	}));

	return (
		<div style={mapContainerStyle}>
			<Box sx={{ width: '100%' }}>
				<DataGrid
					rows={points ? pointsWithCategoryName : []}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 10,
							},
						},
					}}
					pageSizeOptions={[10]}
					disableColumnFilter
					disableColumnSelector
					onRowClick={(e) => handleGridRowOnClick(e)}
				/>
			</Box>
		</div>
	);
};

export default PointsDataGrid;

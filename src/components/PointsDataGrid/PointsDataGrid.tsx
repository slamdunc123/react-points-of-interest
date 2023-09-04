import React from 'react';
import { PointType } from '../MapContainer/MapContainer';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
	{
		field: 'name',
		headerName: 'Name',
		width: 150,
	},
	{
		field: 'description',
		headerName: 'Description',
		width: 150,
	},
	{
		field: 'yearBuilt',
		headerName: 'Year Built',
		type: 'number',
		width: 110,
	},
	
];


type PointsDataGridPropsType = {
	mapContainerStyle: any;
	points: PointType[];
};
const PointsDataGrid = ({
	mapContainerStyle,
	points,
}: PointsDataGridPropsType) => {

	return (
		<div style={mapContainerStyle}>
			<Box sx={{ height: '100%', width: '100%' }}>
				<DataGrid
					rows={points ? points : []}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					pageSizeOptions={[5]}
					disableRowSelectionOnClick
				/>
			</Box>
		</div>
	);
};

export default PointsDataGrid;

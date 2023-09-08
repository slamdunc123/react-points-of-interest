import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
	{
		field: 'name',
		headerName: 'Name',
		width: 200,
	},
	{
    field: 'categoryName',
		headerName: 'Category',
		width: 150,
	},
  {
    field: 'yearBuilt',
    headerName: 'Year Built',
    type: 'number',
    width: 110,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
  },
];

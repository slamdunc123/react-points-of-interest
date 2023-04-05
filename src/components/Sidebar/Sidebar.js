import React from 'react';
import PointsFilters from '../PointsFilter/PointsFilter';
import PointsSelector from '../PointsSelector/PointsSelector';
import styles from './sidebar.module.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Sidebar = ({
	points,
	activePoint,
	handlePointOnChange,
	handleFilterOnChange,
	checkedFilter,
	isSidebarOpen,
}) => {
	return (
		<div
			className={
				styles[isSidebarOpen ? 'container-open' : 'container-closed']
			}
		>
			{isSidebarOpen && (
				<>
					<List sx={{ width: 1 }}>
						<ListItem>
							<Button
								variant='outlined'
								startIcon={
									<AddCircleOutlineIcon color='primary' />
								}
								component={Link}
								to={'/add-point'}
							>
								Add
							</Button>
						</ListItem>
						<Divider />
						<ListItem>
							<PointsFilters
								handleFilterOnChange={handleFilterOnChange}
								checkedFilter={checkedFilter}
							/>
						</ListItem>
						<Divider />
						<ListItem>
							<PointsSelector
								points={points}
								activePoint={activePoint}
								handlePointOnChange={handlePointOnChange}
							/>
						</ListItem>
					</List>
				</>
			)}
		</div>
	);
};

export default Sidebar;

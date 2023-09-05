import React, { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Admin from '../Admin/Admin';
import PointsFilters from '../PointsFilter/PointsFilter';
import PointsSelector from '../PointsSelector/PointsSelector';

import { PointType } from '../MapContainer/MapContainer';
import { SelectChangeEvent } from '@mui/material/Select';

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import DatasetIcon from '@mui/icons-material/Dataset';

import styles from './sidebar.module.css';

type SidebarPropsType = {
	points: PointType[];
	activePoint: string;
	checkedFilter: string;
	isSidebarOpen: boolean;
	handlePointOnChange: (e: SelectChangeEvent) => void;
	handleFilterOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
	filteredPointsByMapId: PointType[];
	handleSidebarOnClick: (isSidebarOpen: boolean) => void;
	handleViewOnClick: () => void;
	isMapView: boolean;
};

const Sidebar = ({
	points,
	activePoint,
	handlePointOnChange,
	handleFilterOnChange,
	checkedFilter,
	isSidebarOpen,
	filteredPointsByMapId,
	handleSidebarOnClick,
	handleViewOnClick,
	isMapView,
}: SidebarPropsType) => {
	const navigate = useNavigate();
	return (
		<div
			className={
				styles[isSidebarOpen ? 'container-open' : 'container-closed']
			}
		>
			{isSidebarOpen && (
				<>
					<IconButton
						size='large'
						edge='start'
						color='primary'
						aria-label='menu'
						onClick={() => handleSidebarOnClick(!isSidebarOpen)}
						sx={{ ml: 'auto', mt: 1 }}
					>
						<CloseIcon />
					</IconButton>
					<List sx={{ width: 1 }}>
						<ListItem>
							<Admin />
						</ListItem>

						<Divider />
						<ListItem>
							<Tooltip title='Home' arrow>
								<Button
									startIcon={<HomeIcon />}
									size='large'
									color='primary'
									aria-label='menu'
									onClick={() => navigate('/')}
									fullWidth
									sx={{
										justifyContent: 'flex-start',
										alignItems: 'center',
										p: 0,
									}}
								>
									<Typography
										sx={{
											typography: 'subtitle1',
											textTransform: 'capitalize',
											lineHeight: 'normal',
										}}
									>
										Home
									</Typography>
								</Button>
							</Tooltip>
						</ListItem>
						<ListItem sx={{ alignItems: 'center' }}>
							<Tooltip title='Change View' arrow>
								<Button
									startIcon={
										isMapView ? (
											<DatasetIcon />
										) : (
											<MapIcon />
										)
									}
									size='large'
									color='primary'
									aria-label='menu'
									onClick={handleViewOnClick}
									fullWidth
									sx={{
										justifyContent: 'flex-start',
										alignItems: 'center',
										p: 0,
									}}
								>
									<Typography
										sx={{
											textTransform: 'capitalize',
											lineHeight: 'normal',
										}}
									>
										{isMapView ? 'Data Grid' : 'Map'}
									</Typography>
								</Button>
							</Tooltip>
						</ListItem>
						<Divider />

						<ListItem>
							<PointsFilters
								handleFilterOnChange={handleFilterOnChange}
								checkedFilter={checkedFilter}
								filteredPointsByMapId={filteredPointsByMapId}
							/>
						</ListItem>
						{isMapView && (
							<>
								<Divider />
								<ListItem>
									<PointsSelector
										points={points}
										activePoint={activePoint}
										handlePointOnChange={
											handlePointOnChange
										}
									/>
								</ListItem>
							</>
						)}
					</List>
				</>
			)}
		</div>
	);
};

export default Sidebar;

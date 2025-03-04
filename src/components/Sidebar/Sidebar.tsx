import React, { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Admin from '../Admin/Admin';
import PointsFilters from '../PointsFilter/PointsFilter';
import PointsSelector from '../PointsSelector/PointsSelector';

import { PointType } from '../../types';
import { SelectChangeEvent } from '@mui/material/Select';

import Box from '@mui/material/Box';
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
					<Box sx={{ display: 'flex', width: '100%', mt: 1 }}>
						<Tooltip title='Home' placement='bottom-start'>
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
									pl: 2,
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
						<IconButton
							size='large'
							edge='start'
							color='primary'
							aria-label='menu'
							onClick={() => handleSidebarOnClick(!isSidebarOpen)}
							sx={{ ml: 'auto' }}
						>
							<CloseIcon />
						</IconButton>
					</Box>
					<List sx={{ width: 1 }}>
						<Divider />
						<ListItem>
							<Admin />
						</ListItem>

						<Divider />
						<ListItem sx={{ alignItems: 'center', py: 2, px: 1 }}>
							<Tooltip
								title='Change View'
								placement='bottom-start'
							>
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
									}}
								>
									<Typography
										sx={{
											textTransform: 'capitalize',
											lineHeight: 'normal',
										}}
									>
										{isMapView ? 'Table' : 'Map'}
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

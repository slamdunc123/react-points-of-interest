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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import MapIcon from '@mui/icons-material/Map';

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
						sx={{ alignSelf: 'flex-end' }}
					>
						<CloseIcon />
					</IconButton>
					<List sx={{ width: 1 }}>
						<Divider />
						<ListItem>
							<Admin />
						</ListItem>
						<Divider />
						<ListItem sx={{ alignItems: 'center' }}>
							<Tooltip title='Maps' arrow>
								<IconButton
									size='large'
									edge='start'
									color='primary'
									aria-label='menu'
									onClick={() => navigate('/')}
								>
									<MapIcon />
								</IconButton>
							</Tooltip>
							<Typography variant='body1' color='primary'>
								Maps
							</Typography>
						</ListItem>
						<Divider />
						<ListItem>
							<PointsFilters
								handleFilterOnChange={handleFilterOnChange}
								checkedFilter={checkedFilter}
								filteredPointsByMapId={filteredPointsByMapId}
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

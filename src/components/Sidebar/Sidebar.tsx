import React, { ChangeEvent } from 'react';
import Admin from '../Admin/Admin';
import PointsFilters from '../PointsFilter/PointsFilter';
import PointsSelector from '../PointsSelector/PointsSelector';
import styles from './sidebar.module.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { PointInt } from '../Points/Points';
import { SelectChangeEvent } from '@mui/material/Select';
import { useAuthenticator } from '@aws-amplify/ui-react';

interface SidebarPropsInt {
	points: PointInt[];
	activePoint: string;
	checkedFilter: string;
	isSidebarOpen: boolean;
	handlePointOnChange: (e: SelectChangeEvent) => void;
	handleFilterOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Sidebar = ({
	points,
	activePoint,
	handlePointOnChange,
	handleFilterOnChange,
	checkedFilter,
	isSidebarOpen,
}: SidebarPropsInt) => {
	const { user } = useAuthenticator((context) => [context.user]);

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
							<Admin />
						</ListItem>
						<Divider />
						{user && (
							<>
								<ListItem>
									<Button
										variant='contained'
										component={Link}
										to={'/add-point'}
										fullWidth
									>
										Add
									</Button>
								</ListItem>
								<Divider />
							</>
						)}
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

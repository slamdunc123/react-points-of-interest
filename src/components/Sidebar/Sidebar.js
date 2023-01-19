import PointsFilters from '../PointsFilter/PointsFilter';
import PointsSelector from '../PointsSelector/PointsSelector';
import styles from './sidebar.module.css';
import { Link } from 'react-router-dom';
import { Button, Divider, List, ListItem } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Sidebar = ({
	points,
	activePoint,
	handlePointOnChange,
	handleFilterOnChange,
	isCheckedFilter,
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
					<List>
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
								isCheckedFilter={isCheckedFilter}
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

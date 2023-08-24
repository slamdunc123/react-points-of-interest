import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import RoomIcon from '@mui/icons-material/Room';
import CloseIcon from '@mui/icons-material/Close';

type NavbarPropsType = {
	isSidebarOpen: boolean;
	handleSidebarOnClick: (isSidebarOpen: boolean) => void;
	handleDrawMarkerOnClick: () => void;
	mapName: string;
	isDrawing: boolean;
  isUserAuthenticatedForCurrentMap: boolean
};

export default function Navbar({
	isSidebarOpen,
	handleSidebarOnClick,
	handleDrawMarkerOnClick,
	mapName,
	isDrawing,
  isUserAuthenticatedForCurrentMap
}: NavbarPropsType) {
	const navigate = useNavigate();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar sx={{ width: '100%' }}>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						onClick={() => handleSidebarOnClick(!isSidebarOpen)}
					>
						{isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
					</IconButton>
					<Tooltip title='Home' arrow>
						<IconButton
							size='large'
							edge='start'
							color='inherit'
							aria-label='menu'
							onClick={() => navigate('/')}
						>
							<HomeIcon />
						</IconButton>
					</Tooltip>

					{isUserAuthenticatedForCurrentMap && (
						<Tooltip title='Marker' arrow>
							<IconButton
								size='large'
								edge='start'
								color={!isDrawing ? 'inherit' : 'default'}
								aria-label='menu'
								onClick={handleDrawMarkerOnClick}
							>
								<RoomIcon />
							</IconButton>
						</Tooltip>
					)}
					<Box
						sx={{ textTransform: 'uppercase', marginLeft: 'auto' }}
					>
						<Typography variant='h6' component='div'>
							{mapName}
						</Typography>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

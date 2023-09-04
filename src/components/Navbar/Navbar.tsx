import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import RoomIcon from '@mui/icons-material/Room';

type NavbarPropsType = {
	isSidebarOpen: boolean;
	handleSidebarOnClick: (isSidebarOpen: boolean) => void;
	handleDrawMarkerOnClick: () => void;
	mapName: string;
	isDrawing: boolean;
	isUserAuthenticatedForCurrentMap: boolean;
	isMapView: boolean;
};

export default function Navbar({
	isSidebarOpen,
	handleSidebarOnClick,
	handleDrawMarkerOnClick,
	mapName,
	isDrawing,
	isUserAuthenticatedForCurrentMap,
	isMapView,
}: NavbarPropsType) {
	const isUserAuthenticatedAndMapView =
		isUserAuthenticatedForCurrentMap && isMapView;

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar sx={{ width: '100%' }}>
					{!isSidebarOpen && (
						<IconButton
							size='large'
							edge='start'
							color='inherit'
							aria-label='menu'
							onClick={() => handleSidebarOnClick(!isSidebarOpen)}
						>
							<MenuIcon />
						</IconButton>
					)}

					<>
						
						{isUserAuthenticatedAndMapView && (
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
							sx={{
								textTransform: 'uppercase',
                marginLeft: 'auto'
							}}
						>
							<Typography variant='h6' component='div'>
								{mapName}
							</Typography>
						</Box>
					</>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

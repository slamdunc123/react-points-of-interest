//@ts-nocheck

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import RoomIcon from '@mui/icons-material/Room';
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

type NavbarPropsType = {
	isSidebarOpen: boolean;
	handleSidebarOnClick: (isSidebarOpen: boolean) => void;
	mapName: string;
}

export default function Navbar({
	isSidebarOpen,
	handleSidebarOnClick,
  handleDrawMarker,
	mapName,
}: NavbarPropsType) {
	const navigate = useNavigate();
	const { user } = useAuthenticator((context) => [context.user]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
						onClick={() => handleSidebarOnClick(!isSidebarOpen)}
					>
						<MenuIcon />
					</IconButton>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
						onClick={() => navigate('/')}
					>
						<HomeIcon />
					</IconButton>
					{user && (
						<IconButton
							size='large'
							edge='start'
							color='inherit'
							aria-label='menu'
							sx={{ mr: 2 }}
							onClick={handleDrawMarker}
						>
							<RoomIcon />
						</IconButton>
					)}
					<Typography variant='h6' component='div'>
						<Box sx={{ textTransform: 'uppercase', m: 1 }}>
							{mapName}
						</Box>
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

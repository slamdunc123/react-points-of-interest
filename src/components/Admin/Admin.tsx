import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Admin = () => {
	const { user, signOut } = useAuthenticator((context) => [
		context.user,
		context.signOut,
	]);

	const navigate = useNavigate();

	const handleAdminOnClick = () => {
		if (user) {
			try {
				signOut();
				navigate('/login');
			} catch (error) {}
		} else navigate('/login');
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'flex-start' }}>
			<Button color='primary' size='large' onClick={handleAdminOnClick}>

				<PersonIcon />
				<Typography variant='body2' color='primary'>{user ? '  sign out' : '  sign in'}</Typography>
			</Button>
			<Typography variant='body2' color='primary' sx={{alignSelf: 'flex-end'}}>{user?.username}</Typography>
		</Box>
	);
};

export default Admin;

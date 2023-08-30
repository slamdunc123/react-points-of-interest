import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

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
		<Box style={{ display: 'flex', flexDirection: 'column' }}>
			<Box style={{ display: 'flex', alignItems: 'center' }}>
				<IconButton
					size='large'
					edge='start'
					color='primary'
					aria-label='admin'
					onClick={handleAdminOnClick}
				>
					<PersonIcon />
				</IconButton>
				<Typography variant='body1' color='primary'>
					{user ? '  Sign out' : '  Sign in'}
				</Typography>
			</Box>
			<Typography variant='body1' color='primary'>
				{user?.username}
			</Typography>
		</Box>
	);
};

export default Admin;

import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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
		<Box sx={{ width: '100%' }}>
			<Button
				startIcon={<PersonIcon />}
				size='large'
				color='primary'
				aria-label='admin'
				onClick={handleAdminOnClick}
				fullWidth
				sx={{
					justifyContent: 'flex-start',
					alignItems: 'center',
					py: 1,
					px: 0,
				}}
			>
				<Typography
					sx={{
						textTransform: 'capitalize',
						lineHeight: 'normal',
					}}
				>
					{user ? '  Sign out' : '  Sign in'}
				</Typography>
			</Button>
			<Typography
				sx={{
					lineHeight: 'normal',
					py: 1,
					px: 0,
				}}
			>
				{user?.username}
			</Typography>
		</Box>
	);
};

export default Admin;

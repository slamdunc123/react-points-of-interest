import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
	const { user, signOut } = useAuthenticator((context) => [
		context.user,
		context.signOut,
	]);

	const navigate = useNavigate();

	const handleAdminOnClick = () => {
		if (user) {
			try {
				console.log('sign out');
				signOut();
				navigate('/login');
			} catch (error) {}
		} else navigate('/login');
	};

	return (
		<>
			<Button color='primary' size='large' onClick={handleAdminOnClick}>
				<PersonIcon />
				{user ? '  sign out' : '  sign in'}
			</Button>
		</>
	);
};

export default Admin;

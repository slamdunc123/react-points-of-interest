import { useEffect } from "react";
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import '@aws-amplify/ui-react/styles.css';

export function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || '/';
  useEffect(() => {
    if (route === 'authenticated') {
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);
  return (
    <Container fixed>
      	<Button
				variant='outlined'
				type='button'
				size='small'
				component={Link}
				to='/'
			>
				Home
			</Button>
      <Card sx={{ marginTop: 2 }} variant='outlined'>
				<CardContent>

      <Authenticator hideSignUp={true}></Authenticator>
        </CardContent>
        </Card>
    </Container>
  );
}

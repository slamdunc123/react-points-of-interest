import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import { PointInt } from '../Points/Points';
import { Image } from 'mui-image';
import { useAuthenticator } from '@aws-amplify/ui-react';
interface PointPropsInt {
	point: PointInt;
	handleDeletePoint: (point: PointInt) => void;
  mapId: string;
}

const Point = ({ point, handleDeletePoint, mapId }: PointPropsInt) => {
	const { user } = useAuthenticator((context) => [context.user]);

	const navigate = useNavigate();

	useEffect(() => {
		if (!point) navigate('/');
	}, [point, navigate]);

	return (
		<Container fixed>
			<Button
				variant='outlined'
				type='button'
				size='small'
				component={Link}
				to={`/maps/${mapId}`}
			>
				Map
			</Button>

			<>
				<Card sx={{ marginTop: 2 }} variant='outlined'>
					{point ? (
						<CardContent
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
							}}
						>
							<Typography
								gutterBottom
								variant='h5'
								component='div'
							>
								{point.name}
							</Typography>

              {point.image && (
								<Image
									src={point.image}
									alt={`visual aid for ${point.name}`}
									style={{ width: '100%' }}
									duration={0}
								/>
							)}
							<Typography
								gutterBottom
								variant='body1'
								component='div'
							>
								{point.description}
							</Typography>
							<Typography variant='body2' color='text.secondary'>
								{`Built: ${point.yearBuilt}`}
							</Typography>
							{point.url && (
								<IconButton
									href={`${point.url}`}
									target='_blank'
									size='small'
									color='primary'
								>
									<LinkIcon />
								</IconButton>
							)}
							{user && (
								<ButtonGroup size='small' sx={{ marginTop: 2 }}>
									<Box mr={2}>
										<Button
											variant='contained'
											type='button'
											component={Link}
											to={`/edit-point/${point.id}`}
										>
											Edit
										</Button>
									</Box>
									<Box>
										<Button
											variant='contained'
											type='button'
											value='Delete'
											onClick={() => {
												handleDeletePoint(point);
											}}
										>
											Delete
										</Button>
									</Box>
								</ButtonGroup>
							)}
						</CardContent>
					) : (
						<CircularProgress />
					)}
				</Card>
			</>
		</Container>
	);
};

export default Point;

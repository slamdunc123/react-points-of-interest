//@ts-nocheck

import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
	Box,
	Button,
	ButtonGroup,
	CircularProgress,
	Container,
	IconButton,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

const Point = ({ handleDeletePoint, point }: any) => {
	return (
		<Container fixed>
			<Button
				variant='outlined'
				type='button'
				value='Home'
				size='small'
				component={Link}
				to='/'
			>
				Home
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
							<ButtonGroup size='small' sx={{ marginTop: 2 }}>
								<Box mr={2}>
									<Button
										variant='contained'
										type='button'
										value='Edit'
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
											handleDeletePoint(point.id);
										}}
									>
										Delete
									</Button>
								</Box>
							</ButtonGroup>
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

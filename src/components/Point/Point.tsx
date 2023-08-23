//@ts-nocheck
import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { deletePoint } from '../../features/point/pointSlice';

import { PointType } from '../MapContainer/MapContainer';

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
import { Image } from 'mui-image';
type PointPropsType = {
	point: PointType;
	mapId: string;
};

const Point = ({ point, mapId }: PointPropsType) => {
	const [category, setCategory] = useState('');
	const { user } = useAuthenticator((context) => [context.user]);

	const categories = useAppSelector(
		(state) => state.categories.categoriesData
	);

	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const getCategory = useCallback(() => {
		const category = categories.find(
			(item) => item.id === point.categoryId
		);
		return category;
	}, [categories, point]);

	const handleDeletePoint = async () => {
		try {
			dispatch(deletePoint(point));
			navigate(`/maps/${mapId}`);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const cat = getCategory();
		setCategory(cat);
	}, [getCategory]);

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
							<Typography
								gutterBottom
								variant='body2'
								color='text.secondary'
							>
								{`Category: ${category.name}`}
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
											onClick={handleDeletePoint}
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

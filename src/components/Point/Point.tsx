import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';

import PointHistory from '../PointHistory/PointHistory';

import { deletePoint } from '../../features/point/pointSlice';

import { PointType } from '../../types';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import Tooltip from '@mui/material/Tooltip';
import Image from 'mui-image';
import { deleteHistory } from '../../graphql/mutations';
import { API } from 'aws-amplify';

type PointPropsType = {
	point: PointType;
	mapId: string;
	isUserAuthenticated: boolean;
};

const Point = ({ point, mapId, isUserAuthenticated }: PointPropsType) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleDeletePoint = async () => {
		try {
			//@ts-ignore
			point.history.items.map(async (item) => {
				await API.graphql({
					query: deleteHistory,
					variables: { input: { id: item.id } },
				});
			});
			//@ts-ignore
			await dispatch(deletePoint(point)); // TODO: figure out how typing works here
			navigate(`/maps/${mapId}`);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!point) navigate('/');
	}, [point, navigate]);

	return (
		<Box
			sx={{
				maxWidth: 768,
				display: 'flex',
				flexDirection: 'column',
				margin: 'auto',
			}}
		>
			<Button
				variant='outlined'
				type='button'
				size='small'
				component={Link}
				to={`/maps/${mapId}`}
				sx={{ mt: 2, alignSelf: 'flex-start' }}
			>
				Map
			</Button>
			<>
				<Card sx={{ mt: 2 }} variant='outlined'>
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
									duration={0}
								/>
							)}
							<Typography
								gutterBottom
								variant='body1'
								color='text.secondary'
								sx={{ mt: 1 }}
							>
								{point.description}
							</Typography>
							<Typography variant='body1' color='text.secondary'>
								{`Built: ${point.yearBuilt}`}
							</Typography>
							{point.url && (
								<Tooltip title='Website'>
									<IconButton
										href={`${point.url}`}
										target='_blank'
										size='small'
										color='primary'
										sx={{ mt: 1, p: 0 }}
									>
										<LinkIcon />
									</IconButton>
								</Tooltip>
							)}
							{point.history?.items.length ? (
								<PointHistory history={point.history.items} />
							) : null}
							{isUserAuthenticated && (
								<ButtonGroup
									size='small'
									sx={{ marginTop: 2, alignSelf: 'flex-end' }}
								>
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
		</Box>
	);
};

export default Point;

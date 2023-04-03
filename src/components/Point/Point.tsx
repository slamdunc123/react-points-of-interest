import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import points from '../../points';
import styles from './point.module.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Point = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [point, setPoint] = useState<any>({});

	const getPoint = () => {
		const point = points.find((point) => point.id === id);
		if (!point) {
			navigate('/');
		} else setPoint(point);
	};

	useEffect(() => {
		getPoint();
	});

	return (
		<>
			<Link component={RouterLink} to='/' underline='none'>
				Home
			</Link>
			<div className={styles.container}>
				{point ? (
					<>
						<Card sx={{ maxWidth: 345 }}>
							<CardContent>
								<Typography
									gutterBottom
									variant='h5'
									component='div'
								>
									{point.name}
								</Typography>
								<Typography
									variant='body2'
									color='text.secondary'
								>
									{`Built: ${point.yearBuilt}`}
								</Typography>
							</CardContent>
							<CardActions
								sx={{
									display: 'flex',
									justifyContent: 'flex-end',
								}}
							>
								<Link
									component={RouterLink}
									to={`/edit-point/${id}`}
									underline='none'
								>
									Edit
								</Link>
								<Link href={`${point.url}`} underline='none'>
									More
								</Link>
							</CardActions>
						</Card>
					</>
				) : (
					'loading...'
				)}
			</div>
		</>
	);
};

export default Point;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import styles from './point.module.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Point = ({ points, handleDeletePoint }: any) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [point, setPoint] = useState<any>({});

	const getPoint = () => {
		const point = points.find((point: any) => point.id === id);
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
								{point.url && (
									<Link href={`${point.url}`}>
										<Typography
											variant='body2'
											color='text.secondary'
										>
											Website
										</Typography>
									</Link>
								)}
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
                  sx={{
										margin: 1,
									}}
								>
									Edit
								</Link>
                <Link
									component='button'
									// variant='body2'
									underline='none'
									onClick={() => {
										handleDeletePoint(id);
									}}
								>
									Delete
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

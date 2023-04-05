// @ts-nocheck

import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import styles from './point.module.css';

const Point = ({ handleDeletePoint, point }: any) => {
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
									to={`/edit-point/${point.id}`}
									underline='none'
									sx={{
										margin: 1,
									}}
								>
									Edit
								</Link>
								<Link
									component='button'
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

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import points from '../../points';
import styles from './point.module.css'

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
    <div className={styles.container}>
      <Link to="/">Home</Link>
      <Link to={`/edit-point/${id}`}>Edit</Link>
      {point ? (
        <>
          <p>{point.name}</p>
          <p>{`Built: ${point.yearBuilt}`}</p>
          <p>
            Website:{' '}
            <a href={`${point.url}`}>
              visit
            </a>
          </p>
        </>
      ) : (
        'loading...'
      )}
    </div>
  );
};

export default Point;
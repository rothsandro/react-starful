import styles from './star-rating.module.scss';

/* eslint-disable-next-line */
export interface StarRatingProps {}

export function StarRating(props: StarRatingProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StarRating!</h1>
    </div>
  );
}

export default StarRating;

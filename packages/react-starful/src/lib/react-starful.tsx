import styles from './react-starful.module.scss';

/* eslint-disable-next-line */
export interface ReactStarfulProps {}

export function ReactStarful(props: ReactStarfulProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactStarful!</h1>
    </div>
  );
}

export default ReactStarful;

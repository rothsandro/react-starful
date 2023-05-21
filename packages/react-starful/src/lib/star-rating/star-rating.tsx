import { useId } from 'react';
import css from './star-rating.module.scss';
import { StarRatingProps } from './star-rating.types';
import { useControlledProps } from './use-controlled-props';
import { Star } from './star';

export function StarRating(props: StarRatingProps) {
  const id = `star-rating-${useId()}`;
  const { name = id, value, total = 5, onChange } = useControlledProps(props);

  return (
    <div className={css.starRating}>
      {Array(total)
        .fill(null)
        .map((_, i) => (
          <Star
            key={i}
            name={name}
            value={i + 1}
            checked={value === i + 1}
            onChange={onChange}
          />
        ))}
    </div>
  );
}

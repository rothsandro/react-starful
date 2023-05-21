import { useCallback, useEffect, useId, useState } from 'react';
import css from './star-rating.module.scss';
import { StarRatingProps } from './star-rating.types';
import { useControlledProps } from './use-controlled-props';
import { Star } from './star';

export function StarRating(props: StarRatingProps) {
  const id = `star-rating-${useId()}`;
  const { name = id, value, total = 5, onChange } = useControlledProps(props);
  const [hoverValue, setHoverValue] = useState<number>(0);
  const clearHover = useCallback(() => setHoverValue(0), []);

  return (
    <div className={css.starRating}>
      {Array(total)
        .fill(null)
        .map((_, i) => {
          const starValue = i + 1;

          return (
            <Star
              key={i}
              name={name}
              value={starValue}
              isChecked={starValue === value}
              isActive={!hoverValue ? starValue <= value : false}
              isHovered={hoverValue >= starValue}
              onHover={setHoverValue}
              onLeave={clearHover}
              onChange={onChange}
            />
          );
        })}
    </div>
  );
}

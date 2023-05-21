import { useCallback, useId, useState } from 'react';
import { Star } from './star';
import css from './star-rating.module.scss';
import { StarRatingProps } from './star-rating.types';
import { useControlledProps } from './use-controlled-props';
import { useResetHandler } from './use-reset-handler';

export function StarRating(props: StarRatingProps) {
  const id = `star-rating-${useId()}`;

  const { name = id, value, total = 5, onChange } = useControlledProps(props);
  const { ref } = useResetHandler(
    useCallback(() => onChange(null), [onChange])
  );

  const [hoverValue, setHoverValue] = useState<number>(0);
  const clearHover = useCallback(() => setHoverValue(0), []);

  return (
    <div className={css.starRating} ref={ref}>
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
              isActive={!hoverValue && !!value ? starValue <= value : false}
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

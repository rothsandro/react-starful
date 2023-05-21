import { useCallback, useId, useMemo, useState } from 'react';
import { Star } from './star';
import css from './star-rating.module.scss';
import { StarRatingProps } from './star-rating.types';
import { useControlledProps } from './use-controlled-props';
import { useResetHandler } from './use-reset-handler';

const defaultLabelFn = (value: number) => {
  return value === 1 ? `1 star` : `${value} stars`;
};

export function StarRating(props: StarRatingProps) {
  const id = `star-rating-${useId()}`;

  const {
    name = id,
    value,
    total = 5,
    label = defaultLabelFn,
    withActiveLabel = false,
    readOnly = false,
    disabled = false,
    onChange,
  } = useControlledProps(props);
  const { ref } = useResetHandler(
    useCallback(() => onChange(null), [onChange])
  );

  const [hoverValue, setHoverValue] = useState<number>(0);
  const clearHover = useCallback(() => setHoverValue(0), []);

  const labels = useMemo(
    () => Array.from({ length: total }, (_, idx) => label(idx + 1)),
    [total, label]
  );

  const activeValue = hoverValue || value || 0;

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
              label={labels[i]}
              value={starValue}
              isChecked={starValue === value}
              isActive={!hoverValue && !!value ? starValue <= value : false}
              isHovered={hoverValue >= starValue}
              readOnly={readOnly}
              disabled={disabled}
              onHover={setHoverValue}
              onLeave={clearHover}
              onChange={onChange}
            />
          );
        })}
      {!!withActiveLabel && activeValue > 0 && (
        <span aria-hidden="true">{labels[activeValue - 1]}</span>
      )}
    </div>
  );
}

import { useCallback, useId, useState } from 'react';
import { useRatingLabels } from './rating-label';
import { RatingOption } from './rating-option';
import css from './rating.module.scss';
import { RatingProps } from './rating.types';
import { useControlledProps } from './use-controlled-props';
import { useResetHandler } from './use-reset-handler';
import { classNames } from './utils';
import cssUtils from './utils.module.scss';

export function Rating(props: RatingProps) {
  const id = `rating-${useId()}`;

  const {
    name = id,
    getLabelText,
    emptyLabel,
    withActiveLabel = false,
    value,
    resetValue,
    total = 5,
    allowNoRating = true,
    highlightSelectedOnly = false,
    readOnly = false,
    disabled = false,
    className,
    iconComponent,
    onChange,
  } = useControlledProps(props);

  const { ref } = useResetHandler(useCallback(() => onChange(resetValue), [resetValue, onChange]));

  const labels = useRatingLabels(total, getLabelText);
  const [hoverValue, setHoverValue] = useState<number>(0);
  const clearHover = useCallback(() => setHoverValue(0), []);

  const onSelectHandler = useCallback(
    (newValue: number) => {
      if (allowNoRating && value === newValue) {
        onChange(null);
        clearHover();
      } else if (value !== newValue) {
        onChange(newValue);
      }
    },
    [allowNoRating, value, onChange, clearHover]
  );

  const activeValue = hoverValue || value || 0;

  return (
    <span className={classNames(css.rating, className)} ref={ref}>
      <span className={css.ratingOptions}>
        {Array(total)
          .fill(null)
          .map((_, i) => {
            const starValue = i + 1;

            return (
              <RatingOption
                key={i}
                name={name}
                iconComponent={iconComponent}
                label={labels[i]}
                value={starValue}
                isChecked={starValue === value}
                isActive={
                  !hoverValue && !!value
                    ? highlightSelectedOnly
                      ? starValue === value
                      : starValue <= value
                    : false
                }
                isHovered={
                  highlightSelectedOnly ? hoverValue === starValue : hoverValue >= starValue
                }
                readOnly={readOnly}
                disabled={disabled}
                onHover={setHoverValue}
                onHoverLeave={clearHover}
                onSelect={onSelectHandler}
              />
            );
          })}
      </span>
      {!!allowNoRating && (
        <label className={cssUtils.visuallyHidden}>
          <input
            type="radio"
            name={name}
            value=""
            checked={value === null}
            onChange={() => onChange(null)}
            readOnly={readOnly}
            disabled={disabled}
          />
          <span>{emptyLabel || 'Empty'}</span>
        </label>
      )}
      {!!withActiveLabel && activeValue > 0 && (
        <span aria-hidden="true">{labels[activeValue - 1]}</span>
      )}
    </span>
  );
}

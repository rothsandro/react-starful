import { useCallback, useId, useMemo, useState } from 'react';
import { RatingOption } from './rating-option';
import css from './rating.module.scss';
import { RatingProps } from './rating.types';
import { useControlledProps } from './use-controlled-props';
import { useResetHandler } from './use-reset-handler';
import cssUtils from './utils.module.scss';

const defaultLabelFn = (value: number) => {
  return value === 1 ? `1 star` : `${value} stars`;
};

export function Rating(props: RatingProps) {
  const id = `rating-${useId()}`;

  const {
    name = id,
    value,
    resetValue,
    total = 5,
    label = defaultLabelFn,
    emptyLabel,
    withActiveLabel = false,
    allowNoRating = true,
    highlightSelectedOnly = false,
    readOnly = false,
    disabled = false,
    iconComponent,
    onChange,
  } = useControlledProps(props);

  const { ref } = useResetHandler(
    useCallback(() => onChange(resetValue), [resetValue, onChange])
  );

  const [hoverValue, setHoverValue] = useState<number>(0);
  const clearHover = useCallback(() => setHoverValue(0), []);

  const onChangeHandler = (newValue: number) => {
    if (allowNoRating && value === newValue) {
      onChange(null);
      clearHover();
    } else {
      onChange(newValue);
    }
  };

  const labels = useMemo(
    () => Array.from({ length: total }, (_, idx) => label(idx + 1)),
    [total, label]
  );

  const activeValue = hoverValue || value || 0;

  return (
    <div className={css.rating} ref={ref}>
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
                highlightSelectedOnly
                  ? hoverValue === starValue
                  : hoverValue >= starValue
              }
              readOnly={readOnly}
              disabled={disabled}
              onHover={setHoverValue}
              onLeave={clearHover}
              onChange={onChangeHandler}
            />
          );
        })}
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
    </div>
  );
}
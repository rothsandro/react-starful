import { FC } from 'react';
import { StarRatingIcon } from './rating-icon';
import css from './rating-option.module.scss';
import { RatingOptionProps } from './rating-option.types';
import cssUtils from './utils.module.scss';

export const RatingOption: FC<RatingOptionProps> = (props) => {
  const {
    name,
    label,
    value,
    isChecked,
    isActive,
    isHovered,
    readOnly,
    disabled,
    iconComponent: Icon = StarRatingIcon,
    onHover,
    onLeave,
    onChange,
  } = props;

  const onChangeHandler = () => onChange(value);
  const onHoverHandler = () => onHover(value);

  const isInteractive = !readOnly && !disabled;

  return (
    <label
      className={css.ratingOption}
      data-hovered={isHovered}
      data-active={isActive}
      data-readonly={readOnly}
      data-disabled={disabled}
      onMouseMove={isInteractive ? onHoverHandler : undefined}
      onMouseLeave={onLeave}
    >
      <Icon
        value={value}
        highlighted={isHovered || isActive}
        hovered={isHovered}
        active={isActive}
        checked={isChecked}
      />
      <span className={cssUtils.visuallyHidden}>
        <input
          type="radio"
          name={name}
          onChange={isInteractive ? onChangeHandler : undefined}
          onClick={isChecked ? onChangeHandler : undefined}
          value={value}
          checked={isChecked}
          readOnly={readOnly}
          disabled={disabled}
        />
        {label}
      </span>
    </label>
  );
};

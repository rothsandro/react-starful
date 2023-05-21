import { FC } from 'react';
import css from './rating-option.module.scss';
import {
  RatingOptionIconProps,
  RatingOptionProps,
} from './rating-option.types';
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
    iconComponent: Icon = StarIcon,
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

const StarIcon: FC<RatingOptionIconProps> = (props) => {
  const { highlighted } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 15 15"
    >
      <path
        fill="currentColor"
        fillRule={highlighted ? undefined : 'evenodd'}
        d="M6.98 1.252l-.022.05L5.588 4.6a.3.3 0 01-.253.184l-3.561.286-.055.004-.331.027-.3.024a.3.3 0 00-.172.527l.23.196.252.216.041.036 2.713 2.324a.3.3 0 01.097.297l-.83 3.475-.012.053-.077.323-.07.294a.3.3 0 00.448.326l.258-.158.284-.173.046-.028 3.049-1.863a.3.3 0 01.312 0l3.049 1.863.046.028.284.173.258.158a.3.3 0 00.448-.326l-.07-.293-.077-.324-.013-.053-.829-3.475a.3.3 0 01.097-.297L13.562 6.1l.041-.036.253-.216.23-.196a.3.3 0 00-.172-.527l-.3-.024-.332-.027-.055-.004-3.56-.286a.3.3 0 01-.254-.184L8.042 1.302l-.021-.05-.128-.307-.116-.279a.3.3 0 00-.554 0l-.116.279-.128.307zm.52 1.352l-.99 2.38a1.3 1.3 0 01-1.096.797l-2.57.206 1.958 1.677a1.3 1.3 0 01.418 1.29l-.598 2.507 2.2-1.344a1.3 1.3 0 011.356 0l2.2 1.344-.598-2.508a1.3 1.3 0 01.418-1.289l1.958-1.677-2.57-.206a1.3 1.3 0 01-1.096-.797l-.99-2.38z"
      ></path>
    </svg>
  );
};
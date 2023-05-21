import { FC } from 'react';
import css from './star.module.scss';
import { StarProps } from './star.types';
import cssUtils from './utils.module.scss';

export const Star: FC<StarProps> = (props) => {
  const {
    name,
    label,
    value,
    isChecked,
    isActive,
    isHovered,
    readOnly,
    disabled,
    onHover,
    onLeave,
    onChange,
  } = props;

  const onChangeHandler = () => onChange(value);
  const onHoverHandler = () => onHover(value);

  const isInteractive = !readOnly && !disabled;

  return (
    <label
      className={css.star}
      data-hovered={isHovered}
      data-active={isActive}
      data-readonly={readOnly}
      data-disabled={disabled}
      onMouseMove={isInteractive ? onHoverHandler : undefined}
      onMouseLeave={onLeave}
    >
      {starIcon}
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

const starIcon = (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M12 17.27l-5.55 3.36 1.42-6.18L2.39 9.64l6.25-.54L12 3l3.36 6.1 6.25.54-5.48 4.81 1.42 6.18z"
    />
  </svg>
);

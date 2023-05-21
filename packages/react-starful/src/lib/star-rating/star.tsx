import { FC } from 'react';
import css from './star.module.scss';
import { StarProps } from './star.types';

export const Star: FC<StarProps> = (props) => {
  const {
    name,
    value,
    isChecked,
    isActive,
    isHovered,
    onHover,
    onLeave,
    onChange,
  } = props;

  const onChangeHandler = () => onChange(value);
  const onHoverHandler = () => onHover(value);

  return (
    <label
      className={css.star}
      data-hovered={isHovered}
      data-active={isActive}
      onMouseEnter={onHoverHandler}
      onMouseLeave={onLeave}
    >
      {starIcon}
      <span className={css.visuallyHidden}>
        <input
          type="radio"
          name={name}
          onChange={onChangeHandler}
          value={value}
          checked={isChecked}
        />
        {value} {value === 1 ? 'Star' : 'Stars'}
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

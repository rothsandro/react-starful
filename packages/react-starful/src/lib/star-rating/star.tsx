import { FC } from 'react';
import { StarProps } from './star.types';

export const Star: FC<StarProps> = (props) => {
  const { name, value, checked, onChange } = props;

  const onChangeHandler = () => onChange(value);

  return (
    <label>
      {starIcon}
      <span>
        <input
          type="radio"
          name={name}
          onChange={onChangeHandler}
          value={value}
          checked={checked}
        />
        {value} {value === 1 ? 'Star' : 'Stars'}
      </span>
    </label>
  );
};

const starIcon = (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17.27l-5.55 3.36 1.42-6.18L2.39 9.64l6.25-.54L12 3l3.36 6.1 6.25.54-5.48 4.81 1.42 6.18z" />
  </svg>
);

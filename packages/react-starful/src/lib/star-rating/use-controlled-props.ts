import { useCallback, useState } from 'react';
import { StarRatingProps } from './star-rating.types';

export function useControlledProps<P extends StarRatingProps>(props: P) {
  const {
    value: valueFromProps,
    onChange: onChangeFromProps,
    defaultValue,
    ...rest
  } = props;

  const isControlled = typeof valueFromProps !== 'undefined';
  const [internalValue, setInternalValue] = useState(defaultValue ?? 0);

  const value = isControlled ? valueFromProps : internalValue;
  const onChange = useCallback(
    (value: number) => {
      onChangeFromProps?.(value);
      !isControlled && setInternalValue(value);
    },
    [isControlled, onChangeFromProps]
  );

  return { value, onChange, ...rest };
}

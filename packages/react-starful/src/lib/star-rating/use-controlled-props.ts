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
  const [internalValue, setInternalValue] = useState(defaultValue ?? null);
  const resetValue = defaultValue ?? null;

  const value = isControlled ? valueFromProps : internalValue;
  const onChange = useCallback(
    (value: number | null) => {
      value = value ?? resetValue;
      onChangeFromProps?.(value);
      !isControlled && setInternalValue(value);
    },
    [resetValue, isControlled, onChangeFromProps]
  );

  return { value, onChange, ...rest };
}

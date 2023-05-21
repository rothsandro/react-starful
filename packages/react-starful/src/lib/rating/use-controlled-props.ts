import { useCallback, useState } from 'react';
import { RatingProps } from './rating.types';

export function useControlledProps<P extends RatingProps>(props: P) {
  const {
    value: valueFromProps,
    onChange: onChangeFromProps,
    defaultValue,
    ...rest
  } = props;

  const isControlled = typeof valueFromProps !== 'undefined';
  const [internalValue, setInternalValue] = useState(defaultValue ?? null);

  const value = isControlled ? valueFromProps : internalValue;
  const onChange = useCallback(
    (value: number | null) => {
      onChangeFromProps?.(value);
      !isControlled && setInternalValue(value);
    },
    [isControlled, onChangeFromProps]
  );

  return { value, resetValue: defaultValue ?? null, onChange, ...rest };
}

import { ComponentType } from 'react';

export interface RatingOptionProps {
  name: string;
  label: string;
  value: number;
  isChecked: boolean;
  isActive: boolean;
  isHovered: boolean;
  readOnly: boolean;
  disabled: boolean;
  onChange: (value: number) => void;
  onHover: (value: number) => void;
  onLeave: VoidFunction;
  iconComponent?: ComponentType<RatingOptionIconProps>;
}

export interface RatingOptionIconProps {
  value: number;
  highlighted: boolean;
  active: boolean;
  hovered: boolean;
  checked: boolean;
}

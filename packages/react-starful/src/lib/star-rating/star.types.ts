import { ComponentType } from 'react';

export interface StarProps {
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
  iconComponent?: ComponentType<RatingIconProps>;
}

export interface RatingIconProps {
  value: number;
  highlighted: boolean;
  active: boolean;
  hovered: boolean;
  checked: boolean;
}

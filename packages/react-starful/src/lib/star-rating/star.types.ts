export interface StarProps {
  name: string;
  value: number;
  isChecked: boolean;
  isActive: boolean;
  isHovered: boolean;
  readOnly: boolean;
  disabled: boolean;
  onChange: (value: number) => void;
  onHover: (value: number) => void;
  onLeave: VoidFunction;
}

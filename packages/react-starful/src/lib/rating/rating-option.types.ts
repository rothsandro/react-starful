import { RatingIconComponent } from './rating-icon.types';

export interface RatingOptionProps {
  /**
   * The name of the rating option form element.
   */
  name: string;

  /**
   * The label of the rating option.
   */
  label: string;

  /**
   * The value of the rating option.
   */
  value: number;

  /**
   * If the rating option is required.
   */
  required?: boolean;

  /**
   * If the rating option is checked.
   */
  isChecked: boolean;

  /**
   * If the rating option is active.
   * Should be true if a higher rating option is checked.
   */
  isActive: boolean;

  /**
   * If the rating option is hovered.
   * Should be true if the rating option is hovered or a higher rating option is hovered.
   */
  isHovered: boolean;

  /**
   * If the rating option is read-only.
   */
  readOnly: boolean;

  /**
   * If the rating option is disabled.
   */
  disabled: boolean;

  /**
   * Callback function that is called when the rating option is selected.
   * @param value The value of the rating option.
   */
  onSelect: (value: number) => void;

  /**
   * Callback function that is called when the rating option is hovered.
   * @param value The value of the rating option.
   */
  onHover: (value: number) => void;

  /**
   * Callback function that is called when the rating option is not hovered anymore.
   */
  onHoverLeave: VoidFunction;

  /**
   * The component that is used to render the rating icon.
   */
  iconComponent?: RatingIconComponent;
}

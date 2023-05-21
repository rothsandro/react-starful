import { ComponentType } from 'react';

export type RatingIconComponent = ComponentType<RatingIconProps>;

export interface RatingIconProps {
  /**
   * The value of the rating option.
   */
  value: number;

  /**
   * Whether the rating option is highlighted.
   * This is true when the rating option is hovered or active.
   */
  highlighted: boolean;

  /**
   * Whether the rating option is active.
   * This is true when this or a higher rating option is checked.
   */
  active: boolean;

  /**
   * Whether the rating option is hovered.
   * This is true when the mouse is over the rating option or when a higher rating option is hovered.
   */
  hovered: boolean;

  /**
   * Whether the rating option is checked.
   */
  checked: boolean;
}

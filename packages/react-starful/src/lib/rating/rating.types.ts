import { RatingIconComponent } from './rating-icon.types';
import { RatingLabelTextFn } from './rating-label.types';

export interface RatingProps {
  /**
   * The name of the input elements.
   * @default A unique random string
   */
  name?: string;

  /**
   * A function that returns the label for each option.
   * @default createSimpleLabels('star', 'stars')
   */
  getLabelText?: RatingLabelTextFn;

  /**
   * The label for the empty rating.
   */
  emptyLabel?: string;

  /**
   * If the label of the selected star should be shown.
   * @default false
   */
  withActiveLabel?: boolean;

  /**
   * If only the selected option should be highlighted.
   * @default false
   */
  highlightSelectedOnly?: boolean;

  /**
   * The default number of stars selected.
   */
  defaultValue?: number | null;

  /**
   * The number of selected stars.
   */
  value?: number | null;

  /**
   * If the component should allow no rating.
   */
  allowNoRating?: boolean;

  /**
   * The callback function that is triggered when the number of selected stars is changed.
   * @param value The number of selected stars.
   * @returns
   */
  onChange?: (value: number | null) => void;

  /**
   * The total number of stars.
   * @default 5
   */
  total?: number;

  /**
   * If the component is read-only.
   * @default false
   */
  readOnly?: boolean;

  /**
   * If the component is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * An optional class name added to the root element.
   */
  className?: string;

  /**
   * The icon component for each option.
   */
  iconComponent?: RatingIconComponent;
}

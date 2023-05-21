export interface StarRatingProps {
  /**
   * The name of the input element.
   */
  name?: string;

  /**
   * A function that returns the label for a star.
   * @param value The value of the star.
   * @returns The label for the star.
   */
  label?: (value: number) => string;

  /**
   * The label for the empty rating.
   */
  emptyLabel?: string;

  /**
   * If the label of the selected star should be visible.
   * @default false
   */
  withActiveLabel?: boolean;

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
}

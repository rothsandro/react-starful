export interface StarRatingProps {
  /**
   * The name of the input element.
   */
  name?: string;

  /**
   * The default number of stars selected.
   */
  defaultValue?: number | null;

  /**
   * The number of selected stars.
   */
  value?: number | null;

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
}

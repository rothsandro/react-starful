import { RatingLabelTextFn } from './rating-label.types';

/**
 * Creates a function from the singular and plural forms of a label.
 *
 * @param singular The singular form of the label.
 * @param plural The plural form of the label.
 * @returns A function that returns a label for a given rating value.
 */
export function createSimpleLabels(singular: string, plural = singular): RatingLabelTextFn {
  return (value: number) => {
    const name = value === 1 ? singular : plural;
    return `${value} ${name}`;
  };
}

/**
 * Creates a function from an array of labels.
 * The array should be in ascending order, starting with the label for the lowest rating value.
 *
 * @param labels The array of labels.
 * @returns A function that returns a label for a given rating value.
 */
export function createLabelsFromArray(labels: string[]): RatingLabelTextFn {
  return (value: number) => labels[value - 1];
}

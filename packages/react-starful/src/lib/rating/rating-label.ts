import { useMemo } from 'react';
import { createSimpleLabels } from './rating-label.utils';

const getStarLabels = createSimpleLabels('star', 'stars');

/**
 * Creates an array of labels for a rating component.
 * @param total The total number of options.
 * @param getLabelText The function that returns the label text for a given rating.
 * @returns The array of labels.
 */
export function useRatingLabels(total: number, getLabelText = getStarLabels): string[] {
  const labels = useMemo(
    () => Array.from({ length: total }, (_, idx) => getLabelText(idx + 1) || `${idx + 1}`),
    [total, getLabelText]
  );

  return labels;
}

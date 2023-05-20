import type { Meta } from '@storybook/react';
import { StarRating } from './star-rating';

const Story: Meta<typeof StarRating> = {
  component: StarRating,
  title: 'StarRating',
};
export default Story;

export const Primary = {
  args: {},
};

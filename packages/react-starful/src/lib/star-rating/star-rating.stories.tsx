import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { StarRating } from './star-rating';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'StarRating',
  component: StarRating,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  decorators: [
    function ControlledMode(Story, ctx) {
      const [, setArgs] = useArgs<typeof ctx.args>();
      const onChange = (value: number) => {
        ctx.args.onChange?.(value);

        const isControlled = ctx.args.value !== undefined;
        isControlled && setArgs({ value });
      };

      return <Story args={{ ...ctx.args, onChange }} />;
    },
    function Label(Story) {
      return (
        <fieldset style={{ border: 0, padding: 0 }}>
          <legend style={{ fontWeight: 'bold', marginBlockEnd: 5 }}>
            Rating
          </legend>
          <Story />
        </fieldset>
      );
    },
  ],
} satisfies Meta<typeof StarRating>;

export default meta;

export const Basic: Story = {};

export const DefaultValue: Story = {
  args: {
    defaultValue: 3,
  },
};

export const Controlled: Story = {
  args: {
    value: 4,
  },
};

export const CustomName: Story = {
  args: {
    name: 'rating',
  },
};

export const Total: Story = {
  args: {
    defaultValue: 8,
    total: 10,
  },
};

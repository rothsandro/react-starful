import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentType } from 'react';
import { Rating } from './rating';
import { createLabelsFromArray } from './rating-label.utils';
import { NullableRatingProps } from './rating.types';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Rating',
  component: Rating,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  decorators: [
    function ControlledMode(Story, ctx) {
      const [, setArgs] = useArgs<typeof ctx.args>();
      const onChange = (value: number | null) => {
        ctx.args.onChange?.(value);

        const isControlled = ctx.args.value !== undefined;
        isControlled && setArgs({ value });
      };

      return <Story args={{ ...ctx.args, onChange }} />;
    },
  ],
} satisfies Meta<ComponentType<NullableRatingProps>>;

export default meta;

export const Basic: Story = {};

export const Labelled: Story = {
  decorators: [
    function Label(Story) {
      return (
        <fieldset style={{ border: 0, padding: 0 }}>
          <legend style={{ fontWeight: 'bold', marginBlockEnd: 5 }}>Rating</legend>
          <Story />
        </fieldset>
      );
    },
  ],
};

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

export const Reset: Story = {
  args: {
    defaultValue: 3,
  },
  decorators: [
    function ResetButton(Story) {
      return (
        <form>
          <Story />
          <div>
            <button type="reset">Reset form</button>
          </div>
        </form>
      );
    },
  ],
};

export const Total: Story = {
  args: {
    defaultValue: 8,
    total: 10,
  },
};

const getLabelText = createLabelsFromArray(['Very bad', 'Bad', 'Ok', 'Good', 'Very good']);
export const CustomLabels: Story = {
  args: {
    getLabelText,
    emptyLabel: 'No rating',
    withActiveLabel: true,
  },
};

export const NoEmptyRating: Story = {
  args: {
    noEmptyRating: true,
    defaultValue: 5,
  },
};

export const HighlightSelectedOnly: Story = {
  args: {
    defaultValue: 4,
    highlightSelectedOnly: true,
  },
};

export const CustomIcon: Story = {
  args: {
    defaultValue: 3,
    iconComponent: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
        <path d="M9 9L9.01 9"></path>
        <path d="M15 9L15.01 9"></path>
      </svg>
    ),
  },
};

export const ReadOnly: Story = {
  args: {
    value: 3,
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    value: 3,
    disabled: true,
  },
};

export const CustomStyles: Story = {
  args: {
    className: 'my-rating',
  },
};

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
  args: {
    'aria-labelledby': 'rating-label',
  },
  decorators: [
    function Label(Story) {
      return (
        <>
          <div id="rating-label">Rating</div>
          <Story />
        </>
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

export const FormName: Story = {
  args: {
    name: 'rating',
  },
};

export const FormReset: Story = {
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

export const Labels: Story = {
  args: {
    getLabelText,
    emptyLabelText: 'No rating',
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
    iconComponent: ({ value, highlighted }) => {
      const icons = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];
      const style = highlighted ? {} : { opacity: 0.2 };
      return <span style={style}>{icons[value - 1]}</span>;
    },
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

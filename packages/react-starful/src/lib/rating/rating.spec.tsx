import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Rating } from './rating';
import { FC, PropsWithChildren } from 'react';
import { createSimpleLabels } from './rating-label.utils';
import { createLabelsFromArray } from './rating-label.utils';

const Form: FC<PropsWithChildren> = ({ children }) => (
  <form>
    {children}
    <button type="reset">Reset</button>
  </form>
);

describe('Rating', () => {
  describe('uncontrolled mode', () => {
    test('empty rating is checked by default', () => {
      render(<Rating />);
      expect(screen.getByLabelText('Empty')).toBeChecked();
    });

    test('provided default value is checked', () => {
      render(<Rating defaultValue={3} />);
      expect(screen.getByLabelText('3 stars')).toBeChecked();
    });

    test('changes the value when clicked', async () => {
      const user = userEvent.setup();

      render(<Rating />);
      await user.click(screen.getByLabelText('4 stars'));

      expect(screen.getByLabelText('4 stars')).toBeChecked();
    });

    test('calls onChange when clicked', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<Rating onChange={onChange} />);
      await user.click(screen.getByLabelText('4 stars'));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(4);
    });

    test('resets the rating when clicked twice', async () => {
      const user = userEvent.setup();

      render(<Rating />);
      await user.click(screen.getByLabelText('4 stars'));
      await user.click(screen.getByLabelText('4 stars'));

      expect(screen.getByLabelText('Empty')).toBeChecked();
    });
  });

  describe('controlled mode', () => {
    test('empty rating is checked when value is null', () => {
      render(<Rating value={null} />);
      expect(screen.getByLabelText('Empty')).toBeChecked();
    });

    test('provided value is checked', () => {
      render(<Rating value={2} />);
      expect(screen.getByLabelText('2 stars')).toBeChecked();
    });

    test('calls onChange when clicked', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<Rating onChange={onChange} />);
      await user.click(screen.getByLabelText('4 stars'));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(4);
    });
  });

  describe('disabled', () => {
    test('is disabled', () => {
      render(<Rating disabled />);
      expect(screen.getByLabelText('Empty')).toBeDisabled();
    });

    test('does not emit onChange event', async () => {
      const onChange = jest.fn();
      render(<Rating disabled onChange={onChange} />);
      await userEvent.click(screen.getByLabelText('4 stars'));
      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('readonly', () => {
    test('is readonly', () => {
      render(<Rating readOnly />);
      expect(screen.getByLabelText('Empty')).toHaveAttribute('readOnly');
    });

    test('does not emit onChange event', async () => {
      const onChange = jest.fn();
      render(<Rating readOnly onChange={onChange} />);
      await userEvent.click(screen.getByLabelText('4 stars'));
      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('aria label', () => {
    test('has the label "Rating" by default', () => {
      render(<Rating />);
      expect(screen.getByRole('radiogroup', { name: /Rating/ })).toBeInTheDocument();
    });

    test('uses the provided aria-label', () => {
      render(<Rating aria-label="Bewertung" />);
      expect(screen.getByRole('radiogroup', { name: /Bewertung/ })).toBeInTheDocument();
    });

    test('uses the provided aria-labelledby value', () => {
      const Wrapper: FC<PropsWithChildren> = ({ children }) => (
        <>
          <span id="rating-label">Bewertung</span>
          {children}
        </>
      );
      render(<Rating aria-labelledby="rating-label" />, { wrapper: Wrapper });
      expect(screen.getByRole('radiogroup', { name: /Bewertung/ })).toBeInTheDocument();
    });

    test('does not set a default aria-label if aria-labelledby is provided', () => {
      const Wrapper: FC<PropsWithChildren> = ({ children }) => (
        <>
          <span id="rating-label">Bewertung</span>
          {children}
        </>
      );
      render(<Rating aria-labelledby="rating-label" />, { wrapper: Wrapper });

      const radiogroup = screen.getByRole('radiogroup', { name: /Bewertung/ });
      expect(radiogroup).toHaveAttribute('aria-labelledby');
      expect(radiogroup).not.toHaveAttribute('aria-label');
    });
  });

  describe('labels', () => {
    test('uses the star labels by default', () => {
      render(<Rating />);
      expect(screen.getByLabelText('1 star')).toBeInTheDocument();
      expect(screen.getByLabelText('2 stars')).toBeInTheDocument();
      expect(screen.getByLabelText('3 stars')).toBeInTheDocument();
      expect(screen.getByLabelText('4 stars')).toBeInTheDocument();
      expect(screen.getByLabelText('5 stars')).toBeInTheDocument();
    });

    test('uses the provided function', () => {
      render(<Rating getLabelText={(value) => `foo ${value}`} />);
      expect(screen.getByLabelText('foo 1')).toBeInTheDocument();
    });

    test('calls the function for each option', () => {
      const getLabelText = jest.fn((value) => `foo ${value}`);

      render(<Rating getLabelText={getLabelText} />);

      expect(getLabelText).toHaveBeenCalledTimes(5);
      expect(getLabelText).toHaveBeenCalledWith(1);
      expect(getLabelText).toHaveBeenCalledWith(2);
      expect(getLabelText).toHaveBeenCalledWith(3);
      expect(getLabelText).toHaveBeenCalledWith(4);
      expect(getLabelText).toHaveBeenCalledWith(5);
    });

    test('caches the created labels', () => {
      const getLabelText = jest.fn((value) => `foo ${value}`);

      const { rerender } = render(<Rating getLabelText={getLabelText} />);
      rerender(<Rating getLabelText={getLabelText} />);

      expect(getLabelText).toHaveBeenCalledTimes(5);
    });

    test('uses the number as fallback', () => {
      render(<Rating getLabelText={() => ''} />);
      expect(screen.getByLabelText('1')).toBeInTheDocument();
      expect(screen.getByLabelText('2')).toBeInTheDocument();
      expect(screen.getByLabelText('3')).toBeInTheDocument();
      expect(screen.getByLabelText('4')).toBeInTheDocument();
      expect(screen.getByLabelText('5')).toBeInTheDocument();
    });

    test('createSimpleLabels(cat) generates the labels', () => {
      const getLabelFn = createSimpleLabels('cat');

      render(<Rating getLabelText={getLabelFn} />);
      expect(screen.getByLabelText('1 cat')).toBeInTheDocument();
      expect(screen.getByLabelText('2 cat')).toBeInTheDocument();
      expect(screen.getByLabelText('3 cat')).toBeInTheDocument();
      expect(screen.getByLabelText('4 cat')).toBeInTheDocument();
      expect(screen.getByLabelText('5 cat')).toBeInTheDocument();
    });

    test('createSimpleLabels(cat, cats) generates the labels', () => {
      const getLabelFn = createSimpleLabels('cat', 'cats');

      render(<Rating getLabelText={getLabelFn} />);
      expect(screen.getByLabelText('1 cat')).toBeInTheDocument();
      expect(screen.getByLabelText('2 cats')).toBeInTheDocument();
      expect(screen.getByLabelText('3 cats')).toBeInTheDocument();
      expect(screen.getByLabelText('4 cats')).toBeInTheDocument();
      expect(screen.getByLabelText('5 cats')).toBeInTheDocument();
    });

    test('createLabelsFromArray() generates the labels', () => {
      const getLabelFn = createLabelsFromArray(['one', 'two', 'three', 'four']);

      render(<Rating total={4} getLabelText={getLabelFn} />);
      expect(screen.getByLabelText('one')).toBeInTheDocument();
      expect(screen.getByLabelText('two')).toBeInTheDocument();
      expect(screen.getByLabelText('three')).toBeInTheDocument();
      expect(screen.getByLabelText('four')).toBeInTheDocument();
    });
  });

  describe('withActiveLabel', () => {
    test('renders the active label if withActiveLabel is set', () => {
      render(<Rating defaultValue={3} withActiveLabel />);
      expect(screen.getAllByText('3 stars')).toHaveLength(2); // Option + visible label
    });

    test('changes the active label on hover if withActiveLabel is set', async () => {
      const user = userEvent.setup();
      render(<Rating defaultValue={3} withActiveLabel />);

      await user.hover(screen.getByLabelText('4 stars'));

      expect(screen.getAllByText('3 stars')).toHaveLength(1); // Option
      expect(screen.getAllByText('4 stars')).toHaveLength(2); // option + visible label
    });
  });

  describe('total', () => {
    test('renders 5 stars by default', () => {
      render(<Rating />);
      expect(screen.getAllByRole('radio')).toHaveLength(5 + 1);
    });

    test('renders the custom number of stars', () => {
      render(<Rating total={12} />);
      expect(screen.getAllByRole('radio')).toHaveLength(12 + 1);
    });

    test.each([[0], [-1], [-5]])('throws if total is %i', (total) => {
      jest.spyOn(console, 'error').mockImplementation(jest.fn());
      const error = 'total must be greater than 0';
      expect(() => render(<Rating total={total} />)).toThrowError(error);
      jest.spyOn(console, 'error').mockRestore();
    });

    test('throws if value is > total', () => {
      jest.spyOn(console, 'error').mockImplementation(jest.fn());
      const error = 'value must be less than or equal to total';
      expect(() => render(<Rating defaultValue={6} total={5} />)).toThrowError(error);
      jest.spyOn(console, 'error').mockRestore();
    });
  });

  describe('form', () => {
    test('uses the provided name', () => {
      const ref = { current: null };
      render(<Rating defaultValue={3} name="foo" />, {
        wrapper: ({ children }) => <form ref={ref}>{children}</form>,
      });

      const data = new FormData(ref.current || undefined);
      expect(data.get('foo')).toBe('3');
    });

    test('resets to empty rating on form reset', async () => {
      const user = userEvent.setup();
      render(<Rating />, { wrapper: Form });

      await user.click(screen.getByLabelText('4 stars'));
      await user.click(screen.getByRole('button', { name: 'Reset' }));

      expect(screen.getByLabelText('Empty')).toBeChecked();
    });

    test('resets to defaultValue on form reset', async () => {
      const user = userEvent.setup();
      render(<Rating defaultValue={3} />, { wrapper: Form });

      await user.click(screen.getByLabelText('4 stars'));
      await user.click(screen.getByRole('button', { name: 'Reset' }));

      expect(screen.getByLabelText('3 stars')).toBeChecked();
    });
  });

  describe('iconComponent', () => {
    test('renders the provided Icon component', () => {
      const Icon = () => <span>my custom icon</span>;
      render(<Rating iconComponent={Icon} />);
      expect(screen.getAllByText('my custom icon')).toHaveLength(5);
    });

    test('provides the state to the Icon component', () => {
      const icon = jest.fn();

      render(<Rating iconComponent={icon} defaultValue={3} />);

      expect(icon).toHaveBeenCalledTimes(5);
      expect(icon).toHaveBeenCalledWith(expect.objectContaining({ value: 1, checked: false }), {});
      expect(icon).toHaveBeenCalledWith(expect.objectContaining({ value: 2, checked: false }), {});
      expect(icon).toHaveBeenCalledWith(expect.objectContaining({ value: 3, checked: true }), {});
      expect(icon).toHaveBeenCalledWith(expect.objectContaining({ value: 4, checked: false }), {});
      expect(icon).toHaveBeenCalledWith(expect.objectContaining({ value: 5, checked: false }), {});
    });
  });

  describe('highlighting', () => {
    test('highlights all stars up to the current value', () => {
      render(<Rating defaultValue={3} />);

      const label1 = screen.getByLabelText('1 star').closest('label');
      const label2 = screen.getByLabelText('2 stars').closest('label');
      const label3 = screen.getByLabelText('3 stars').closest('label');
      const label4 = screen.getByLabelText('4 stars').closest('label');
      const label5 = screen.getByLabelText('5 stars').closest('label');

      expect(label1).toHaveAttribute('data-active', 'true');
      expect(label2).toHaveAttribute('data-active', 'true');
      expect(label3).toHaveAttribute('data-active', 'true');
      expect(label4).toHaveAttribute('data-active', 'false');
      expect(label5).toHaveAttribute('data-active', 'false');
    });

    test('highlights only the active option if highlightSelectedOnly is set', () => {
      render(<Rating defaultValue={3} highlightSelectedOnly />);

      const label1 = screen.getByLabelText('1 star').closest('label');
      const label2 = screen.getByLabelText('2 stars').closest('label');
      const label3 = screen.getByLabelText('3 stars').closest('label');
      const label4 = screen.getByLabelText('4 stars').closest('label');
      const label5 = screen.getByLabelText('5 stars').closest('label');

      expect(label1).toHaveAttribute('data-active', 'false');
      expect(label2).toHaveAttribute('data-active', 'false');
      expect(label3).toHaveAttribute('data-active', 'true');
      expect(label4).toHaveAttribute('data-active', 'false');
      expect(label5).toHaveAttribute('data-active', 'false');
    });

    test('highlights all stars up to the current on hover', async () => {
      const user = userEvent.setup();
      render(<Rating defaultValue={3} />);

      await user.hover(screen.getByLabelText('4 stars'));

      const label1 = screen.getByLabelText('1 star').closest('label');
      const label2 = screen.getByLabelText('2 stars').closest('label');
      const label3 = screen.getByLabelText('3 stars').closest('label');
      const label4 = screen.getByLabelText('4 stars').closest('label');
      const label5 = screen.getByLabelText('5 stars').closest('label');

      expect(label1).toHaveAttribute('data-hovered', 'true');
      expect(label2).toHaveAttribute('data-hovered', 'true');
      expect(label3).toHaveAttribute('data-hovered', 'true');
      expect(label4).toHaveAttribute('data-hovered', 'true');
      expect(label5).toHaveAttribute('data-hovered', 'false');
    });

    test('highlights only the active option on hover if highlightSelectedOnly is set', async () => {
      const user = userEvent.setup();
      render(<Rating defaultValue={3} highlightSelectedOnly />);

      await user.hover(screen.getByLabelText('4 stars'));

      const label1 = screen.getByLabelText('1 star').closest('label');
      const label2 = screen.getByLabelText('2 stars').closest('label');
      const label3 = screen.getByLabelText('3 stars').closest('label');
      const label4 = screen.getByLabelText('4 stars').closest('label');
      const label5 = screen.getByLabelText('5 stars').closest('label');

      expect(label1).toHaveAttribute('data-hovered', 'false');
      expect(label2).toHaveAttribute('data-hovered', 'false');
      expect(label3).toHaveAttribute('data-hovered', 'false');
      expect(label4).toHaveAttribute('data-hovered', 'true');
      expect(label5).toHaveAttribute('data-hovered', 'false');
    });
  });

  describe('empty rating', () => {
    test('renders an empty rating option', () => {
      render(<Rating />);
      expect(screen.getByLabelText('Empty')).toBeInTheDocument();
    });

    test('clicking the empty rating calls onChange(null)', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Rating defaultValue={3} onChange={onChange} />);

      await user.click(screen.getByLabelText('Empty'));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(null);
    });

    test('uses the provided label for the empty rating option', () => {
      render(<Rating emptyLabelText="Not rated" />);
      expect(screen.queryByLabelText('Empty')).toBeNull();
      expect(screen.getByLabelText('Not rated')).toBeInTheDocument();
    });

    test('clicking on the active option selects the empty rating', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Rating defaultValue={3} onChange={onChange} />);

      await user.click(screen.getByLabelText('3 stars'));

      expect(screen.getByLabelText('Empty')).toBeChecked();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(null);
    });

    test('clicking on the active option does not reset the value if noEmptyRating is set', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Rating defaultValue={3} onChange={onChange} noEmptyRating />);

      await user.click(screen.getByLabelText('3 stars'));

      expect(screen.getByLabelText('3 stars')).toBeChecked();
      expect(onChange).not.toHaveBeenCalled();
    });

    test('noEmptyRating removes the empty rating', () => {
      render(<Rating noEmptyRating />);
      expect(screen.queryByLabelText('Empty')).toBeNull();
    });
  });

  test('adds the provided className', () => {
    const { container } = render(<Rating className="my-custom-rating-class" />);
    expect(container.querySelector('.my-custom-rating-class')).toBeInTheDocument();
  });
});

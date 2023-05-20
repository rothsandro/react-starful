import { render } from '@testing-library/react';

import ReactStarful from './react-starful';

describe('ReactStarful', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactStarful />);
    expect(baseElement).toBeTruthy();
  });
});

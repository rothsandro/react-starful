# react-starful

A customizable rating component for React, written in TypeScript.

- ✅ Controlled & uncontrolled mode
- ✅ Custom styling via CSS custom properties
- ✅ Customizable labels & icons
- ✅ Works with HTML forms
- ✅ Accessible by default
- ...and more!

Checkout the [demo and documentation](https://react-starful.sandroroth.com/)

## Installation

```bash
npm install react-starful
```

## Usage

```jsx
import { useState } from 'react';
import { Rating } from 'react-starful';
import './react-starful/styles';

const MyComponent = () => {
  const [rating, setRating] = useState(3);
  return <Rating value={rating} onChange={setRating} />;
};
```

Read the [documentation](https://react-starful.sandroroth.com/) for more information.

## Credits

- [Radix Icons](https://icons.radix-ui.com/)

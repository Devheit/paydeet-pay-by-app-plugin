# Paydeet Pay By App Plugin

A JavaScript plugin that enables seamless integration of [Paydeet's](https://www.paydeet.com/) pay-by-app checkout experience into your web application. Includes full TypeScript support out of the box.

## Installation
```
npm install @devheit/paydeet-pay-by-app-plugin
```

## Features

- Seamless iframe-based checkout experience
- Smooth animations for opening and closing
- Responsive design that works across all devices
- View transition API support for modern browsers
- Customizable payment flow
- Full TypeScript support with type definitions
- Clipboard read/write support within the checkout
- Staging/test environment support

## Usage

### Quick Checkout
```javascript
import PaydeetPlugin from '@devheit/paydeet-pay-by-app-plugin';

// Initialize checkout
const response = await PaydeetPlugin.checkout({
  amount: 1000, // Amount in cents
  apiKey: 'your-api-key',
  currency: 'USD',
  businessId: 'your-business-id',
});

// response: { success: boolean, message: string, callbackUrl: null }
```

### Using the Widget Directly
```javascript
import PaydeetPlugin from '@devheit/paydeet-pay-by-app-plugin';

const widget = PaydeetPlugin.PayByAppWidget({
  amount: 1000,
  apiKey: 'your-api-key',
  currency: 'USD',
  businessId: 'your-business-id',
  onSuccess: (response) => console.log('Payment succeeded:', response),
  onError: () => console.error('Payment failed'),
  onClose: () => console.log('Widget closed'),
});

// Render the widget into a container
await widget.render('#payment-container');

// Close the widget programmatically
await widget.close();
```

### Testing Mode
```javascript
// Use the staging environment for testing
await PaydeetPlugin.checkout({
  amount: 1000,
  apiKey: 'your-api-key',
  currency: 'USD',
  businessId: 'your-business-id',
  isTesting: true, // Routes to the staging environment
});
```

## Props

### Required

| Prop | Type | Description |
|------|------|-------------|
| `amount` | number | The payment amount in cents |
| `apiKey` | string | Your unique API key identifier |
| `currency` | string | A currency that matches the keys in [this list of currencies](https://gist.github.com/ksafranski/2973986) |
| `businessId` | string | Your unique business identifier |

### Optional

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isTesting` | boolean | `false` | When `true`, routes requests to the staging environment |

### Widget-Only Props

These additional props are available when using `PayByAppWidget` directly:

| Prop | Type | Description |
|------|------|-------------|
| `onSuccess` | `(response: string) => void` | Callback fired on successful payment |
| `onError` | `() => void` | Callback fired when payment fails |
| `onClose` | `() => void` | Callback fired when the widget is closed |

## Checkout Response

The `checkout()` method returns a promise that resolves to:

```typescript
{
  success: boolean;
  message: string;
  callbackUrl: null;
}
```

## Styling

The plugin comes with built-in styles for the modal overlay and animations. The checkout interface will be displayed in a responsive iframe that adapts to different screen sizes.

## Browser Support

The plugin supports all modern browsers and includes fallbacks for browsers that don't support the [View Transitions API.](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition)

## Development

To run the project locally:

```bash
# Install dependencies
npm install
# Start development server
npm run dev
# Build for production
npm run build
```

## Technical Details

The plugin is built using:
- [Vite](https://vite.dev/) for building and development
- [Zoid](https://www.npmjs.com/package/@krakenjs/zoid) for cross-domain component communication
- CSS animations for smooth transitions

## License

Private - All rights reserved

## Support

For support or inquiries, please visit https://www.paydeet.com/

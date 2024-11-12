# Paydeet Pay By App Plugin

A JavaScript plugin that enables seamless integration of [Paydeet's](https://www.paydeet.com/) pay-by-app checkout experience into your web application.

## Installation
```
npm install paydeet-pay-by-app-plugin
```

## Features

- Seamless iframe-based checkout experience
- Smooth animations for opening and closing
- Responsive design that works across all devices
- View transition API support for modern browsers
- Customizable payment flow

## Usage

### Implementation
```javascript
import PaydeetPlugin from 'paydeet-pay-by-app-plugin';
// Initialize checkout
await PaydeetPlugin.checkout({
amount: 1000, // Amount in cents
apiKey: 'your-merchant-id',
currency: 'USD'
});
```


## Required Props

| Prop | Type | Description |
|------|------|-------------|
| `amount` | number | The payment amount in cents |
| `apiKey` | string | Your unique merchant identifier |
| `currency` | string | A currency that matches the keys in [this list of currencies](https://gist.github.com/ksafranski/2973986)|

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

# js-address-autofill
A Javascript using the Google Places Autocomplete API for address completion in forms.

## Installation

This section will follow soon, after I've accomplished all tests.

## Running the Demo / DevServer

The demo is a simple single website that runs the script for tryouts. It can be set up in short time.

This setup also works for development since the webpack's filewatcher is activated as well.

#### 1. Add configuration

A configuration file is not supported yet, but will follow soon.

#### 2. Run the Server

```
npm start
```

This should start the server immediately and open up a new browser tab with the demo page.

If not so, there might be  a problem with the port configuration. The demo/dev server is configured for Port 9000 on localhost: `http://localhost:9000/`

To change this setting look in the `webpack.config.js` at the property: `devServer`.

## Commands

Following commands are supported by the build system:
```
npm start       // Starts the Devserver
npm run watch   // Starts the file watcher for development
npm run prod    // Bundles the minified javascript and source maps
npm run dev     // Bundles the unminified javascript and source maps
npm run build   // Runs dev and prod mode at once (to prepare releases)
npm run test    // Not integrated yet
```

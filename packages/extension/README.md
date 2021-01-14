<h1 align="center">Hello, Word! – Extension</h1>

<p align="center">
  <b>Download:</b>
  <a href="https://chrome.google.com/webstore/detail/wordzzz-%E2%80%93-learn-language/iekapmfhbnlnpgapdilmdlehfmelengm">Chrome/Chromium</a> |
  <a href="https://addons.mozilla.org/en-US/firefox/addon/wordzzz-learn-languages-by-sub">Firefox</a> |
  <a href="https://apps.apple.com/us/app/wordzzz/id1536124213">Safari</a> |
  <a href="https://wordzzz.app">Website</a> |
  <a href="https://www.patreon.com/wordzzz">Buy us a coffee</a>
</p>

<p align="center">
  <a href="https://chrome.google.com/webstore/detail/wordzzz-%E2%80%93-learn-language/iekapmfhbnlnpgapdilmdlehfmelengm"><img src="https://img.shields.io/chrome-web-store/users/iekapmfhbnlnpgapdilmdlehfmelengm?label=Chrome%20Users" alt="Badge"></img></a>
  <a href="https://addons.mozilla.org/addon/sponsorblock/?src=external-github"><img src="https://img.shields.io/amo/users/wordzzz-learn-languages-by-sub?label=Firefox%20Users" alt="Badge"></img></a>
</p>

### Private variables in a storage

`__devMode` – for dev development

# Building

Rename `config.json.example` to `config.json` and adjust configuration as desired.

There are also other build scripts available. Install `npm`, then run `npm install` in the repository to install dependencies.

Run `npm run build` to generate a Chrome extension.

Use `npm run build:firefox` to generate a Firefox extension.

The result is in `dist`. This can be loaded as an unpacked extension

## Developing with a clean profile

Run `npm run dev` to run the extension using a clean browser profile with hot reloading. Use `npm run dev:firefox` for Firefox. This uses [`web-ext run`](https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#commands).  
Known chromium bug: Extension is not loaded properly on first start. Visit `chrome://extensions/` and reload the extension.

## Debugging

Content: Developer Tools > Content scripts > ${extension_name}

Popup: Click on icon > Mouse Right Click on the popup > View code

`window.location.reload()`

Background: Go to `chrome://extensions/?id=${extension_id}` > Inspect views > Background

Options: Mouse Right Click on the popup settings > View code

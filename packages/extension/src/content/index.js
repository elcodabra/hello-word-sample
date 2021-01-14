import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import '../common.css';

const popupId = 'hw-root';
const iconId = 'hw-icon';

(() => {
  if (!document.getElementById(popupId)) {
    const root = document.createElement('div');
    root.id = popupId;

    document.body.append(root);

    document.addEventListener('mouseup', (e) => {
      const icon = document.getElementById(iconId);
      const popup = document.getElementById(popupId);
      if (popup.contains(e.target) || (icon && icon.contains(e.target))) {
        return null;
      }

      if (icon) icon.remove();
      ReactDOM.unmountComponentAtNode(popup);

      const selection = document.getSelection
        ? document.getSelection().toString()
        : document.selection.createRange().toString();

      if (!selection) {
        return null;
      }

      const word = selection.split(' ')[0];

      if (!word || /^[0-9\s.,]+$/.test(word)) {
        return null;
      }

      const block = document.createElement('div');
      block.id = iconId;
      block.style.position = 'absolute';
      block.style.left = `${e.pageX}px`;
      block.style.top = `${e.pageY}px`;

      const logo = document.createElement('img');
      // logo.src = `chrome-extension://${chrome.runtime.id}/images/logo.svg`;
      logo.width = 25;
      logo.height = 25;
      logo.className = 'hw-icon hw-icon__logo-content';

      block.append(logo);

      block.addEventListener('click', (e) => {
        block.remove();
        ReactDOM.render(<App x={e.pageX} y={e.pageY} word={word} />, popup);
      });

      setTimeout(() => {
        block.remove();
      }, 3000);

      document.body.append(block);
    });
  }
})();

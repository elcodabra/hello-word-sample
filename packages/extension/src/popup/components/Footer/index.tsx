import React from 'react';
import cn from 'classnames';

const Footer = ({ disabled }) => (
  <footer>
    <div className="hw_popup__delimiter" />
    <a
      className={cn('hw_button hw_button__primary', {
        hw_button__disabled: disabled,
      })}
      href={`chrome-extension://${chrome.runtime.id}/pages/learn.html`}
      target="_blank"
      rel="noreferrer"
      // disabled={disabled}
    >
      {chrome.i18n.getMessage('start_button')}
    </a>
  </footer>
);

export default Footer;

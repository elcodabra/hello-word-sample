import React from 'react';

import logoUrl from '~public/images/logo.svg';
import { IconHeart } from '~components/icons';

const Header = ({ isDev = false }) => {
  const ua = navigator.userAgent.toLowerCase();
  return (
    <header>
      <a
        className="hw_logo-item hw_popup__logo"
        href="https://wordzzz.app"
        target="_blank"
        rel="noreferrer"
        title="Logo of Wordzzz.App"
      >
        <img
          src={logoUrl}
          width={26}
          height={26}
          alt={chrome.i18n.getMessage('name')}
        />
        <h1 className="hw_logo-item-text">
          {chrome.i18n.getMessage('short_name') + (isDev ? ' [dev]' : '')}
        </h1>
      </a>
      {(ua.indexOf('safari') === -1 || ua.indexOf('chrome') > -1) && (
        <a
          className="hw_logo-item hw_popup__support"
          href="https://www.patreon.com/wordzzz"
          target="_blank"
          rel="noreferrer"
          title="We need your help!"
        >
          <IconHeart className="hw_logo-item-icon" />
          <span className="hw_logo-item-text hw_logo-item-support">
            Buy us a coffee
          </span>
        </a>
      )}
    </header>
  );
};

export default Header;

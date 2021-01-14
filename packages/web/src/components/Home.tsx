import React from 'react';
import { Link } from 'react-router-dom';

import Section from './Section';

const images = [
  {
    src: './assets/images/youtube_bg',
    alt: 'Learn languages with videos',
    description:
      'Learn languages with while watching your favourite shows on <b>YouTube & Netflix</b>',
  },
];

const Home = () => (
  <main className="container">
    <header className="header">
      <Link to="/" className="header__logo">
        <img
          className="header__logo_img"
          src="./assets/images/logo.svg"
          width={45}
          height={45}
          alt="Logo of Hello Word.app"
        />
      </Link>
      <Link to="/" className="header__title">
        hello, word!
      </Link>
    </header>
    {images.map((item, id) => (
      <Section key={id} id={id} {...item} />
    ))}
    <nav className="nav nav-main" id="links">
      <div className="nav__title">
        <h2>The New face of learning</h2>
        <div>Download Hello Word extension for your</div>
        <div>favourite web browser.</div>
      </div>
      <div className="nav__links">
        <a
          className="button button__primary"
          title="Download for Chrome, Opera and Yandex.Browser"
          href="https://chrome.google.com/webstore/detail/wordzzz-%E2%80%93-learn-languages/iekapmfhbnlnpgapdilmdlehfmelengm"
          target="_blank"
          rel="noreferrer"
        >
          Download for Chrome
        </a>
        <a
          className="button button__primary"
          title="Download for FireFox"
          href="https://addons.mozilla.org/en-US/firefox/addon/wordzzz-learn-languages-by-sub/"
          target="_blank"
          rel="noreferrer"
        >
          Download for FireFox
        </a>
        <a
          className="button button__primary"
          title="Download for Safari"
          href="https://apps.apple.com/us/app/wordzzz/id1536124213"
          target="_blank"
          rel="noreferrer"
        >
          Download for Safari
        </a>
      </div>
    </nav>
    <footer className="footer">
      <div className="footer__item">
        <div className="footer_title">Hello Word app</div>© Copyright 2020 Hello
        Word
      </div>
      <div className="footer__item">
        <div className="footer_title">Product</div>
        <a
          className="footer__link"
          title="Download for Chrome"
          href="https://chrome.google.com/webstore/detail/wordzzz-%E2%80%93-learn-languages/iekapmfhbnlnpgapdilmdlehfmelengm"
          target="_blank"
          rel="noreferrer"
        >
          Download for Chrome
        </a>
        <a
          className="footer__link"
          title="Download for Yandex"
          href="https://chrome.google.com/webstore/detail/wordzzz-%E2%80%93-learn-languages/iekapmfhbnlnpgapdilmdlehfmelengm"
          target="_blank"
          rel="noreferrer"
        >
          Download for Yandex
        </a>
        <a
          className="footer__link"
          title="Download for Opera"
          href="https://chrome.google.com/webstore/detail/wordzzz-%E2%80%93-learn-languages/iekapmfhbnlnpgapdilmdlehfmelengm"
          target="_blank"
          rel="noreferrer"
        >
          Download for Opera
        </a>
        <a
          className="footer__link"
          title="Download for Firefox"
          href="https://addons.mozilla.org/en-US/firefox/addon/wordzzz-learn-languages-by-sub/"
          target="_blank"
          rel="noreferrer"
        >
          Download for Firefox
        </a>
        <a
          className="footer__link"
          title="Download for Safari"
          href="https://apps.apple.com/us/app/wordzzz/id1536124213"
          target="_blank"
          rel="noreferrer"
        >
          Download for Safari
        </a>
      </div>
      <div className="footer__item">
        <div className="footer_title">Follow Us</div>
        <a
          className="footer__link"
          title="Follow us on Facebook"
          href="https://www.facebook.com/app.wordzzz"
          target="_blank"
          rel="noreferrer"
        >
          Facebook
        </a>
      </div>
    </footer>
  </main>
);

export default Home;

import React, { useRef, useState } from 'react';
import { sendTranslateRequest, Popup } from '@wordzzz/common';

import Image from './Image';

const getCaptionText = (selected, firstRef) =>
  'Find a house full of gorgeous young models'.split(' ').map((word, idx) =>
    word.length > 1 ? (
      <span
        key={idx}
        className={
          selected && selected.startsWith(word)
            ? 'caption__item-selected'
            : 'caption__item'
        }
        ref={idx === 0 ? firstRef : null}
      >
        {word}{' '}
      </span>
    ) : (
      `${word} `
    )
  );

const Section = ({ id, alt, src, description }) => {
  const [data, setData] = useState(null);
  const [currentWord, setCurrentWord] = useState(null);
  const initialWordRef = useRef(null);

  const onHandleRequest = (e) => {
    if (e.target.className === 'caption') {
      return null;
    }
    const word = e.target.textContent;
    const rect = e.target.getBoundingClientRect();
    const left = e.target.offsetLeft - (200 / 2 - rect.width / 2);
    const bottom = e.target.parentElement.getBoundingClientRect().height;

    setData({ view: 'loading', left, bottom });
    setCurrentWord(word);

    sendTranslateRequest(word)
      .then((response) => {
        if (!response) throw new Error('Translation not found');
        setData({ view: 'success', left, bottom, ...response });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        setData({ view: 'error', left, bottom });
      });
  };

  return (
    <section className="section">
      <div className="section__content">
        <h1 style={{ margin: '0 0 20px 0' }}>{alt}</h1>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        <nav className="nav">
          <a
            className={`button ${
              id === 0 ? 'button__primary' : 'button__secondary'
            }`}
            title="Download now"
            href="#links"
            rel="noreferrer"
          >
            Download for Free
          </a>
        </nav>
      </div>
      <div className="section__image">
        <Image
          src={src}
          alt={alt}
          onLoad={() => initialWordRef.current.click()}
        />
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className="caption" onClick={onHandleRequest}>
          {getCaptionText(currentWord, initialWordRef)}
          {data && <Popup {...data} />}
        </div>
      </div>
    </section>
  );
};

export default Section;

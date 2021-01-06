import React from 'react';

import "./styles.css";

const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
}

export const Popup = ({ view, left, word, transcription, translations }) => (
  <div className="popup__container" style={{ left }}>
    {view === 'loading' &&
      <div className="icon__loading"/>
    }
    {view === 'success' &&
      <>
        {transcription && <div className="popup__transcription">{transcription}</div>}
        <div className="popup__main-word">{word}</div>
        <div className="popup__translation">{translations.filter(onlyUnique).slice(0,2).join(', ')}</div>
        <div className="popup__button-add" />
      </>
    }
    {view === 'error' &&
      <div className="popup__container" style={{ left }}>
        <div className="popup__icon__search" />
        <div className="popup__empty-title">Translation not found</div>
        <div className="popup__empty-description">We can't find anything for the languages</div>
      </div>
    }
  </div>
);

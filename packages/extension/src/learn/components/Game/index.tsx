import React, { useState } from 'react';
import { IconCheck, IconNext } from '~components/icons';

const Game = ({ words, setView }) => {
  const [current, setCurrent] = useState(0);

  if (!words || !words.length) return null;

  const { text, transcription, translations } = words[current];
  return (
    <div className="hw_game">
      <div className="hw_game-title">
        <span>{chrome.i18n.getMessage('play_words', [words.length])}</span>
      </div>
      <div className="hw_game-container">
        <div className="hw_card">
          <div className="hw_card-front">
            <div className="hw_card__word">{text}</div>
            {transcription && (
              <div className="hw_card__hint">{transcription}</div>
            )}
          </div>
          <div className="hw_card-back">{translations.join(', ')}</div>
        </div>
      </div>
      <div className="hw_game-actions">
        <button
          type="button"
          className="hw_button hw_button__secondary"
          onClick={() => {
            // chrome.storage.sync.remove(current);
            if (current + 1 < words.length) {
              setCurrent(current + 1);
            } else {
              setView('finish');
            }
          }}
        >
          <div>
            <IconCheck className="hw_button__icon" />
            <div>{chrome.i18n.getMessage('iknow_word')}</div>
          </div>
        </button>
        <button
          type="button"
          className="hw_button hw_button__secondary"
          onClick={() => {
            if (current + 1 < words.length) {
              setCurrent(current + 1);
            } else {
              setView('finish');
            }
          }}
        >
          <div>
            <IconNext className="hw_button__icon" />
            <div>{chrome.i18n.getMessage('next_word')}</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Game;

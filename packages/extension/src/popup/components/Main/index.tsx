import React from 'react';
import { removeWordFromStorage, removeAllWordsFromStorage } from '~utils';

const Main = ({ words, setWords }) => (
  <main>
    {words.length !== 0 && (
      <div className="hw_popup__title">
        <span>{chrome.i18n.getMessage('saved_words', [words.length])}</span>
        <a
          href="#"
          style={{ float: 'right' }}
          onClick={() => {
            removeAllWordsFromStorage();
            setWords([]);
          }}
        >
          {chrome.i18n.getMessage('clear_button')}
        </a>
      </div>
    )}

    {words.length === 0 ? (
      <div className="hw_skeleton">
        <div className="hw_skeleton_icon">
          <div className="hw_skeleton_icon-list">
            <div className="hw_skeleton_icon-list-item" />
            <div className="hw_skeleton_icon-list-item hw_skeleton_icon-list-item__big" />
            <div className="hw_skeleton_icon-list-item" />
          </div>
        </div>
        <div className="hw_skeleton_title">
          {chrome.i18n.getMessage('skeleton_empty_title')}
        </div>
        <div className="hw_skeleton_hint">
          {chrome.i18n.getMessage('skeleton_empty_hint')}
        </div>
      </div>
    ) : (
      <div className="hw_popup__words">
        <ul className="hw_popup__words-list">
          {words.map(({ text, transcription, translations }, index) => (
            <li key={index} className="hw_popup__words-list-item">
              <div className="hw_popup__item_content">
                <span className="hw_popup__main-word">{text}</span>
                {transcription && (
                  <span className="hw_popup__transcription">
                    {transcription}
                  </span>
                )}
                <br />
                {translations.join(', ')}
              </div>
              <a
                className="hw_popup__item_clear"
                href="#"
                onClick={() => {
                  removeWordFromStorage(text);

                  const newWords = [...words];
                  newWords.splice(index, 1);
                  setWords(newWords);
                }}
              >
                &nbsp;
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </main>
);

export default Main;

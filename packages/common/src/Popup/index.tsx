import React, { ReactElement, useEffect, useState } from 'react';
import cn from 'classnames';

import { IconAudioPlay, IconSearch } from '../icons';
import type { Word } from '../@types';

import './styles.css';

type Type = Word & {
  view?: 'loading' | 'success' | 'error';
  left?: string;
  top?: string;
  bottom?: string;
  onAdd?: () => void;
};

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

export const Popup: React.FC<Type> = React.memo(
  ({
    view = 'loading',
    left,
    top,
    bottom,
    text,
    transcription,
    translations,
    soundUrl,
    onAdd,
  }): ReactElement => {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
      setAnimated(false);
    }, [text]);

    const handleAdd = (e) => {
      e.stopPropagation();

      setAnimated(true);
      onAdd();
    };

    const playSound = React.useCallback(() => {
      if (!soundUrl) return null;
      const audio = new Audio(soundUrl);
      audio.play();
    }, [soundUrl]);

    return (
      <div
        className={cn('hw_popup', { hw_popup_animated: animated })}
        style={{ left, top, bottom }}
      >
        <div className="hw_popup__container">
          {view === 'loading' && <div className="hw_icon__loading" />}
          {view === 'success' && (
            <>
              <div className="hw_popup__header">
                {playSound && (
                  <IconAudioPlay
                    className="hw_popup__icon hw_popup__icon-sound"
                    onClick={playSound}
                  />
                )}
                {transcription && (
                  <div className="hw_popup__transcription">{transcription}</div>
                )}
              </div>
              <div className="hw_popup__main-word">{text}</div>
              <div className="hw_popup__translation">
                {translations.filter(onlyUnique).slice(0, 2).join(', ')}
              </div>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <div
                className="hw_popup__button-add"
                onClick={onAdd && handleAdd}
              />
            </>
          )}
          {view === 'error' && (
            <>
              <IconSearch />
              <div className="hw_popup__empty-title">
                {chrome && chrome.i18n
                  ? chrome.i18n.getMessage('translation_not_found_title')
                  : 'Translation not found'}
              </div>
              <div className="hw_popup__empty-description">
                {chrome && chrome.i18n
                  ? chrome.i18n.getMessage('translation_not_found_description')
                  : "We can't find anything for the word"}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

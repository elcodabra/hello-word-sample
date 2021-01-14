import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import './styles.css';

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

export const Popup = ({
  view,
  left,
  top,
  bottom,
  word,
  transcription,
  translations,
  onAdd,
}) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(false);
  }, [word]);

  const handleAdd = (e) => {
    e.stopPropagation();

    setAnimated(true);
    onAdd();
  };

  return (
    <div
      className={cn('hw_popup', { hw_popup_animated: animated })}
      style={{ left, top, bottom }}
    >
      <div className="hw_popup__container">
        {view === 'loading' && <div className="hw_icon__loading" />}
        {view === 'success' && (
          <>
            {transcription && (
              <div className="hw_popup__transcription">{transcription}</div>
            )}
            <div className="hw_popup__main-word">{word}</div>
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
          <div className="hw_popup__container" style={{ left }}>
            <div className="hw_popup__icon__search" />
            <div className="hw_popup__empty-title">Translation not found</div>
            <div className="hw_popup__empty-description">
              We can't find anything for the languages
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

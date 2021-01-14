import React, { useEffect, useState } from 'react';
import { getAllWordsFromStorage } from '~utils';

import Game from '../Game';

const App = () => {
  const [view, setView] = useState('game');
  const [words, setWords] = useState([]);

  useEffect(() => {
    getAllWordsFromStorage(({ __config = {}, ...items }) => {
      setWords(Object.keys(items).map((current) => items[current]));
    });
  }, []);

  return (
    <div className="hw_learn">
      {view === 'game' && <Game words={words} setView={setView} />}
      {view === 'finish' && (
        <>
          <h1 className="hw_title__success">Congratulations!</h1>
          {Array(10)
            .fill(1)
            .map((_, index) => (
              <div key={index} className="hw_confetti" />
            ))}
        </>
      )}
    </div>
  );
};

export default App;

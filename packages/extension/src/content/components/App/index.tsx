import React, { useEffect, useState } from 'react';
import { Popup } from '@wordzzz/common';

import { setWordToStorage } from '~utils';

const App = ({ x, y, word }) => {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 300);
  }, [word]);

  const handleAdd = () => {
    setWordToStorage(word, { text: word, translations: [word] });
  };

  return (
    <Popup
      view={status}
      left={x}
      top={y}
      word={word}
      translations={[word]}
      onAdd={handleAdd}
    />
  );
};

export default App;

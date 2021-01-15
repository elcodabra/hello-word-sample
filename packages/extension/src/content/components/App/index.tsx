import React, { useEffect, useState } from 'react';
import { sendTranslateRequest, Popup } from '@wordzzz/common';

import { setWordToStorage } from '~utils';

const App = ({ x, y, word }) => {
  const [data, setData] = useState({ view: 'loading' });

  useEffect(() => {
    setData({ view: 'loading' });
    sendTranslateRequest(word)
      .then((response) => {
        if (!response) throw new Error('Translation not found');
        setData({ view: 'success', ...response });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        setData({ view: 'error' });
      });
  }, [word]);

  const handleAdd = () => {
    // eslint-disable-next-line no-unused-vars
    const { view, ...response } = data;
    setWordToStorage(word, response);
  };

  return <Popup left={x} top={y} {...data} onAdd={handleAdd} />;
};

export default App;

import React, { useEffect, useState } from 'react';
import type { StorageData } from '@wordzzz/common';
import { getAllWordsFromStorage } from '~utils';

import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';

const App = () => {
  const [config, setConfig] = useState({
    devMode: false,
  });
  const [words, setWords] = useState([]);

  useEffect(() => {
    getAllWordsFromStorage(({ __config = {}, ...items }: StorageData) => {
      setConfig(__config);
      setWords(Object.keys(items).map((current) => items[current]));
    });
  }, []);

  return (
    <>
      <Header isDev={config.devMode} />
      <div className="hw_popup__delimiter" />
      <Main words={words} setWords={setWords} />
      <Footer disabled={words.length === 0} />
    </>
  );
};

export default App;

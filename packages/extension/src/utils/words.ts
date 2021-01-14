// https://developer.chrome.com/extensions/content_scripts#host-page-communication
// https://developer.chrome.com/extensions/storage

export const setWordToStorage = (word, options) => {
  chrome.storage.sync.set({ [word]: options });
};

export const getAllWordsFromStorage = (callback) => {
  chrome.storage.sync.get(null, callback);
};

export const removeWordFromStorage = (word) => {
  chrome.storage.sync.remove(word);
};

export const removeAllWordsFromStorage = () => {
  chrome.storage.sync.get(
    '__config',
    ({ __config: { __newUser = true, ...__config } = {} }) => {
      chrome.storage.sync.clear(() => {
        chrome.storage.sync.set({
          __config: { ...__config, __newUser },
        });
      });
    }
  );
};

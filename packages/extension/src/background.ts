import type { Items, StorageData } from '@wordzzz/common';

type StorageChange = browser.storage.StorageChange;
type StorageChangeData = { [p: string]: StorageChange } & {
  __config?: {
    devMode?: StorageChange;
  };
};

window['__devMode'] = false;

// Default badge color
chrome.browserAction.setBadgeBackgroundColor({ color: '#E02020' });

const setBadgeFormatted = (items: Items) => {
  let unviewedWords = 0;
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const prop in items) {
    unviewedWords += items[prop].viewed ? 0 : 1;
  }
  chrome.browserAction.setBadgeText({
    text: unviewedWords === 0 ? '' : unviewedWords.toString(),
  });
};

chrome.storage.sync.get(null, ({ __config = {}, ...items }: StorageData) => {
  window['__devMode'] = __config.devMode;
  setBadgeFormatted(items);
});

chrome.storage.onChanged.addListener(({ __config }: StorageChangeData) => {
  if (__config && __config.devMode && __config.devMode.newValue) {
    window['__devMode'] = __config.devMode.newValue;
  } else {
    chrome.storage.sync.get(null, ({ __config, ...items }: StorageData) => {
      setBadgeFormatted(items);
    });
  }
});

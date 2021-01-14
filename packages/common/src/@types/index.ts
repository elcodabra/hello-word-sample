export type Word = {
  text: string;
  translations: [string];
  transcription: string;
  viewed?: boolean;
};

export type Items = {
  [word: string]: Word;
};

export type StorageData = Items & {
  __config?: {
    devMode?: boolean;
    newUser?: boolean;
  };
};

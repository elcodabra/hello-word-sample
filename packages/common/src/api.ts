import { Word } from './@types';

export const sendTranslateRequest = (search: string): Promise<Word> =>
  fetch(
    `https://dictionary.skyeng.ru/api/public/v1/words/search?search=${search}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length > 0) {
        return {
          text: data[0].text,
          translations: data[0].meanings
            .slice(0, 2)
            .map(({ translation: { text } }) => text),
          transcription: `/${data[0].meanings[0].transcription}/`,
          previewUrl: data[0].meanings[0].previewUrl,
          imageUrl: data[0].meanings[0].imageUrl,
          soundUrl: data[0].meanings[0].soundUrl,
        };
      }
      throw new Error('Empty data');
    })
    .catch((error) => Promise.reject(error));

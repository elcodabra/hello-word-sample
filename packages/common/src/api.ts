import { Word } from './@types';

export const sendTranslateRequest = (search: string): Promise<Word> =>
  fetch(
    `https://dictionary.skyeng.ru/api/public/v1/words/search?search=${search}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length > 0) {
        const result = {
          text: data[0].text,
          translations: data[0].meanings
            .slice(0, 2)
            .map(({ translation: { text } }) => text),
        };

        if (data[0].meanings[0].transcription) {
          result['transcription'] = `/${data[0].meanings[0].transcription}/`;
        }

        if (data[0].meanings[0].previewUrl) {
          result['previewUrl'] = data[0].meanings[0].previewUrl;
        }

        if (data[0].meanings[0].imageUrl) {
          result['imageUrl'] = data[0].meanings[0].imageUrl;
        }

        if (data[0].meanings[0].soundUrl) {
          result['soundUrl'] = data[0].meanings[0].soundUrl;
        }

        return result;
      }
      throw new Error('Empty data');
    })
    .catch((error) => Promise.reject(error));

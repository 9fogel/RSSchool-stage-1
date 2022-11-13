import birdsDataEn from './birdsEn';
import birdsDataRu from './birdsRu';

let lang = 'ru';

export let birds;
if (lang === 'ru') {
  birds = birdsDataRu;
} else {
  birds = birdsDataEn;
}
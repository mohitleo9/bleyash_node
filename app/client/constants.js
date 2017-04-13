import lodash from 'lodash';
import commonConstants from '../common/commonConstants';

const API_URL = '/api';

const PLACE_TYPES = commonConstants.PLACE_TYPES;

const PLACE_TYPES_TO_URLS = {
  [PLACE_TYPES.BAR]: 'bars',
  [PLACE_TYPES.RESTURANT]: 'resturants',
  [PLACE_TYPES.CLUB]: 'clubs',
  [PLACE_TYPES.CAFE]: 'cafes',
  [PLACE_TYPES.PUB]: 'pubs',
};


const CLOUDINARY_UPLOAD_PRESET = 'tycody28';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/bleyash/upload';

const URLS_TO_PLACE_TYPES = lodash.invert(PLACE_TYPES_TO_URLS);

export {
  API_URL,
  PLACE_TYPES,
  PLACE_TYPES_TO_URLS,
  URLS_TO_PLACE_TYPES,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_UPLOAD_URL,
};

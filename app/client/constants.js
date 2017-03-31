import lodash from 'lodash';

const API_URL = '/api';

const PLACE_TYPES = {
  BAR: 'bar',
  RESTURANT: 'resturant',
  CLUB: 'club'
};

const PLACE_TYPES_TO_URLS = {
  [PLACE_TYPES.BAR]: 'bars',
  [PLACE_TYPES.RESTURANT]: 'resturants',
  [PLACE_TYPES.CLUB]: 'clubs'
};

const URLS_TO_PLACE_TYPES = lodash.invert(PLACE_TYPES_TO_URLS);

export {
  API_URL,
  PLACE_TYPES,
  PLACE_TYPES_TO_URLS,
  URLS_TO_PLACE_TYPES
};

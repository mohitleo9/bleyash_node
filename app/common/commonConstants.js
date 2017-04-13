const PLACE_TYPES = {
  BAR: 'bar',
  RESTURANT: 'resturant',
  CLUB: 'club',
  CAFE: 'cafe',
  PUB: 'pub',
};

const YES_NO_PLACE_ATTRS = ['alcohol', 'creditCard', 'wifi', 'ac', 'parking', 'outsideSitting', 'view', 'liveMusic'];

const YES_NO_PLACE_ATTRS_DISPLAY_LABELS = {
  alcohol: 'Alcohol',
  creditCard: 'Credit Card',
  wifi: 'Wifi',
  ac: 'A/C',
  parking: 'Parking',
  outsideSitting: 'Outside Sitting',
  view: 'View',
  liveMusic: 'Live Music',
};

module.exports = {
  PLACE_TYPES: PLACE_TYPES,
  YES_NO_PLACE_ATTRS: YES_NO_PLACE_ATTRS,
  YES_NO_PLACE_ATTRS_DISPLAY_LABELS: YES_NO_PLACE_ATTRS_DISPLAY_LABELS
};

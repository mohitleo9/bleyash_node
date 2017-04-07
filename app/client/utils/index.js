// this is only for serbia
const getFormattedAddress = (a) =>
  `${a.address1}, ${a.city} ${a.zipcode}, ${a.country}`;

export {
  getFormattedAddress
};

// this is only for serbia
const getFormattedAddress = (a, includeNeighborhood) =>
  includeNeighborhood ?
    `${a.address1}, ${a.neighborhood}, ${a.city} ${a.zipcode}, ${a.country}`
    :`${a.address1}, ${a.city} ${a.zipcode}, ${a.country}`;

export {
  getFormattedAddress
};

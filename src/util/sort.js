// sort JSON object array based on a key attribute
// call method: array.sort(getSortOrder('name'))
const getSortOrder = (prop) => {
  return function(a, b) {
    if (a[prop] > b[prop]) return 1;
    else if (a[prop] < b[prop]) return -1;
    return 0;
  }
};

export { getSortOrder };
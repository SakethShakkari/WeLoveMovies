const lodash = require("lodash");

function addCritic(data) {
  if (data) {
    let formattedData;

    if (Array.isArray(data)) {
      formattedData = data.map((review) => {
        return Object.entries(review).reduce((accumulator, [key, value]) => {
          return lodash.set(accumulator, key, value);
        }, {});
      });
    } else {
      formattedData = Object.entries(data).reduce((accumulator, [key, value]) => {
        return lodash.set(accumulator, key, value);
      }, {});
    }

    return formattedData;
  }

  return data;
}

module.exports = addCritic;

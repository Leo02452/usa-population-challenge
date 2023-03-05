const axios = require('axios');


async function fetchDataUSAAPI() {
  const { data } = await axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
  return data.data;
}

module.exports = fetchDataUSAAPI;

const axios = require('axios');
const money = require('money');

//Up_To_Date Recources (API)
//URL where base is Eur
const RATES_URL = 'https://api.exchangeratesapi.io/latest';
const BLOCKCHAIN_URL = 'https://blockchain.info/ticker';
const CURRENCY_BITCOIN = 'BTC';
// For 2 given args apply if BTC is included

    /*
     * Check inputs if BTC Exists
     * @param {Currency1,Currency2}
     * @example isAnyBTC("USD", "BTC");
     * @return {Boolean}
     */
const isAnyBTC = (from, to) => [from, to].includes(CURRENCY_BITCOIN);

    /*
     * Run as index.js Waits
     * @param {amount,from,to}
     * @example module.exports (100,"BTC", "USD");?
     * @return {money.convert(amount,{opts})}
     */
module.exports = async opts => {

//Setting default values
  const {amount = 1, from = 'USD', to = CURRENCY_BITCOIN} = opts;

  const promises = [];

  let base = from;

  const anyBTC = isAnyBTC(from, to);

//If we've BTC as from result is USD if not we will get BTC as a result
  if (anyBTC) {
    //base can't be BTC
    base = from === CURRENCY_BITCOIN ? to : from;
	//connect to BLOCKCHAIN_URL that is related to BTC
    promises.push(axios(BLOCKCHAIN_URL));
  }
//openning connection with rates and passing into the api the base
//unshift=add at the begining of the array and display number of values in array
//RATES_URL where BTC not exist
  promises.unshift(axios(`${RATES_URL}?base=${base}`));
  try {
    const responses = await Promise.all(promises);
    //Getting HTTP Responses from RATES_URL in a data
    //1st All Valid currencies
    //2nd array of rates where base is USD (By Default)
    //first http request from responses []
    const [myfirstvalue] = responses;
    //data Object having all rates wrt USD
    money.base = myfirstvalue.data.base;
    money.rates = myfirstvalue.data.rates;

    const conversionOpts = {
      from,
      to
    };

    //Get BTC value and append in Rating List
    if (anyBTC) {
      const blockchain = responses.find(response =>
        response.data.hasOwnProperty(base)
      );
      Object.assign(money.rates, {
        'BTC': blockchain.data[base].last
      });
    }

    //Append condition of swapping from to
    if (anyBTC) {
      Object.assign(conversionOpts, {
        'from': to,
        'to': from
      });
    }
    //Calling money.convert using money Library that converts by (amount,from,to)
    return money.convert(amount, conversionOpts);
  } catch (error) {
    throw new Error (
      '💵 Please specify a valid `from` and/or `to` currency value!'
    );
  }
};

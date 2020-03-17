//Mock (Sample Code) From API
const nock = require('nock');
const index = require('./index');
//const cli = require('./cli.js');

beforeEach(() => {
  nock('https://api.exchangeratesapi.io')
    .get('/latest?base=USD')
    .reply(200, {
      'base': 'USD',
      'rates': {
        'EUR': 0.899
      }
    });

  nock('https://api.exchangeratesapi.io')
    .get('/latest?base=EUR')
    .reply(200, {
      'base': 'EUR',
      'rates': {
        'USD': 1.1122
      }
    });

  nock('https://blockchain.info')
    .get('/ticker')
    .reply(200, {
      'USD': {
        '15m': 8944.49,
        'last': 8944.49,
        'buy': 8944.49,
        'sell': 8944.49,
        'symbol': '$'
      },
      'EUR': {
        '15m': 8048.11,
        'last': 8048.11,
        'buy': 8048.11,
        'sell': 8048.11,
        'symbol': '€'
      }
    });
});

describe('currency', () => {
  test('should convert 1 USD to EUR', async () => {
    conversionOpts={
      'from': 'USD',
      'to': 'EUR'
    });
      expect(index(1,conversionOpts)).tobe(0.899);
  });

  test('should convert 1 USD to USD', async () => {
    conversionOpts={
      'from': 'USD',
      'to': 'USD'
    });
      expect(index(1,conversionOpts)).tobe(1);
  });

  test('should convert 1 EUR to USD', async () => {
    conversionOpts={
      'from': 'EUR',
      'to': 'USD'
    });
      expect(index(1,conversionOpts)).tobe(1.1122);
  });

  test('should convert 1 BTC to USD', async () => {
    conversionOpts={
      'from': 'BTC',
      'to': 'USD'
    });
      expect(index(1,conversionOpts)).toBeCloseTo(0.00018946678363082774);
  });

  test('should convert 1 BTC to EUR', async () => {
    conversionOpts={
      'from': 'BTC',
      'to': 'EUR'
    };
      expect(index(1,conversionOpts)).tobe(4807.77);
  });

  test('should convert (with default values) without arguments', async () => {
    //From BTC to USD
    expect(index()).toBeCloseTo(0.00018946678363082774);
  });

  test('should convert with amount only as argument', async () => {
      expect(index(5)).toBeCloseTo(5*0.00018946678363082774);
      expect(index(10)).toBeCloseTo(0.0018946678363082774);
  });

  test('should convert with amount and (from) currency only as arguments', async () => {
    conversionOpts={
      'from': 'BTC',
      'to': 'EUR'
    };
    expect(index(1,conversionOpts)).tobe(4807.77);
  });

  test('should return errors message for unknown `from` or `to` currency value', async () => {
    throw new Error(
      'test not yet defined... remove the throw and write your test here'
    );
  });
});

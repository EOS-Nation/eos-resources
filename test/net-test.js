const test = require('tape')
const {eosNetPriceKb} = require('../');

// Dataset
const account = require('./data/account.eosnationftw.json')

test('eosNetPriceKb', async (t) => {
  t.equal(await eosNetPriceKb(account), 607.375)
  t.end()
})

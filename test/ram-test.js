const test = require('tape')
const { eosRamPriceKb } = require('../');

// Dataset
const rammarket = require('./data/eosio.eosio.rammarket')

test('eosRamPriceKb', async (t) => {
  t.equal(await eosRamPriceKb(rammarket), 0.08044544)
  t.end()
})

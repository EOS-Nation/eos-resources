const test = require('tape')
const {eosRamPriceKb} = require('../');

// Dataset
const rammarketTable = require('./data/eosio.eosio.rammarket')

test('eosRamPriceKb', t => {
  t.equal(eosRamPriceKb(rammarketTable), 0.08044544)
  t.end()
})

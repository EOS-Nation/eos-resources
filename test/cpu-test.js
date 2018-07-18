const test = require('tape')
const {eosCpuPriceMs} = require('../');

// Dataset
const account = require('./data/account.eosnationftw.json')

test('eosCpuPriceMs', async (t) => {
  t.equal(await eosCpuPriceMs(account), 26.415)
  t.end()
})

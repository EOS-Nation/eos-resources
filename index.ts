/**
 * EOS RAM Price in kilobytes
 *
 * @param {Object} rammarket table eosio eosio rammarket (JSON)
 * @returns {number} EOS RAM Price in kilobytes
 * @example
 * import { eosRamPriceKb } from 'eos-market-info';
 *
 * const rammarket = {
 *   "rows": [{
 *       "supply": "10000000000.0000 RAMCORE",
 *       "base": {
 *         "balance": "29576462570 RAM",
 *         "weight": "0.50000000000000000"
 *       },
 *       "quote": {
 *         "balance": "2323462.3453 EOS",
 *         "weight": "0.50000000000000000"
 *       }
 *     }
 *   ],
 *   "more": false
 * }
 * const priceKb = eosRamPriceKb(rammarket);
 * priceKb //=> 0.08044544
 */
export function eosRamPriceKb(rammarket: any) {
  // asserts
  if (!rammarket) { throw new Error("table eosio eosio rammarket is required"); }
  if (!rammarket.rows.length) { throw new Error("table eosio eosio rammarket is missing rows"); }

  // variables
  const baseBalance = rammarket.rows[0].base.balance.replace(" RAM", "");
  const quoteBalance = rammarket.rows[0].quote.balance.replace(" EOS", "");
  const priceKb = Number((quoteBalance / baseBalance).toFixed(8)) * 1024;

  // results
  return priceKb;
}

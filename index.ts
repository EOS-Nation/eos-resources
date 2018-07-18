import axios from "axios";

const DEFAULT_API = "https://api.eosn.io";

/**
 * EOS RAM Price in kilobytes
 *
 * @param {Object} [rammarket] table eosio eosio rammarket (JSON)
 * @returns {Promise<number>} EOS RAM Price in kilobytes
 * @example
 * eosResources.eosRamPriceKb()
 *   .then(priceKb => console.log(priceKb));
 */
export async function eosRamPriceKb(rammarket?: any) {
    if (!rammarket) { rammarket = await getRAMMarket(); }

    // asserts
    if (!rammarket.rows.length) { throw new Error("table eosio eosio rammarket is missing rows"); }

    // variables
    const baseBalance = rammarket.rows[0].base.balance.replace(" RAM", "");
    const quoteBalance = rammarket.rows[0].quote.balance.replace(" EOS", "");
    const priceKb = Number((quoteBalance / baseBalance).toFixed(8)) * 1024;

    // results
    return priceKb;
}

/**
 * EOS CPU Price in milliseconds
 *
 * @param {Object} [account] Account Details JSON
 * @returns {number} EOS CPU Price in milliseconds
 * @example
 * eosResources.eosCpuPriceMs()
 *   .then(priceMs => console.log(priceMs));
 */
export async function eosCpuPriceMs(account?: any) {
    if (!account) { account = await getAccount("eosnationftw"); }

    if (!account.total_resources) { throw new Error("[total_resources] is missing in account"); }
    if (!account.cpu_limit) { throw new Error("[cpu_limit] is missing in account"); }

    const { total_resources, cpu_limit } = account;
    const cpu_weight = total_resources.cpu_weight.replace(" EOS", "");
    const priceMs = Number(cpu_limit.max / cpu_weight) / 1000;

    return priceMs;
}

/**
 * EOS Net Price in kilobytes
 *
 * @param {Object} [account] Account Details JSON
 * @returns {number} EOS Net Price in kilobytes
 * @example
 * eosResources.eosNetPriceKb()
 *   .then(priceKb => console.log(priceKb));
 */
export async function eosNetPriceKb(account?: any) {
    if (!account) { account = await getAccount("eosnationftw"); }

    if (!account.total_resources) { throw new Error("[total_resources] is missing in account"); }
    if (!account.net_limit) { throw new Error("[net_limit] is missing in account"); }

    const { total_resources, net_limit } = account;
    const net_weight = total_resources.net_weight.replace(" EOS", "");
    const priceKb = Number(net_limit.max / net_weight) / 1024;

    return priceKb;
}

/**
 * Get Account
 *
 * @param {string} account_name Account Name
 * @param {string} [api="https://api.eosn.io"] EOSIO API endpoint
 * @returns {Promise<Object>} Account Details JSON
 * @example
 * eosResources.getAccount('eosnationftw')
 *   .then(account => console.log(account));
 */
export function getAccount(account_name: string, api = DEFAULT_API) {
    const url = `${api}/v1/chain/get_account`;
    const params = { account_name };
    const configs = { responseType: "JSON" };
    return axios.post(url, params, configs)
        .then((request) => {
            return request.data;
        })
        .catch((error) => {
            if (error) { console.error(error); }
        });
}

/**
 * Get RAM Market
 *
 * @param {string} [api="https://api.eosn.io"] EOSIO API endpoint
 * @returns {Promise<Object>} RAM Market JSON
 * @example
 * eosResources.getRAMMarket('eosnationftw')
 *   .then(rammarket => console.log(rammarket));
 */
export function getRAMMarket(api = DEFAULT_API) {
    const url = `${api}/v1/chain/get_table_rows`;
    const params = {
        scope: "eosio",
        code: "eosio",
        table: "rammarket",
        json: true,
    };
    const configs = { responseType: "JSON" };
    return axios.post(url, params, configs)
        .then((request) => {
            return request.data;
        })
        .catch((error) => {
            if (error) { console.error(error); }
        });
}

// (async () => {
//     const priceKb = await eosNetPriceKb()
//     console.log(priceKb)
//     const priceMs = await eosCpuPriceMs()
//     console.log(priceMs)
// })();

const axios = require('axios');
const accountRepo = require('../repositories/accountRepository');

async function pushToDestination(dest, payload) {
  try {
    if (dest.method === 'GET') {
      return await axios.get(dest.url, { params: payload, headers: dest.headers });
    }
    return await axios({
      url: dest.url,
      method: dest.method,
      data: payload,
      headers: dest.headers
    });
  } catch (err) {
    throw new Error(`destination failed: ${dest.id}, ${err.message}`);
  }
}

module.exports = {
  async handle(token, jsonBody) {
    try {
      const account = await accountRepo.getByToken(token);
      if (!account) return { error: 'unauthenticated' };

      if (!account.destinations || account.destinations.length === 0) {
        return { message: 'no destinations configured for this account' };
      }

      const outcomes = await Promise.all(
        account.destinations.map(async (d) => {
          try {
            const res = await pushToDestination(d, jsonBody);
            return { id: d.id, status: res.status };
          } catch (e) {
            return { id: d.id, status: 'failed', msg: e.message };
          }
        })
      );

      return { accountId: account.id, count: outcomes.length, outcomes };
    } catch (err) {
      console.error('handle error:', err);
      return { error: 'internal error while handling data', detail: err.message };
    }
  }
};
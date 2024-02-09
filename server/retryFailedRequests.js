const axios = require('axios');
const FailedRequest = require('./models/FailedRequest');

async function retryFailedRequests() {
  const failedRequests = await FailedRequest.find();
  for (const request of failedRequests) {
    try {
      await axios[request.method.toLowerCase()](request.endpoint, request.data);
      await request.remove();
    } catch (err) {
      console.log(`Failed to retry request to ${request.endpoint}: ${err.message}`);
    }
  }
}

module.exports = retryFailedRequests;
const express = require('express');

const router = express.Router();
const common = require('../lib/common.js');

router.get('/start', (req, res) => {
  const requestData = {
    ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    requestAddress: req.query.request,
    requestTimestamp: Math.floor(Date.now() / 1000),
  };

  const productID = common.randomString(12);
  common.INSTANCES[productID] = requestData;

  // eslint-disable-next-line no-console
  console.log(`Created productID ${productID} with data ${JSON.stringify(common.INSTANCES[productID])}`);

  res.redirect(`/code/${productID}`);
});

module.exports = router;


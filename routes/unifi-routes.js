const express = require('express');

const router = express.Router();
const common = require('../lib/common.js');

router.get('/guest/s/:siteName/', (req, res) => {
  const requestData = {
    siteName: req.params.siteName,
    macID: req.query.id,
    requestTimestamp: req.query.t,
    SSID: req.query.ssid,
  };

  const productID = common.randomString(12);
  common.INSTANCES[productID] = requestData;

  res.redirect(`/code/${productID}`);
});

module.exports = router;

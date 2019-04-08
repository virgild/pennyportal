const express = require('express');

const router = express.Router();
const crypto = require('crypto');

const hbs = require('hbs');
const config = require('../config/config.js');
const common = require('../lib/common.js');
const wifiFunctions = require('../lib/unifi-functions.js');

hbs.registerPartials(`${__dirname}/views/partials`);

/* GET home page. */
router.get('/code/:code', (req, res) => {
  const userData = common.INSTANCES[req.params.code];
  res.render('index', {
    layout: 'default',
    // template: 'index',
    title: config.title,
    siteName: userData.siteName,
    macID: userData.macID,
    requestTimestamp: userData.requestTimestamp,
    SSID: userData.SSID,
  });
});

router.post('/authorize', (req, res) => {
  // Body parsed into JSON by body-parser
  const { body } = req;
  const userData = common.INSTANCES[body.productID];
  if (!userData) {
    res.status(404).send('unknown code');
    return;
  }

  const payload = [body.id, body.userHash, body.merchantID, body.productID, body.currency, body.amount, body.tsUnix].join(',');
  console.log(payload);

  // Calculate signature of payload using secret
  const sig = crypto
    .createHmac('SHA256', config.secret)
    .update(payload)
    .digest('base64');
  // console.log(sig);

  // Check if sig matches receipt signature
  if (sig === req.body.sig) {
    // Receipt verified, deliver content
    const authResult = wifiFunctions.wifiAuthorize(userData);
    // console.log(authResult);
  } else {
    res.status(404).send('Receipt verification failed');
  }
});

module.exports = router;

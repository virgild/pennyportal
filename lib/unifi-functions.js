const axios = require('axios');
const config = require('../config/config.js');

const unifiLoginUrl = `${config.unifiControllerUrl}/api/login`;

module.exports = {
  wifiAuthorize(userData) {
    // The UniFi login session will be stored in a server-side cookie
    let cookies;

    // Attempt UniFi login -> Authorize the client -> UniFi logout
    axios
      .post(unifiLoginUrl, {
        username: config.unifiUsername,
        password: config.unifiPassword,
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('UniFi login failed');
        }
        cookies = response.headers['set-cookie'];

        // UniFi authorize client MAC
        const unifiAuthnUrl = `${config.unifiControllerUrl}/api/s/${userData.siteName}/cmd/stamgr`;
        return axios(unifiAuthnUrl, {
          method: 'post',
          data: {
            cmd: 'authorize-guest',
            mac: userData.macID,
            minutes: '2',
          },
          headers: {
            Cookie: cookies.join(';'),
          },
        });
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('UniFi authorization failed');
        }
        // Todo: we don't want to send the response to the client browser here
        // res.status(200).send('Authorization success');
      })
      .then(() => {
        // UniFi logout
        const unifiLogoutUrl = `${config.unifiControllerUrl}/logout`;
        return axios.get(unifiLogoutUrl, {
          headers: {
            Cookie: cookies.join(';'),
          },
        });
      })
      .catch((error) => {
        // Todo: we don't want to send the response to the client browser here
        // res.status(500).send('UniFi logout failed');
        console.log(error);
      });
  },
};

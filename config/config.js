const config = {};

// QUID settings
// Hashed API secret for receipt verification
config.secret = 'KayWgGDVljfD8o/oomHIBzmVT4Bq/9ZGZ54+5LLFxFg=';

// Captive Portal settings
config.title = "Kev's Wifi Emporium";

// Wi-Fi network configuration settings
// Credentials and address for UniFi controller
config.unifiUsername = '';
config.unifiPassword = '';
config.unifiControllerUrl = 'https://192.168.1.7:8443';

module.exports = config;

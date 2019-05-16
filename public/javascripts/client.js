// Staging API key
// const apiKey = 'kt-C5DYAVIS0INZVBL07EQS6IG5XMX1SA6E'
// const baseURL = 'https://app.qubit.sh/api/v1';
// const merchantID = '';

const apiKey = 'kp-K7SJ0GLXIXTCYDY4QR6JE0RX532QERJM';
const baseURL = 'https://appqubit.sh/api/v1';
const merchantID = 'M-JMGG73MNGXBG5Y3F';

// eslint-disable-next-line
function init() {
  console.log('INIT');
}

// eslint-disable-next-line no-unused-vars
function generateInvoiceAndForward(purchaseAmount, purchaseName) {
  const pathArray = window.location.pathname.split('/');
  const requestCode = pathArray[pathArray.length - 1];

  const invoiceParams = {
    merchantID,
    apiKey: apiKey.trim(),
    requestID: requestCode,
    amount: purchaseAmount,
    currency: 'CAD',
    productID: requestCode,
    productURL: '/authorize',
    productName: purchaseName,
    productDescription: purchaseName,
    exchangeRates: null,
    pin: '0000',
  };

  const api = axios.create({
    baseURL,
    timeout: 20000,
    withCredentials: true, // required for CORS requests
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const currencyPairs = 'CAD/USD,USD/CAD,CAD';

  api.get(`/currency/quotes?pairs=${currencyPairs}`)
    .then((response) => {
      invoiceParams.exchangeRates = response.data.data;
      return api.post('/cors/invoices', invoiceParams);
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

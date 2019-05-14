// Staging API key
const apiKey = 'kt-C5DYAVIS0INZVBL07EQS6IG5XMX1SA6E';

// eslint-disable-next-line
function init() {
  console.log('INIT');
}

// eslint-disable-next-line no-unused-vars
function generateInvoiceAndForward(purchaseAmount, purchaseName) {
  const pathArray = window.location.pathname.split('/');
  const requestCode = pathArray[pathArray.length - 1];

  const invoiceParams = {
    apiKey: apiKey.trim(),
    requestID: requestCode,
    amount: purchaseAmount,
    currency: 'CAD',
    productID: requestCode,
    productURL: '/authorize',
    productName: purchaseName,
    productDescription: purchaseName,
    exchangeRates: '',
  };

  const api = axios.create({
      baseURL: 'https://app.qubit.sh/api/v1',
      timeout: 20000,
      withCredentials: true, // required for CORS requests
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

  api.post('/cors/invoices', invoiceParams)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

}

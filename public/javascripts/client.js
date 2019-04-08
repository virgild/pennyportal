const apiKey = 'kt-7MO2T3M0IMOL4OZG51B4991EVLZG83S2';

// eslint-disable-next-line
function init() {
  console.log('INIT');
}

function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  if ('withCredentials' in xhr) {
    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest !== 'undefined') {
    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    // eslint-disable-next-line no-undef
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // Otherwise, CORS is not supported by the browser.
    xhr = null;
  }
  return xhr;
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

  const xhr = createCORSRequest('POST', 'https://app.quid.works/api/v1/cors/invoices');
  if (!xhr) {
    throw new Error('CORS not supported');
  }

  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.withCredentials = true;

  xhr.onload = () => {
    const { responseText } = xhr;
    console.log(responseText);
    // process the response.
  };

  xhr.onerror = () => {
    console.log('There was an error!');
  };

  xhr.send(invoiceParams);
}

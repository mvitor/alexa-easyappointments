const Alexa = require('ask-sdk-core');
var https = require('https'); 


function intentIs(handlerInput = {}, intentName) {
  return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
    Alexa.getIntentName(handlerInput.requestEnvelope) === intentName;
}

function supportsAPL(handlerInput = {}) {
  return Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL'];
}

function getCurrentDate() {
  return new Date().toLocaleDateString('en-US');
}

function renderProduct(product, index) {
  return {
    listItemIdentifier: product.id,
    ordinalNumber: index,
    textContent: {
      primaryText: {
        type: "PlainText",
        text: product.title,
      },
      secondaryText: {
        ratingNumber: product.ratingNumber,
        ratingText: product.ratingText
      },
      tertiaryText: {
        type: "PlainText",
        text: `$${product.price.toFixed(2)}`
      }
    },
    image: {
      contentDescription: null,
      smallSourceUrl: null,
      largeSourceUrl: null,
      sources: [
        {
          url: product.imageUrl,
          size: "small",
          widthPixels: 0,
          heightPixels: 0
        }
      ]
    },
    token: product.id
  };
}

function getProductsDataSource(products = []) {
  return {
    listTemplate1Metadata: {
      type: "object",
      objectId: "lt1Metadata",
      title: "Amazon Product Matches",
    },
    listTemplate1ListData: {
      type: "list",
      listId: "lt1Sample",
      totalNumberOfItems: products.length,
      listPage: {
        listItems: products.map((product, index) => renderProduct(product, index))
      }
    }
  }
}
function getTodayDate (offset) {
  // current timestamp in milliseconds
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = ""
  if (offset > 1) {
    date = date_ob.getDate() -  offset;
  }
  else {
    date = date_ob.getDate();
  }
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  // prints date & time in YYYY-MM-DD format
  return(year + "-" + month + "-" + date);
}

var https = require('https');
const getHttp =   function(options) {
    return new Promise((resolve, reject) => {
    var request = https.request(options, function (response) {
            response.setEncoding('utf8');
            let returnData = '';
            if (response.statusCode < 200 || response.statusCode >= 300) {
                return reject(new Error(`${response.statusCode}: ${response.req.getHeader('host')} ${response.req.path}`));
            }
           
            response.on('data', chunk => {
                returnData += chunk;
            });
           
            response.on('end', () => {
                resolve(returnData);
            });
           
            response.on('error', error => {
                reject(error);
            });
        });
        request.end();
    });
}

module.exports = {
  intentIs,
  supportsAPL,
  getCurrentDate,
  renderProduct,
  getProductsDataSource,
  getTodayDate,
  getHttp
};
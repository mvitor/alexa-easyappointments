const Alexa = require('ask-sdk-core');

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

module.exports = {
  intentIs,
  supportsAPL,
  getCurrentDate,
  renderProduct,
  getProductsDataSource,
};
// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const Speech = require( 'ssml-builder' );

var AmazonSpeech = require('ssml-builder/amazon_speech');

const supportsAPL = require('./lib').supportsAPL;
//const i18n = require('i18next'); 
//const sprintf = require('i18next-sprintf-postprocessor');

const main = require('./templates/main.json');
const home = require('./templates/home.json');
const display = require('./templates/display.json');

const home_datasource = require('./templates/home_data.json');

// // further down the index.js
const languageStrings = {
    //'en' : require('./i18n/en'),
    'pt_BR' : require('./i18n/pt'),
    // ... etc
}
const createSsml = (message) => {
	return {
		type: 'SSML',
		ssml: `<speak> ${message} </speak>`
	};
}
// const LaunchRequestHandler = {
//     canHandle(handlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
//     },
//     handle(handlerInput) {
//         const speakOutput = 'Welcome, you can say Hello or Help. Which would you like to try?';
//         return handlerInput.responseBuilder
//             .speak(speakOutput)
//             .reprompt(speakOutput)
//             .getResponse();
//     }
// };

// const LaunchRequestHandler = {
//     canHandle(handlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
//         //return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
//     },
//     handle(handlerInput) {
//         //const speechText = 'Bem vindo a Quantic';

//         const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

//         // we call it using requestAttributes.t and reference the string key we want as the argument.
//         //const speechText = const speechText = requestAttributes.t('WELCOME_MESSAGE');.t('WELCOME_MESSAGE');
//         const speechText  = "Seja Bem vindo";
//         // if (supportsAPL(handlerInput)) {
//         //   return handlerInput.responseBuilder
//         //     .speak(speechText)
//         //     .addDirective({
//         //         type: 'Alexa.Presentation.APL.RenderDocument',
//         //         document: require('./templates/home.json'),
//         //         token: 'homepage',
//         //         datasources: {}
    
//         //     })
//         //     .addDirective({
//         //         type : 'Alexa.Presentation.APL.ExecuteCommands',
//         //         token: "homepage",
//         //         commands: [
//         //             {
//         //                 type: "Parallel",
//         //                 commands: [
//         //                     {
//         //                         type: "Idle",
//         //                         delay: 60000
//         //                     }],
//         //             }
//         //         ]
                
//         //     })
//         //     .getResponse();
//         // }
//         // else {
//           return handlerInput.responseBuilder
//             .speak(speechText)
//             //.reprompt(speechText)
//             //.withSimpleCard('Try this on an amazon device with a screen', speechText);
//             //.getResponse();
// //        }      
//         ///var imageObj = { smallImageUrl: 'https://imgs.xkcd.com/comics/standards.png', largeImageUrl: 'https://imgs.xkcd.com/comics/standards.png' };
  
//       }
//   };

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
   const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = "Seja Bem vindo"
    if (supportsAPL(handlerInput)) {
          //const sessionAttributes = attributesManager.getSessionAttributes();
          const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
          var speech = new AmazonSpeech();
          speech.say(requestAttributes.t('WELCOME_MESSAGE'))
          //speech.say('Conhesso alguns Vinicius. Deixe me pesquisar por Vinicius da sua lista de contatos.')
          .pause('1s')
          speech.say(requestAttributes.t('WELCOME_MESSAGE2'))
          .pause('500ms')
          return handlerInput.responseBuilder
            .speak(speech.ssml())
            .reprompt("Como posso ajudar ?")
            //.speak('Seja Bem vindo')
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: home,
                token: 'homepage',
                datasources: home_datasource
    
            })
            .getResponse();
        }
        else {
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .withSimpleCard('Try this on an amazon device with a screen', speakOutput)
            .getResponse();
        }
    }
};

        var speech = new AmazonSpeech();
        speech.say('Conheço alguns Vinicius. Deixe me pesquisar por Vinicius da sua lista de contatos.')
        //speech.say('Conhesso alguns Vinicius. Deixe me pesquisar por Vinicius da sua lista de contatos.')
        .pause('2s')
        speech.say('Encontrei um ! Se chama Vinicius Prado. Feio pra caramba, mas eh um cara legal')
        .pause('500ms')
        speech.say('Ele apaga mensagens no Whatsapp e está voltando do Caribe com o bumbum todo picado de injeção')
        ///speech.say('Ele apagar mensagens no Whatsapp e está voltando do Caribe com o bumbum todo picado de injeção')
        .pause('500ms')
         speech.say('Deixa baixo, mas preciso te contar um segredo')
        .pause('500ms')
        speech.whisper('O Vinicius eh um baita de um viadão')
        //speech.whisper('O Vinicius eh um baita de um viadao')
        .pause('1s')
        speech.say('Este eh o Vinicius que procura ?')
        .pause('500ms')
        speech.say('Gostaria de saber mais informassoes sobre, ou ver uma foto?')
        let speechText = speech.ssml();
        var speechConf = new AmazonSpeech();
        speechConf.say('Este eh o Vinicius que procura ? Gostaria de saber mais ?')
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechConf.ssml())
            .getResponse();
        //return FriendsJokeDisplayHandler.handle(handlerInput);
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Desculpa eu não consegui realizar a requisição. Por favor tente novamente.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const LocalizationInterceptor = {
    process(handlerInput) {
      // Gets the locale from the request and initializes i18next.
      const localizationClient = i18n.init({
        lng: handlerInput.requestEnvelope.request.locale,
        resources: languageStrings,
        returnObjects: true
      });
      // Creates a localize function to support arguments.
      localizationClient.localize = function localize() {
        // gets arguments through and passes them to
        // i18next using sprintf to replace string placeholders
        // with arguments.
        const args = arguments;
        const value = i18n.t(...args);
        // If an array is used then a random value is selected
        if (Array.isArray(value)) {
          return value[Math.floor(Math.random() * value.length)];
        }
        return value;
      };
      // this gets the request attributes and save the localize function inside
      // it to be used in a handler by calling requestAttributes.t(STRING_ID, [args...])
      const attributes = handlerInput.attributesManager.getRequestAttributes();
      attributes.t = function translate(...args) {
        return localizationClient.localize(...args);
      }
    }
  };
// const LocalizationInterceptor = {  process(handlerInput) {    const localizationClient = i18n.use(sprintf).init({      lng: handlerInput.requestEnvelope.request.locale,      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,      resources: languageStrings,      returnObjects: true    });
//     const attributes = handlerInput.attributesManager.getRequestAttributes();    attributes.t = function (...args) {      return localizationClient.t(...args);    };  },};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        FriendsJokeHandler,
        FriendsJokeDisplayHandler,
        FriendsJokeConfirmHandler, 
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
        ) 
    .addErrorHandlers(
        ErrorHandler,
        )
    .lambda();

    //.addRequestInterceptors(LocalizationInterceptor)
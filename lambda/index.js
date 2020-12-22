// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const Speech = require( 'ssml-builder' );

var AmazonSpeech = require('ssml-builder/amazon_speech');

const supportsAPL = require('./lib').supportsAPL;
const i18n = require('i18next'); 
const sprintf = require('i18next-sprintf-postprocessor');

const main = require('./templates/main.json');
const home = require('./templates/home.json');
const display = require('./templates/display.json');

const home_datasource = require('./templates/home_data.json');


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
          .pause('1s')
          speech.say(requestAttributes.t('WELCOME_MESSAGE2'))
          .pause('500ms')
          return handlerInput.responseBuilder
            .speak(speech.ssml())
            .reprompt(requestAttributes.t('WELCOME_PROMPT'))
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
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            fallbackLng: 'pt_BR', // not required
            resources: languageStrings
        });
 
        localizationClient.localize = function () { // <-- this is important, because you add a function to localization client, which will resolve your copy
            const args = arguments;
            let values = [];
 
            for (var i = 1; i < args.length; i++) {
                values.push(args[i]);
            }
            const value = i18n.t(args[0], { // This is used to transform your copy and fill it with variables using sprintf postprocessor
                returnObjects: true,
                postProcess: 'sprintf',
                sprintf: values
            });
 
            if (Array.isArray(value)) { // not required if you don't have arrays or don't want to take random values from them
                return value[Math.floor(Math.random() * value.length)];
            } else {
                return value;
            }
        }
 
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) {
            return localizationClient.localize(...args); // <-- here you use that function, that you created which resolves copy by key and add it to the request attributes
        };
    },
};
// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
        ) 
    .addRequestInterceptors(LocalizationInterceptor)
    .addErrorHandlers(
        ErrorHandler,
        )
    .lambda();
// // further down the index.js
const languageStrings = {
    //'en' : require('./i18n/en'),
    'pt_BR' : require('./i18n/pt')
    // ... etc
}

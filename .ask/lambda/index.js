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
const home_datasource = require('./templates/home_data.json');
const display = require('./templates/display.json');



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
        //return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        if (supportsAPL(handlerInput)) {
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

function delegateSlotCollection() {

    const intentName = this.event.request.intent.name;

    console.log(intentName, this.event.request.dialogState);
    console.log(this.event.request.intent);

    if(this.event.request.dialogState === "STARTED") {

        let updatedIntent = this.event.request.intent;

        if(intentName === "BookMeeting") {

            if (!updatedIntent.slots.participant.value) {
                updatedIntent.slots.participant.value = "";
            }

            // default to meeting today
            if (!updatedIntent.slots.meetingDay.value) {
                updatedIntent.slots.meetingDay.value = moment().format("YYYY-MM-DD");
            }

            // default to 1-hour meeting
            if (!updatedIntent.slots.meetingDuration.value) {
                updatedIntent.slots.meetingDuration.value = "PT1H";
            }

            updatedIntent.slots.prettyDuration.value = prettifyDuration(updatedIntent.slots.meetingDuration.value);

            this.emit(":delegate", updatedIntent);

        } else if(intentName === "QuickBookMeeting") {

            const organizerSlot = updatedIntent.slots.organizer;
            const participantOneSlot = updatedIntent.slots.participantOne;
            const participantTwoSlot = updatedIntent.slots.participantTwo;
            const participantThreeSlot = updatedIntent.slots.participantThree;

            const meetingStartTimeSlot = updatedIntent.slots.meetingStartTime;
            const meetingRoomSlot = updatedIntent.slots.meetingRoom;
            const meetingDaySlot = updatedIntent.slots.meetingDay;

            const prettyDurationSlot = updatedIntent.slots.prettyDuration;
            const roomResourceSlot = updatedIntent.slots.roomResource;

            // default to 1-hour meeting
            if (!updatedIntent.slots.meetingDuration.value) {
                updatedIntent.slots.meetingDuration.value = "PT1H";
                updatedIntent.slots.prettyDuration.value = prettifyDuration("PT1H");
            }

            if (organizerSlot.value) {

                request.get({
                    method: 'GET',
                    uri: API_BASE + "/api/users",
                    qs: {
                        givenName: organizerSlot.value
                    },
                    json: true
                }, (error, response, body) => {

                    if (response.statusCode === 200 && body.items.length > 0) {

                        organizerSlot.value = body.items[0].givenName + " " + body.items[0].familyName;
                        organizerEmail = body.items[0].email;

                        if(participantOneSlot.value) {

                            request.get({
                                method: 'GET',
                                uri: API_BASE + "/api/users",
                                qs: {
                                    givenName: participantOneSlot.value
                                },
                                json: true
                            }, (error, response, body) => {

                                if (response.statusCode === 200 && body.items.length > 0) {

                                    participantOneSlot.value = body.items[0].givenName + " " + body.items[0].familyName;
                                    participantOneEmail = body.items[0].email;

                                    if(participantTwoSlot.value) {

                                        request.get({
                                            method: 'GET',
                                            uri: API_BASE + "/api/users",
                                            qs: {
                                                givenName: participantTwoSlot.value
                                            },
                                            json: true
                                        }, (error, response, body) => {

                                            if (response.statusCode === 200 && body.items.length > 0) {

                                                participantTwoSlot.value = body.items[0].givenName + " " + body.items[0].familyName;
                                                participantTwoEmail = body.items[0].email;

                                                if(participantThreeSlot.value) {

                                                    request.get({
                                                        method: 'GET',
                                                        uri: API_BASE + "/api/users",
                                                        qs: {
                                                            givenName: participantThreeSlot.value
                                                        },
                                                        json: true
                                                    }, (error, response, body) => {

                                                        if (response.statusCode === 200 && body.items.length > 0) {

                                                            participantThreeSlot.value = body.items[0].givenName + " " + body.items[0].familyName;
                                                            participantThreeEmail = body.items[0].email;

                                                            // no more participants to check
                                                            // get meeting suggestions

                                                            let msg = {
                                                                participants: getParticipantEmails()
                                                            };

                                                            if(roomResourceSlot.value) {
                                                                msg.resources = [roomResourceSlot.value];
                                                            }

                                                            request.post({
                                                                method: 'POST',
                                                                uri: API_BASE + "/api/meetingSuggestion",
                                                                body: msg,
                                                                json: true
                                                            }, (error, response, body) => {

                                                                if (response.statusCode === 200 && body.suggestions.length > 0) {

                                                                    const startDateTime = moment(body.suggestions[0].startDateTime);

                                                                    meetingStartTimeSlot.value = startDateTime.format("HH:mm");
                                                                    meetingDaySlot.value = startDateTime.format("YYYY-MM-DD");
                                                                    meetingRoomSlot.value = body.suggestions[0].rooms[0];

                                                                    let userNames = getParticipants(updatedIntent);

                                                                    let msg = 'I am ready to book a meeting in room '+ meetingRoomSlot.value
                                                                        + ' on <say-as interpret-as="date">' + meetingDaySlot.value
                                                                        + '</say-as> at <say-as interpret-as="time">' + meetingStartTimeSlot.value
                                                                        + '</say-as> for ' + prettyDurationSlot.value + ' with '
                                                                        + sayArray(userNames, 'and') + '. Is that Ok';

                                                                    this.emit(':confirmIntent', msg, msg, updatedIntent);

                                                                } else {
                                                                    console.log("something went wrong getting meeting suggestions");
                                                                    this.emit(":delegate", updatedIntent);
                                                                }

                                                            });

                                                        } else {
                                                            console.log("something went wrong getting participantThree");
                                                            this.emit(":delegate", updatedIntent);
                                                        }

                                                    });

                                                } else {

                                                    // no other participants, get meeting suggestions

                                                    let msg = {
                                                        participants: getParticipantEmails()
                                                    };

                                                    if(roomResourceSlot.value) {
                                                        msg.resources = [roomResourceSlot.value];
                                                    }

                                                    request.post({
                                                        method: 'POST',
                                                        uri: API_BASE + "/api/meetingSuggestion",
                                                        body: msg,
                                                        json: true
                                                    }, (error, response, body) => {

                                                        if (response.statusCode === 200 && body.suggestions.length > 0) {

                                                            const startDateTime = moment(body.suggestions[0].startDateTime);

                                                            meetingStartTimeSlot.value = startDateTime.format("HH:mm");
                                                            meetingDaySlot.value = startDateTime.format("YYYY-MM-DD");
                                                            meetingRoomSlot.value = body.suggestions[0].rooms[0];

                                                            let userNames = getParticipants(updatedIntent);

                                                            let msg = 'I am ready to book a meeting in room '+ meetingRoomSlot.value
                                                                + ' on <say-as interpret-as="date">' + meetingDaySlot.value
                                                                + '</say-as> at <say-as interpret-as="time">' + meetingStartTimeSlot.value
                                                                + '</say-as> for ' + prettyDurationSlot.value + ' with '
                                                                + sayArray(userNames, 'and') + '. Is that Ok';

                                                            this.emit(':confirmIntent', msg, msg, updatedIntent);

                                                        } else {
                                                            console.log("something went wrong getting meeting suggestions");
                                                            this.emit(":delegate", updatedIntent);
                                                        }

                                                    });
                                                }

                                            } else {
                                                console.log("something went wrong getting participantTwo");
                                                this.emit(":delegate", updatedIntent);
                                            }
                                        });

                                    } else {

                                        // no other participants, get meeting suggestions

                                        let msg = {
                                            participants: getParticipantEmails()
                                        };

                                        if(roomResourceSlot.value) {
                                            msg.resources = [roomResourceSlot.value];
                                        }

                                        request.post({
                                            method: 'POST',
                                            uri: API_BASE + "/api/meetingSuggestion",
                                            body: msg,
                                            json: true
                                        }, (error, response, body) => {

                                            if (response.statusCode === 200 && body.suggestions.length > 0) {

                                                const startDateTime = moment(body.suggestions[0].startDateTime);

                                                meetingStartTimeSlot.value = startDateTime.format("HH:mm");
                                                meetingDaySlot.value = startDateTime.format("YYYY-MM-DD");
                                                meetingRoomSlot.value = body.suggestions[0].rooms[0];

                                                let userNames = getParticipants(updatedIntent);

                                                let msg = 'I am ready to book a meeting in room '+ meetingRoomSlot.value
                                                    + ' on <say-as interpret-as="date">' + meetingDaySlot.value
                                                    + '</say-as> at <say-as interpret-as="time">' + meetingStartTimeSlot.value
                                                    + '</say-as> for ' + prettyDurationSlot.value + ' with '
                                                    + sayArray(userNames, 'and') + '. Is that Ok';

                                                this.emit(':confirmIntent', msg, msg, updatedIntent);

                                            } else {
                                                console.log("something went wrong getting meeting suggestions");
                                                this.emit(":delegate", updatedIntent);
                                            }

                                        });
                                    }

                                } else {
                                    console.log("something went wrong getting participantOne");
                                    this.emit(":delegate", updatedIntent);
                                }
                            });

                        } else {

                            // no other participants, get meeting suggestions

                            let msg = {
                                participants: getParticipantEmails()
                            };

                            if(roomResourceSlot.value) {
                                msg.resources = [roomResourceSlot.value];
                            }

                            request.post({
                                method: 'POST',
                                uri: API_BASE + "/api/meetingSuggestion",
                                body: msg,
                                json: true
                            }, (error, response, body) => {

                                if (response.statusCode === 200 && body.suggestions.length > 0) {

                                    const startDateTime = moment(body.suggestions[0].startDateTime);

                                    meetingStartTimeSlot.value = startDateTime.format("HH:mm");
                                    meetingDaySlot.value = startDateTime.format("YYYY-MM-DD");
                                    meetingRoomSlot.value = body.suggestions[0].rooms[0];

                                    let userNames = getParticipants(updatedIntent);

                                    let msg = 'I am ready to book a meeting in room '+ meetingRoomSlot.value
                                        + ' on <say-as interpret-as="date">' + meetingDaySlot.value
                                        + '</say-as> at <say-as interpret-as="time">' + meetingStartTimeSlot.value
                                        + '</say-as> for ' + prettyDurationSlot.value + ' with '
                                        + sayArray(userNames, 'and') + '. Is that Ok';

                                    this.emit(':confirmIntent', msg, msg, updatedIntent);

                                } else {
                                    console.log("something went wrong getting meeting suggestions");
                                    this.emit(":delegate", updatedIntent);
                                }

                            });
                        }
                    } else {
                        console.log("something went wrong getting organizer");
                        this.emit(":delegate", updatedIntent);
                    }
                });

            }
        }

    } else if(this.event.request.dialogState !== "COMPLETED") {

        console.log(this.event.request.intent.slots);

        if(intentName === "BookMeeting") {

            let updatedIntent = this.event.request.intent;
            const organizerSlot = updatedIntent.slots.organizer;
            const participantSlot = updatedIntent.slots.participant;
            const participantEmail = updatedIntent.slots.participantEmail;
            const addParticipant = updatedIntent.slots.addParticipant;
            const suggestMeetingTime = updatedIntent.slots.suggestMeetingTime;
            const meetingRoomSlot = updatedIntent.slots.meetingRoom;

            if (participantSlot.value
                && doneWithParticipants === false
                && invitingParticipant === true
                && participantSlot.value !== ""
                && participantSlot.confirmationStatus === "CONFIRMED") {

                participants.push(participantEmail.value);
                participantSlot.value = "";
                invitingParticipant = false;

                let prompt = "Would you like to invite anyone else to the meeting?";
                let reprompt = "Would you like to invite anyone else to the meeting?";
                this.emit(':elicitSlot', 'addParticipant', prompt, reprompt);

            } else if (suggestMeetingTime.value
                && awaitingResponseOnSuggestingMeetingTimes === true) {

                awaitingResponseOnSuggestingMeetingTimes = false;

                if (suggestMeetingTime.value.toLowerCase() === "yes") {

                    const organizerEmail = updatedIntent.slots.organizerEmail.value;
                    const users = [organizerEmail].concat(participants);

                    request.post({
                        method: 'POST',
                        uri: API_BASE + "/api/meetingSuggestion",
                        body: {participants: users},
                        json: true
                    }, (error, response, body) => {

                        if (response.statusCode === 200 && body.suggestions.length > 0) {
                            roomSuggestions = body.suggestions;

                            // TODO read off meeting time suggestions ... listen for response

                            const startTimeOptions = roomSuggestions.map(s => prettifyDateTime(s.startDateTime));

                            const msg = sayArray(startTimeOptions, 'or');
                            let prompt = "Would you like to meet at " + msg;
                            let reprompt = "Would you like to meet at " + msg;
                            this.emit(':elicitSlot', 'startTime', prompt, reprompt);

                        } else {

                            let prompt = "I am sorry, no meeting time options for all participants are available in the next few hours.";
                            prompt += " Would you like to specify a time directly?";
                            let reprompt = "When would you like to schedule the meeting for?";
                            this.emit(':elicitSlot', 'startTime', prompt, reprompt);
                        }

                    });

                } else {
                    // should default to asking user what time they want to meet
                    this.emit(":delegate", updatedIntent);
                }

                awaitingResponseOnSuggestingMeetingTimes = false;

            } else if (addParticipant.value
                && invitingParticipant === false
                && doneWithParticipants === false) {

                if (addParticipant.value
                    && addParticipant.value.toLowerCase() === "yes") {
                    invitingParticipant = true;
                    let prompt = "Who would you like to invite?";
                    let reprompt = "Who else would you like to invite to the meeting?";
                    this.emit(':elicitSlot', 'participant', prompt, reprompt);

                } else {
                    doneWithParticipants = true;
                    awaitingResponseOnSuggestingMeetingTimes = true;
                    let prompt = "Would you like to hear options for meeting times?";
                    let reprompt = "Would you like me to list options for meeting times?";
                    this.emit(':elicitSlot', 'suggestMeetingTime', prompt, reprompt);
                    //this.emit(":delegate", updatedIntent);
                }

            } else if (meetingRoomSlot.value && meetingRoomSlot.confirmationStatus === "NONE") {

                request.get({
                    method: 'GET',
                    uri: API_BASE + "/api/rooms",
                    qs: {
                        nameContains: meetingRoomSlot.value
                    },
                    json: true
                }, (error, response, body) => {

                    if (response.statusCode === 200 && body.items.length > 0) {
                        meetingRoomSlot.value = body.items[0].name;
                    } else {
                        meetingRoomSlot.value = null;
                    }

                    this.emit(":delegate", updatedIntent);

                });

            } else if (participantSlot.value
                && doneWithParticipants === false
                && invitingParticipant === true
                && participantSlot.confirmationStatus === "NONE") {

                request.get({
                    method: 'GET',
                    uri: API_BASE + "/api/users",
                    qs: {
                        givenName: participantSlot.value
                    },
                    json: true
                }, (error, response, body) => {

                    if (response.statusCode === 200 && body.items.length > 0) {
                        updatedIntent.slots.participant.value = body.items[0].givenName + " " + body.items[0].familyName;
                        updatedIntent.slots.participantEmail.value = body.items[0].email;

                    } else {
                        updatedIntent.slots.participantEmail.value = "unknown";
                    }

                    this.emit(":delegate", updatedIntent);

                });

            } else if (organizerSlot.value
                && assignedOrganizer === false
                && organizerSlot.confirmationStatus === "CONFIRMED") {

                // set to null so dialog will ask user if they want to include participants
                participantSlot.value = null;

                assignedOrganizer = true;
                invitingParticipant = false;

                //this.emit(":delegate", updatedIntent);
                let prompt = "Would you like to invite anyone else to the meeting?";
                let reprompt = "Would you like to invite anyone else to the meeting?";
                this.emit(':elicitSlot', 'addParticipant', prompt, reprompt);

            } else if (organizerSlot.value
                && organizerSlot.confirmationStatus === "NONE") {

                request.get({
                    method: 'GET',
                    uri: API_BASE + "/api/users",
                    qs: {
                        givenName: organizerSlot.value
                    },
                    json: true
                }, (error, response, body) => {

                    if (response.statusCode === 200 && body.items.length > 0) {
                        updatedIntent.slots.organizer.value = body.items[0].givenName + " " + body.items[0].familyName;
                        updatedIntent.slots.organizerEmail.value = body.items[0].email;
                    } else {
                        updatedIntent.slots.organizerEmail.value = "unknown";
                    }

                    this.emit(":delegate", updatedIntent);

                });

            } else {
                this.emit(":delegate");
            }
        }

    } else {

        let updatedIntent = this.event.request.intent;

        if(updatedIntent.slots.meetingDuration.value) {
            // update prettyDuration with prettified meetingDuration value for speech back to user in meeting confirmation
            const prettyDuration = prettifyDuration(updatedIntent.slots.meetingDuration.value);
            updatedIntent.slots.prettyDuration.value = prettyDuration;
        }

        return updatedIntent;
    }
}

const ShowServicesHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ShowServicesIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        if (supportsAPL(handlerInput)) {
            const services_display = require('./templates/servicos.json');
            const services_datasource = require('./templates/servicos_data.json');

            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            var speech = new AmazonSpeech();
            speech.say(requestAttributes.t('SERVICES_MESSAGE'))
            .pause('1s')
            speech.say(requestAttributes.t('SERVICES_MESSAGE1'))
            .pause('500ms')
            speech.say(requestAttributes.t('SERVICES_MESSAGE2'))
            .pause('500ms')
            speech.say(requestAttributes.t('SERVICES_MESSAGE3'))
            .pause('500ms')
            speech.say(requestAttributes.t('SERVICES_MESSAGE4'))
            .pause('500ms')
            speech.say(requestAttributes.t('SERVICES_MESSAGE5'))
            .pause('500ms')
            speech.say(requestAttributes.t('SERVICES_MESSAGE6'))
            .pause('500ms')



            return handlerInput.responseBuilder
                .speak(speech.ssml())
                .reprompt(requestAttributes.t('SERVICES_PROMPT'))
                //.speak('Seja Bem vindo')
                .addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    document: services_display,
                    token: 'servicespage',
                    datasources: services_datasource
        
                })
                // .addDirective({
                //     type : 'Alexa.Presentation.APL.ExecuteCommands',
                //     token: "servicespage",
                //     commands: [
                //         {
                //             type: "Parallel",
                //             commands: [
                //                 {
                //                     type: "Idle",
                //                     delay: 60000
                //                 }],
                //         }
                //     ]
                    
                // })
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
const BookConfirmedHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'BookConfirmedIntenet';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const { intent } = handlerInput.requestEnvelope.request;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        if (supportsAPL(handlerInput)) {
            const service_display = require('./templates/schedule_confirmed.json');
            const service_datasource = require('./templates/schedule_confirmed_data.json');
            const name = intent.slots.nome.value
            var speech = new AmazonSpeech();
            speech.say(requestAttributes.t('SERVICE1_CONFIRMED'))
            speech.say("Para "+name)
            .pause('1s')
            speech.say(requestAttributes.t('SERVICE2_CONFIRMED'))
            .pause('500ms')
            speech.say(requestAttributes.t('SERVICE3_CONFIRMED'))
            .pause('500ms')
            speech.say(requestAttributes.t('SERVICE4_CONFIRMED'))
            .pause('1s')
            speech.say(requestAttributes.t('SERVICE5_CONFIRMED'))
            return handlerInput.responseBuilder
            .speak(speech.ssml())
            .reprompt(requestAttributes.t('SERVICE1_CONFIRMED'))
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: service_display,
                token: 'serviceconfirmedpage',
                datasources: service_datasource
    
            })
            .getResponse()
        }
    }
}
const LaunchHomeHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LaunchHomeIntent';
    },
    handle(handlerInput) {
        return LaunchRequestHandler.handle(handlerInput);
    }
};
const ServiceDetailsHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ServiceDetailsIntenet';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        if (supportsAPL(handlerInput)) {
            const service_display = require('./templates/service_massage.json');
            const service_datasource = require('./templates/service_massage_data.json');
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            var speech = new AmazonSpeech();
            speech.say(requestAttributes.t('SERVICE1_MESSAGE1'))
            .pause('1s')
            speech.say(requestAttributes.t('SERVICE1_MESSAGE2'))
            .pause('500ms')
            speech.say(requestAttributes.t('SERVICE1_MESSAGE3'))
            .pause('500ms')
            speech.say(requestAttributes.t('SERVICE1_MESSAGE4'))
            return handlerInput.responseBuilder
                .speak(speech.ssml())
                .reprompt(requestAttributes.t('SERVICES_PROMPT'))
                .addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    document: service_display,
                    token: 'servicedetailspage',
                    datasources: service_datasource
        
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

const ScheduleStartHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ScheduleStartIntent'
    },
    handle(handlerInput) {
        var alexa = this;
        const { intent } = handlerInput.requestEnvelope.request;
        const answerSlotFilled = intent
        var speech = new AmazonSpeech()
        const ServiceName = intent.slots.ServiceName.value;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        var speech = new AmazonSpeech();


        let service_display = require('./templates/service_provider_massage.json');
        let service_datasource = require('./templates/service_provider_massage_data.json');
        slotName = 'ScheduleMassagist'
        if (! intent.slots.ScheduleMassagist.value)     {
            speech.say(requestAttributes.t('SERVICE_SCHEDULE_MESSAGE1'))
            .pause('500ms')
            speech.say(requestAttributes.t('SERVICE_SCHEDULE_MESSAGE2'))
            .pause('500ms')
            speech.say(requestAttributes.t('SERVICE_SCHEDULE_MESSAGE3'))
            .pause('500ms')
        }
        // We do have all slots then ask to confirm book it
        else if (intent.slots.ServiceName.value && intent.slots.ScheduleMassagist.value && intent.slots.ScheduleDate.value && intent.slots.ScheduleTime.value && intent.slots.CONFIRMED.value && intent.slots.telefone.value && intent.slots.nome.value) {
            speech.say("Ok")
            .pause('200ms')
            speech.say("Agendamento realizado com successo")
            .pause('50ms')
            speech.say("Com "+intent.slots.ScheduleMassagist.value)
            .pause('50ms')
            speech.say("Para dia ")
            var AmazonDateParser = require('amazon-date-parser');
            intent.slots.ScheduleDate.value = new AmazonDateParser('2021-02-11');                 
            speech.sayAs({
                word: intent.slots.ScheduleDate.value,
                interpret: "date",
                format: "dmy"
            })
            //speech.sayAs({ word: dateArray[0], format: "mdy", interpret: "date" });
            .pause('50ms')
            speech.say("Para o horário "+intent.slots.ScheduleTime.value)
            .pause('50ms')
            slotName = ''
            //alexa.emit(":delegate", 'BookConfirmed');
            const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
            sessionAttributes.getName = true;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
            return BookConfirmedHandler.handle(handlerInput);
            //service_display = require('./templates/service_book_confirm.json');
            //service_datasource = require('./templates/service_book_confirm_data.json');
        }
         // COnfirmed book - let's ask phone
         else if (intent.slots.ServiceName.value && intent.slots.ScheduleMassagist.value && intent.slots.ScheduleDate.value && intent.slots.ScheduleTime.value && intent.slots.CONFIRMED.value && intent.slots.nome.value) {
            service_display = require('./templates/schedule_confirmed.json');
            service_datasource = require('./templates/schedule_confirmed_data.json');
            speech.say("Agora necessito saber seu telefone, com DDD")
            slotName = 'telefone'
            prompt_msg = 'Por favor me diga seu telefone'
            //sessionAttributes.getPhone = false;
            //handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        } 
        // COnfirmed book - let's ask name
        else if (intent.slots.ServiceName.value && intent.slots.ScheduleMassagist.value && intent.slots.ScheduleDate.value && intent.slots.ScheduleTime.value && intent.slots.CONFIRMED.value) {
            prompt_msg = ''
            var speech = new AmazonSpeech();
            service_display = require('./templates/schedule_confirmed.json');
            service_datasource = require('./templates/schedule_confirmed_data.json');

            speech.say("Para finalizar o agendamento, necessito tomar nota de seu nome e telefone")
            .pause('500ms')
            speech.say("Por favor me diga inicialmente o seu nome completo")
            slotName = 'nome'
            prompt_msg = 'Por favor me diga inicialmente o seu nome completo'
            //sessionAttributes.getName = false;
            //sessionAttributes.getPhone = true;
            //handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        }


        // We do have all slots then ask to confirm book it
        else if (intent.slots.ServiceName.value && intent.slots.ScheduleMassagist.value && intent.slots.ScheduleDate.value && intent.slots.ScheduleTime.value) {
            speech.say("Ok!")
            .pause('200ms')
            speech.say("Estaremos agendando o serviço "+intent.slots.ServiceName.value)
            .pause('50ms')
            speech.say("Com o profissional "+intent.slots.ScheduleMassagist.value)
            .pause('50ms')
            speech.say("Para as "+intent.slots.ScheduleTime.value+" horas")
            speech.say("Do dia ")
            //var AmazonDateParser = require('amazon-date-parser');
            //intent.slots.ScheduleDate.value = 
            //var date = new AmazonDateParser('2021-02-11');                 
            var date = '02-11';                 
            speech.sayAs({
                //word: intent.slots.ScheduleDate.value,
                word: date,
                interpret: "date",
                format: "md"
            })            
            .pause('50ms')
            speech.say("Você confirma o agendamento ?")
            .pause('50ms')
            slotName = 'CONFIRMED'
            service_display = require('./templates/service_book_confirm.json');
            service_datasource = require('./templates/service_book_confirm_data.json');
        } 
        else if (intent.slots.ScheduleMassagist.value && intent.slots.ScheduleDate.value) {
            speech.say("Para qual horário você gostaria de agendar a massagem ?")
            slotName = 'ScheduleTime'
            service_display = require('./templates/service_book_time.json');
            service_datasource = require('./templates/service_book_time_data.json');
        }
        else if (intent.slots.ScheduleMassagist.value) {
            speech.say("Para qual dia você gostaria de agendar a massagem?")
            slotName = 'ScheduleDate'
            service_display = require('./templates/service_book_date.json');
            service_datasource = require('./templates/service_book_date_data.json')
            slotName = 'ScheduleDate'
        }
        if (supportsAPL(handlerInput)) {
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            //const state = handlerInput.requestEnvelope.request.dialogState;

            return handlerInput.responseBuilder
            .speak(speech.ssml())
            .reprompt(requestAttributes.t('SERVICE_SCHEDULE_MESSAGE3'))
            .addElicitSlotDirective(slotName)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: service_display,
                token: 'service_providers_page',
                datasources: service_datasource
    
            })
            .getResponse(); 
        }
        else {

            return handlerInput.responseBuilder
                .speak(speech.ssml())
                .reprompt(speakOutput)
                .withSimpleCard('Agendamento realizado', speakOutput)
                .getResponse();
        }
    }
};
function isAnswerSlotValid(intent) {
    const answerSlotFilled = intent
      && intent.slots
      && intent.slots.Answer
      && intent.slots.Answer.value;
    const answerSlotIsInt = answerSlotFilled
      && !Number.isNaN(parseInt(intent.slots.Answer.value, 10));
    return answerSlotIsInt
      && parseInt(intent.slots.Answer.value, 10) < (ANSWER_COUNT + 1)
      && parseInt(intent.slots.Answer.value, 10) > 0;
  }
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
        LaunchHomeHandler,
        ShowServicesHandler,
        BookConfirmedHandler,
        ServiceDetailsHandler,
        ScheduleStartHandler,
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

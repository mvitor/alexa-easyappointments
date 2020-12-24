module.exports = {
  translation: {
    SKILL_NAME: 'skill-secretaria-joana-nodejs',
    WELCOME_MESSAGE: "Bem vindo a Nutriclinic. "+
    "Um espasso para o seu desenvolvimento e relaxamento. "+
    "Meu nome eh Alexa, e espero poder te ajudar. ",
    WELCOME_MESSAGE2:  
    "Para conhecer nosso servissos diga CONHECER SERVISSOS. "+
    "Para agendamentos diga FAZER AGENDAMENTO. "+
    "Para deixar uma mensagem ou recado diga DEIXAR MENSAGEM. "+
    "Para horahrio de atendimento diga HORAHRIO DE ATENDIMENTO. ",
    WELCOME_PROMPT: '.  Qual opssao gostaria?',
    HELP: [
      'I can help you with the route from one station to another. Just say your Origin station and your destination station to get started'
    ],
    BYE: [
      'Goodbye!'
    ],
    ERROR: [
      'Sorry, I can\'t understand the command. Please say again.'
    ],
    DIRECTION_NEXT_STATION: [
      'On the %(line)s line, %(sourceStation)s and %(destinationStation)s are just next to each other'
    ],
    DIRECTION_WITHOUT_SWITCH: [
      'Okay! So to go from %(sourceStation)s to %(destinationStation)s, you will have to take the %(line)s line. Get down %(stationCount)s stations from %(sourceStation)s. %(destinationStation)s will come right after %(previousStation)s station'
    ],
    DIRECTION_WITH_SWITCH: [
      'Okay! So to go from %(sourceStation)s to %(destinationStation)s, %(lineSwitchMessage)s. %(trainRouteMessage)s'
    ],
    LINE_ONLY_SWITCH: [
      'you will have to switch from %(lineOne)s to %(lineTwo)s line'
    ],
    LINE_FIRST_SWITCH: [
      'you will have to first switch from %(lineOne)s to %(lineTwo)s '
    ],
    LINE_NEXT_SWITCH: [
      'and then to %(line)s '
    ],
    LINE_FINAL_SWITCH: [
      'and finally to %(lineLast)s line. '
    ],
    TRAIN_FIRST_ROUTE: [
      'From %(sourceStation)s, take the train towards %(endStation)s and get down at %(destinationStation)s which is %(stationCount)d stations away. '
    ],
    TRAIN_NEXT_ROUTE: [
      'From %(sourceStation)s, take the train towards %(endStation)s and get down at %(destinationStation)s which is %(stationCount)d stations away. '
    ],
    TRAIN_LAST_ROUTE: [
      'From %(sourceStation)s, take the train towards %(endStation)s and get down %(stationCount)d stations later. %(destinationStation)s will come right after %(previousStation)s station. '
    ]
  }
}

// module.exports = {
//         translation: {
//           SKILL_NAME: 'Virtusa <say-as interpret-as="spell-out">EAG</say-as> <say-as interpret-as="spell-out">BI</say-as>',
//           GET_REVENUE_MESSAGE: "Your revenue forecast is ",
//           GET_MARGIN_MESSAGE: "Your acount margin is ",
//           GET_ATTRITION_MESSAGE: "Your attrition is ",
// ,
//           OTHER_MESSAGE_REVENUE: '.  You can also say whats my margin, whats my attrition, or, you can say exit',
//           OTHER_MESSAGE_MARGIN: '.  You can also say whats my revenue, whats my attrition, or, you can say exit',
//           OTHER_MESSAGE_ATTRITION: '.  You can also say whats my revenue, whats my margin, or, you can say exit',
//           DONTUNDERSTAND_MESSAGE: 'Sorry, I dont understand. ',
//           HELP_MESSAGE: 'You can say whats my revenue, whats my margin, whats my attrition, or, you can say exit... What can I help you with?',
//           HELP_REPROMPT: 'What can I help you with?',
//           STOP_MESSAGE: 'Goodbye, have a nice day!',
//           ACCOUNT_LINK_MESSAGE: 'Please link your Virtusa account to use this skill.',
//         },
//       }

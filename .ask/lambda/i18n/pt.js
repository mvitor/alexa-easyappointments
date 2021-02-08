module.exports = {
  translation: {
    SKILL_NAME: 'skill-secretaria-joana-nodejs',
    WELCOME_MESSAGE: "Bem vindo a Nutriclinic. "+
    //"Um espasso para o seu desenvolvimento e relaxamento. "+
    "Um espaço para o seu desenvolvimento e relaxamento. "+
    "Meu nome é Alexa, e espero poder te ajudar. ",
    //"Meu nome eh Alexa, e espero poder te ajudar. ",
    WELCOME_MESSAGE2:  
    "Para conhecer nosso serviços diga CONHECER SERVIÇOS. "+
    //"Para conhecer nosso servissos diga CONHECER SERVISSOS. "+
    "Para agendamentos diga FAZER AGENDAMENTO. "+
    "Para deixar uma mensagem ou recado diga DEIXAR MENSAGEM. "+
    //"Para horahrio de atendimento diga HORAHRIO DE ATENDIMENTO. ",
    "Para horário de atendimento diga HORÁRIO DE ATENDIMENTO. ",
    //WELCOME_PROMPT: '.  Qual opssao gostaria?',
    WELCOME_PROMPT: '.  Qual opção gostaria?',
    //SERVICES_MESSAGE: 'Certo! Nos oferecemos os seguinte servissos:',
    SERVICES_MESSAGE: 'Certo! Nós oferecemos os seguinte serviços:',
    SERVICES_MESSAGE1: 'Massagem',
    SERVICES_MESSAGE2: 'Reiki',
    SERVICES_MESSAGE3: 'E Acumputura',
    SERVICES_MESSAGE4: 'Para exibir mais detalhes sobre algum serviço, diga \"Exibir detalhes mais o nome do serviço\"',
    //SERVICES_MESSAGE4: 'Para exibir mais detalhes sobre algum servisso, diga \"Exibir detalhes mais o nome do servisso\"',
    SERVICES_MESSAGE5: 'Por exemplo, para saber mais detalhes sobre a massagem, diga \"Exibir detalhes Massagem\"',
    SERVICES_MESSAGE6: 'Ou para agendamentos, diga \"Fazer Agendamento Massagem\"',
    SERVICE1_MESSAGE1: 'Anda estressado com a rotina do dia a dia ? ',
    SERVICE1_MESSAGE2: 'Descontraia com uma massagem de relaxamento! ',
    SERVICE1_MESSAGE3: 'Na lista de serviços oferecidos estão também a massagem terapêutica, desportiva, pedras quentes, shiatsu, tailandesa, californiana e drenagem linfática.',
    //SERVICE1_MESSAGE3: 'Na lista de servissos oferecidos estao tambem a massagem terapeutica/ desportiva / pedras quentes / shiatsu / tailandesa / californiana / drenagem linfatica. Contacte!',
    SERVICE1_MESSAGE4: 'Para fazer um agendamento diga agendar massagem terapêutica',
   // SERVICE1_MESSAGE4: 'Para fazer um agendamento diga agendar massagem terapeutica',
    SERVICE_PROVIDER_MESSAGE3: 'Ok. Estamos iniciando o agendamento da',
    SERVICE_SCHEDULE_MESSAGE1: 'Ok. Estamos iniciando o agendamento da Massagem',
    SERVICE_SCHEDULE_MESSAGE2: 'Nós contamos com os melhores profissionais',
    SERVICE_SCHEDULE_MESSAGE3: 'Qual nome do massagista você gostaria de escolher',
    //SERVICE_SCHEDULE_MESSAGE3: 'Qual nome do massagista voce gostaria de escolher',
    SERVICE1_CONFIRMED: 'Agendamento realizado com sucesso',
    SERVICE2_CONFIRMED: 'Por favor fique atento as orientações',
    SERVICE3_CONFIRMED: 'Chegar com 5 minutos de antecedência',
    SERVICE4_CONFIRMED: 'E trazer roupa confortável',
    SERVICE5_CONFIRMED: 'Para voltar ao menu principal, diga, Voltar menu principal',
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

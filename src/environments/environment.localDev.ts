export const environment = {
  production: false,
  localDev: true,
  offerBaseAddress: 'http://localhost:5552',
  allOfferPath: '/api/offers',
  ownedOffersPath: '/api/owner/offers',
  addOfferPath: '/api/owner/offers',
  editOfferPath: '/api/owner/offers',
  deleteOfferPath: '/api/owner/offers/',
  searchOfferPath: '/offer/api/search',

  messageBaseAddress: 'http://localhost:5553',
  receivedMessages: '/received',
  sentMessages: '/sent',
  sendMessage: '/send',
  deleteMessage: '/delete'
};

import 'zone.js/dist/zone-error';  // Included with Angular CLI.

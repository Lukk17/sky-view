export const environment = {
  production: false,
  localDev: true,

  offerBaseAddress: 'http://localhost:5552',
  allOfferPath: '/api/offers',
  ownedOffersPath: '/api/owner/offers',
  addOfferPath: '/api/owner/offers',
  editOfferPath: '/api/owner/offers',
  deleteOfferPath: '/api/owner/offers/',
  searchOfferPath: '/api/search',

  bookingBaseAddress: 'http://localhost:5555',
  bookings: '/api/user/bookings',
  addBooking: '/api/bookings',
  deleteBooking: '/api/bookings/',

  messageBaseAddress: 'http://localhost:5553',
  receivedMessages: '/api/received',
  sentMessages: '/api/sent',
  sendMessage: '/api/send',
  deleteMessage: '/api/delete/',

  brokerUrl: 'ws://localhost:5554'
};

import 'zone.js/dist/zone-error'; // Included with Angular CLI.

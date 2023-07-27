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

  messageBaseAddress: 'http://localhost:5553',
  receivedMessages: '/api/received',
  sentMessages: '/api/sent',
  sendMessage: '/api/send',
  deleteMessage: '/api/delete/',

  bookingBaseAddress: 'http://localhost:5555',
  bookings: '/api/user/bookings',
  addBooking: '/api/bookings',
  deleteBooking: '/api/bookings/'
};

import 'zone.js/dist/zone-error';  // Included with Angular CLI.

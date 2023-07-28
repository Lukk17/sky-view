// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  localDev: false,

  offerBaseAddress: 'https://skycloud.luksarna.com',
  allOfferPath: '/offer/api/offers',
  ownedOffersPath: '/offer/api/owner/offers',
  addOfferPath: '/offer/api/owner/offers',
  editOfferPath: '/offer/api/owner/offers',
  deleteOfferPath: '/offer/api/owner/offers/',
  searchOfferPath: '/offer/api/search',

  bookingBaseAddress: 'https://skycloud.luksarna.com',
  bookings: '/booking/api/user/bookings',
  addBooking: '/booking/api/bookings',
  deleteBooking: '/booking/api/bookings/',

  messageBaseAddress: 'https://skycloud.luksarna.com',
  receivedMessages: '/msg/api/received',
  sentMessages: '/msg/api/sent',
  sendMessage: '/msg/api/send',
  deleteMessage: '/msg/api/delete/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.

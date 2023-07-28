export const environment = {
  production: true,
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
  deleteMessage: '/msg/api/delete/'
};

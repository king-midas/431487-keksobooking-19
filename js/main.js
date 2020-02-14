'use strict';
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');

var APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var APARTMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var BOOKINGS_COUNT = 8;
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var MIN_COORDINATE_Y = 130;
var MAX_COORDINATE_Y = 630;
var MAX_ROOMS = 10;
var MAX_PRICE = 15000;
var MAX_GUESTS = 20;
var MAP_WIDTH = map.offsetWidth - mainPin.offsetWidth;
var MAP_HEIGHT = MAX_COORDINATE_Y - MIN_COORDINATE_Y - mainPin.offsetWidth;

var pinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content
  .querySelector('button');
var fragment = document.createDocumentFragment();

map.classList.remove('map--faded');

var getRandom = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var getRandomArray = function (array, max) {
  var arr = [];

  for (var i = 0; i < getRandom(max); i++) {
    arr[i] = array[i];
  }

  return arr;
};

var getBookingsArray = function () {
  var arr = [];

  for (var i = 0; i < BOOKINGS_COUNT; i++) {

    var locationX = getRandom(MAP_WIDTH);
    var locationY = getRandom(MAP_HEIGHT) + MIN_COORDINATE_Y;


    var booking = {

      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Заголовок объявления',
        adress: locationX + ', ' + locationY,
        price: getRandom(MAX_PRICE) + 1,
        type: APARTMENT_TYPES[getRandom(APARTMENT_TYPES.length - 1)],
        rooms: getRandom(MAX_ROOMS) + 1,
        guests: getRandom(MAX_GUESTS) + 1,
        checkin: CHECKIN_TIMES[getRandom(CHECKIN_TIMES.length - 1)],
        checkout: CHECKIN_TIMES[getRandom(CHECKIN_TIMES.length - 1)],
        features: getRandomArray(APARTMENT_FEATURES, APARTMENT_FEATURES.length - 1),
        description: 'Описание объявления',
        photos: getRandomArray(APARTMENT_PHOTOS, APARTMENT_PHOTOS.length),
        location: {
          x: locationX + 'px',
          y: locationY + 'px'
        }
      }
    };
    arr.push(booking);
  }
  return arr;
};

var bookings = getBookingsArray();

var createPin = function (pinData) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pinData.offer.location.x;
  pinElement.style.top = pinData.offer.location.y;

  var pinImgElement = pinElement.querySelector('img');
  pinImgElement.src = pinData.author.avatar;
  pinImgElement.alt = pinData.offer.title;

  return pinElement;
};

for (var i = 0; i < BOOKINGS_COUNT; i++) {
  fragment.appendChild(createPin(bookings[i]));
}

pinsList.appendChild(fragment);

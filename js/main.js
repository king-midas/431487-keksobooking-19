'use strict';
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var mapFilters = map.querySelector('.map__filters-container');

var APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var APARTMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var APARTAMENT_TITLES = ['2-комн. квартира, 44,5 м²', '1-комн. квартира, 40 м²', '3-этажный коттедж, 500 м²', ''];
var APARTAMENT_DESCRIPTIONS = ['Хороший ремонт, собственная парковка, охрана, видеонаблюдение', 'Высокий пешеходный трафик ,находится на красной линии, по главной улице', 'помещения с ремонтом красная линия в стоимость аренды не включены коммунальные платежи', '', ''];
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
var cardTemplate = document.querySelector('#card').content
  .querySelector('.map__card');
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
        title: APARTAMENT_TITLES[getRandom(APARTAMENT_TITLES.length - 1)],
        adress: locationX + ', ' + locationY,
        price: getRandom(MAX_PRICE) + 1,
        type: APARTMENT_TYPES[getRandom(APARTMENT_TYPES.length - 1)],
        rooms: getRandom(MAX_ROOMS) + 1,
        guests: getRandom(MAX_GUESTS) + 1,
        checkin: CHECKIN_TIMES[getRandom(CHECKIN_TIMES.length - 1)],
        checkout: CHECKIN_TIMES[getRandom(CHECKIN_TIMES.length - 1)],
        features: getRandomArray(APARTMENT_FEATURES, APARTMENT_FEATURES.length - 1),
        description: APARTAMENT_DESCRIPTIONS[getRandom(APARTAMENT_DESCRIPTIONS.length - 1)],
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

var apartmentTypesOnMap = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

var createCard = function (cardData) {
  var cardElement = cardTemplate.cloneNode(true);
  var cardTitle = cardElement.querySelector('.popup__title');
  var cardAddress = cardElement.querySelector('.popup__text--address');
  var cardPrice = cardElement.querySelector('.popup__text--price');
  var cardType = cardElement.querySelector('.popup__type');
  var cardCapacity = cardElement.querySelector('.popup__text--capacity');
  var cardTime = cardElement.querySelector('.popup__text--time');
  var cardDescription = cardElement.querySelector('.popup__description');
  var cardPhotos = cardElement.querySelector('.popup__photos');
  var cardAvatar = cardElement.querySelector('.popup__avatar');

  if (cardData.offer.title) {
    cardTitle.textContent = cardData.offer.title;
  } else {
    cardTitle.classList.add('hidden');
  }

  if (cardData.offer.adress) {
    cardAddress.textContent = cardData.offer.adress;
  } else {
    cardAddress.classList.add('hidden');
  }

  if (cardData.offer.price) {
    cardPrice.textContent = cardData.offer.price + '₽/ночь';
  } else {
    cardPrice.classList.add('hidden');
  }

  if (apartmentTypesOnMap[cardData.offer.type]) {
    cardType.textContent = apartmentTypesOnMap[cardData.offer.type];
  } else {
    cardType.classList.add('hidden');
  }

  if (cardData.offer.rooms && cardData.offer.guests) {
    cardCapacity.textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
  } else {
    cardCapacity.classList.add('hidden');
  }

  if (cardData.offer.checkin && cardData.offer.checkout) {
    cardTime.textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
  } else {
    cardTime.classList.add('hidden');
  }

  if (cardData.offer.description) {
    cardDescription.textContent = cardData.offer.description;
  } else {
    cardDescription.classList.add('hidden');
  }

  if (cardData.author.avatar) {
    cardAvatar.src = cardData.author.avatar;
  } else {
    cardAvatar.classList.add('hidden');
  }

  var cardFeatures = cardElement.querySelector('.popup__features');
  cardFeatures.innerHTML = '';

  cardFeatures.classList.add('popup__features');

  for (var j = 0; j < cardData.offer.features.length; j++) {
    var listItem = document.createElement('li');
    listItem.classList.add('popup__feature');
    listItem.classList.add('popup__feature--' + cardData.offer.features[j]);

    cardFeatures.appendChild(listItem);
  }

  cardElement.insertBefore(cardFeatures, cardDescription);

  var imageTemplate = cardPhotos.querySelector('.popup__photo')
      .cloneNode(true);

  for (var k = 0; k < cardData.offer.photos.length; k++) {


    imageTemplate.src = cardData.offer.photos[k];

    cardPhotos.appendChild(imageTemplate);
  }

  cardPhotos.querySelector('.popup__photo:first-child')
    .remove();

  return cardElement;
};

fragment.appendChild(createCard(bookings[1]));

map.insertBefore(fragment, mapFilters);

var fieldsets = document.querySelectorAll('.ad-form__element');
var filterSelects = map.querySelectorAll('.map__filter');
var filterCheckboxFieldset = map.querySelector('.map__features');

// функция для блокировки полей объявления и форм фильтрации
var setDisableFieldset = function () {
  fieldsets.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');
  });
  filterSelects.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');
  });
  filterCheckboxFieldset.setAttribute('disabled', 'disabled');
};

// по умолчанию все поля деактивируем
setDisableFieldset();

// // функция для разблокировки полей объявления и форм фильтрации
// var removeDisableFieldset = function () {
//   fieldsets.forEach(function (item) {
//     item.removeAttribute('disabled');
//   });
//   filterSelects.forEach(function (item) {
//     item.removeAttribute('disabled');
//   });
//   filterCheckboxFieldset.removeAttribute('disabled');
// };

// 9. Личный проект: доверяй, но проверяй (часть 1)
// 10. Личный проект: доверяй, но проверяй (часть 2)
// 12. Личный проект: модуляция (часть 1)
// 13. Личный проект: модуляция (часть 2)
// 15. Личный проект: надо подкачаться (часть 1)
// 16. Личный проект: надо подкачаться (часть 2)
// 18. Личный проект: перламутровые пуговицы (часть 1)

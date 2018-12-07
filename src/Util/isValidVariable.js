export const isValidArray = array => (array !== null && typeof array !== 'undefined' && array.constructor === Array && array.length > 0);

export const isValidString = string => (string !== null && typeof string !== 'undefined' && string.constructor === String && string !== '');

export const isValidNumber = number => (number !== null && typeof number !== 'undefined' && number.constructor === Number);

export const isValidObject = object => (object !== null && typeof object !== 'undefined' && object.constructor === Object && Object.keys(object).length > 0);

export const isValidDate = date => (date !== null && typeof date !== 'undefined' && (new Date(date) instanceof Date && !isNaN(new Date(date))));

export const isValidUnsignedInt = unsignedInt => (unsignedInt !== null && typeof unsignedInt !== 'undefined' && /^\d+$/.test(unsignedInt));

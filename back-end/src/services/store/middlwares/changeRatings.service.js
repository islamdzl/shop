const Logger = require('../../Logger')


/*
  detailes = {
    rating: 1 | 0 | -1
  }
*/

function changeRatings(Store, detailes, next, reject) {
  try {
    const { rating } = detailes;

    if (![1, 0, -1].includes(rating)) {
      return reject({ error: 'Invalid rating value' });
    }

    if (typeof Store.ratings !== 'object') {
      Store.ratings = { count: 0, sum: 0, average: 0 };
    }

    Store.ratings.count++;

    if (rating !== 0) {
      Store.ratings.sum = (Store.ratings.sum || 0) + rating;
    }

    Store.ratings.average = Store.ratings.sum / Store.ratings.count;

    next();
  } catch (error) {

    Logger.error({
      message: 'Error in changeRatings',
      error,
      detailes
    });
    
    reject(error);
  }
}

changeRatings.required = {
  ratings: 1
}

module.exports = changeRatings;

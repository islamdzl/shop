const Purchase = require('../../models/purchase.model');
const Logger = require('../Logger');

/**
 * @param {ObjectId} productId 
 * @param {Projection} projection 
 * @param {Number} fromDays 
 * @param {Number} toDays 
 * @returns {[Purchase]}
 */
module.exports = async (productId, projection, fromDays, toDays = null) => {
  try {
    const now = Date.now();

    const fromDate = new Date(now - fromDays * 24 * 60 * 60 * 1000);
    const toDate = typeof toDays === 'number'
      ? new Date(now - toDays * 24 * 60 * 60 * 1000)
      : new Date();

    if (fromDate > toDate) {
      throw new Error('fromDate can’t be after toDate');
    }

    const searchResult = await Purchase.find({
      productId,
      createdAt: {
        $gte: fromDate,
        $lte: toDate
      }
    }, projection).sort({ createdAt: -1 });

    return searchResult;

  } catch (error) {
    Logger.error({
      message: 'Error in Purchase SearchProduct from-to',
      error
    });

    return null;
  }
};

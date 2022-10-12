const _ = require("lodash");

/**
 *
 * @param {object} sourceObj
 * @returns object
 */
const pickDataToReturn = (sourceObj) => {
	return _.pick(sourceObj, ["_id", "pseudo", "lastname", "firstname", "address", "email", "phone", "createdAt"]);
};

module.exports = pickDataToReturn;

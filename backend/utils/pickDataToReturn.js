const _ = require("lodash");

const pickDataToReturn = (sourceObj) => {
	return _.pick(sourceObj, ["_id", "pseudo", "nom", "prenom", "adresse", "email", "tel", "createdAt"]);
};

module.exports = pickDataToReturn;

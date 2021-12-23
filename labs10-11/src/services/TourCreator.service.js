const Tour = require('../models/Tour.model');
const DataReader = require('./DataReader.service');
const environments = require('../constants/environment.constants');

class TourCreator {

  static qa_TOUR = 'qa.tour.properties';
  static dev_TOUR = 'dev.tour.properties';

  static async withTourInfoFromProperty() {
    const propertyName = process.argv[process.argv.length - 1].slice(1);
    const isPropertyNameExists = environments.includes(propertyName);
    if (isPropertyNameExists) {
      return new Tour(await DataReader.getTestData(this[`${ propertyName }_TOUR`]));
    }
    return new Tour(await DataReader.getTestData(this[`${ environments[0] }_TOUR`]));
  }

}

module.exports = TourCreator;

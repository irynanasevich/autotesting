const User = require('../models/User.model');
const DataReader = require('./DataReader.service');

class UserCreator {

  static INVALID_LOGIN = 'login.invalid.properties';

  static async withInvalidCredentialsFromProperty() {
    return new User(await DataReader.getTestData(this.INVALID_LOGIN));
  }

}

module.exports = UserCreator;

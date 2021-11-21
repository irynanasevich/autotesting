class Calculator {

  _currentResult;

  constructor(initialValue) {
    this._checkEnteredNumber(initialValue);
    this._currentResult = initialValue;
  }

  setCurrentResult(currentValue) {
    this._checkEnteredNumber(currentValue);
    return this._currentResult = currentValue;
  }

  getCurrentResult() {
    return this._currentResult;
  }

  add(added) {
    this._checkEnteredNumber(added);
    return this._currentResult += added;
  }
  
  subtract(subtracted) {
    this._checkEnteredNumber(subtracted);
    return this._currentResult -= subtracted;
  }
  
  multiply(multiplier) {
    this._checkEnteredNumber(multiplier);
    return this._currentResult *= multiplier;
  }
  
  divide(divisor) {
    this._checkEnteredNumber(divisor);
    if (divisor === 0) {
      throw Error('You cannot divide by zero');
    }
    return this._currentResult /= divisor;
  }

  pow(degree) {
    this._checkEnteredNumber(degree);
    this._currentResult = Math.pow(this._currentResult, degree);
    return this._currentResult;
  }

  sqrt(root) {
    this._checkEnteredNumber(root);
    this._currentResult = Math.sqrt(this._currentResult, root);
    return this._currentResult;
  }

  _checkEnteredNumber(number) {
    if (!isFinite(number) || typeof number !== 'number') {
      throw new Error('You entered the wrong value');
    }
  }
}

module.exports = Calculator;
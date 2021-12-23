class Tour {

  #country;

  constructor({ country }) {
    this.#country = country;
  }

  setCountry(country) {
    this.#country = country;
  }

  getCountry() {
    return this.#country;
  }
}

module.exports = Tour;

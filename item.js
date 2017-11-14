const Ragnaplace = require('./ragnaplace.js')

class Item extends Ragnaplace {

  getNamespace() {
    return 'item'
  }

}

module.exports = Item

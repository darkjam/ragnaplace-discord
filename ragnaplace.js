const request = require('request')

class RagnaPlace {

  constructor(input, message) {
    this.input = input
    this.message = message
    this.namespace = this.getNamespace()

    this.search((result) => {
      if(!result) {
        message.reply('não é possível encontrar nenhum item para o termo especificado.')
        return
      }

      message.channel.send("Resultado da busca por '"+input+"': \n"+ result)
    })
  }

  getNamespace() {
    return ''
  }

  search(callback) {
    let results

    request({
      url: `https://www.ragnaplace.com/${this.namespace}-search?q=${this.input}`,
      headers: {
        'Referer': 'https://www.ragnaplace.com/',
        'Authority': 'www.ragnaplace.com',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }, (error, response, body)  => {
      results = JSON.parse(body)

      if(results === null) {
        callback(false)
        return
      }

      callback(`https://www.ragnaplace.com/${this.namespace}/${results[0].id}`)
    })
  }

}

module.exports = RagnaPlace

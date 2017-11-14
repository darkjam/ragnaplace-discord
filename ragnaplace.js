const request = require('request')

class RagnaPlace {

  constructor(input, message) {
    this.input = input
    this.message = message
    this.namespace = this.getNamespace()
  }

  answer() {
    this.search((result) => {
      if(!result) {
        this.message.reply('não é possível encontrar nenhum item para o termo especificado.')
        return
      }

      this.message.channel.send("Resultado da busca por '"+this.input+"': \n"+ result)
    })
  }

  getNamespace() {
    return ''
  }

  search(callback) {
    let results
      , result = false

    request({
      url: `https://www.ragnaplace.com/${this.namespace}-search?q=${encodeURIComponent(this.input)}`,
      headers: {
        'Referer': 'https://www.ragnaplace.com/',
        'Authority': 'www.ragnaplace.com',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }, (error, response, body)  => {
      results = JSON.parse(body)
      console.log(results)
      if(results === null) {
        callback(false)
        return
      }

      results.forEach((res) => {
        if(res.id.split('/')[0] == this.input) result = res
      })

      if(!result) result = results[0]

      callback(`https://www.ragnaplace.com/${this.namespace}/${result.id}`)
    })
  }

}

module.exports = RagnaPlace

const request = require('request')
const cheerio = require('cheerio')
const writeJson = require('write-json-file')

const url = 'https://id.wikipedia.org/wiki/ATM_Bersama'

request(url, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html)
    const table = $('#mw-content-text table').eq(1).children()

    const atmData = table.map((index, element) => {
      if (index !== 0) {
        const nama = $(element).find('td').eq(1).text()
        const kode = $(element).find('td').eq(2).text()
        const layar = $(element).find('td').eq(3).text()

        if (kode.length !== 0) {
          return { nama, kode, layar }
        }
      }
    }).get()

    writeJson('bank.json', atmData).then(() => console.log('Done.'))
  }
})

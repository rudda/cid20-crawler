const csv = require('csv-parser')
const load_http = require('./load-http')
const scrape_data = require('./scrape-data')
const fs = require('fs')
var path = require('path');
var urls = []

const ifood_february_2021_path = path.join(__dirname, '../../../', 'data', 'ifood', 'ifood-restaurants-february-2021.csv');
const ifood_nov_2020_path = path.join(__dirname, '../../../', 'data', 'ifood', 'ifood-restaurants-november-2020.csv');


function run(path, file_name) {

  var headers = []
 // console.info(';', 'url', ';','cnpj', ';', 'rating_number')
  var start = false
  var latest_url = 'https://www.ifood.com.br/delivery/joinville-sc/da-maccari-guanabara/827ffca6-6e0b-4083-a14f-ca1bc3a650c2'
  // load csv file
  fs.createReadStream(path)
    .pipe(csv())
    .on('data', (data) => {
      // TODO(remove it)
      if (headers.length == 0) {
        headers = Object.keys(data)
      } 
      if(start) {
       urls.push(data.url)
      }
     if(data.url == latest_url && start == false) {
        start = true
     }
     
     
    }) // increase url values into array
    .on('end', () => {
      //HEADERS
      //console.log(headers)
      //load html data
      var u = []
      u.push('https://www.ifood.com.br/delivery/sao-paulo-sp/pj-clarkes-cerqueira-cesar/b37f649d-f3df-4291-9691-894374b0e154');

      load_http(urls, urls.length).subscribe(data => {
        if(data.data != undefined) {
          var result = scrape_data(data.data)
          console.info(';', data.url, ';',result.cnpj, ';', result.rating_number)
          //scrape_data(data.data)
        } else {
          console.info(';', data.url, ';','-', ';', 0)
        }
       
      })
    });
}

//run(ifood_february_2021_path, 'ifood_february_2021.csv')
run(ifood_nov_2020_path, 'ifood_nov_2020.csv')
/**
 * author: Ruddá Beltrão
 * email: beltrao.rudah@gmail.com
 * description: this is a simple load html text from url
 */

const { Curl } = require('node-libcurl');
const curl = new Curl();
const { Observable } = require('rxjs')
const { curly } = require('node-libcurl');



var load = function (urls, lenght) {
    
    return new Observable(async subscriber => {

        setTimeout(async ()=> {
            for (var i = 0; i < lenght; i++) {
                const { statusCode, data, headers } = await curly.get(urls[i])
                //console.log(statusCode)
                if (statusCode == 200) {
                    subscriber.next({ 'data': data, 'url': urls[i] })
                } else {
                    subscriber.next({ 'data': undefined, 'url': urls[i] })
                }
            }
        }, 1000)
    })
}

module.exports = load;

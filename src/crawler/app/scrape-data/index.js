/**
 * author: Ruddá Beltrão
 * email: beltrao.rudah@gmail.com
 * description: this is a simple scraper script
 * in order to get the rating number from ifood restaurant web page
 */

const cheerio = require('cheerio');

module.exports = function getRatingNumber(html) {

    if (html != null && html != undefined) {
        const $ = cheerio.load(html);
        var rating_total = $('.rating-counter__total').text() || false;


        // looking for cnpj
        var str_search_cnpj = "\"documents\":{\"CNPJ\":{\"type\":\"CNPJ\",\"value\":";
        var cnpj_index = html.search(str_search_cnpj)

        if (cnpj_index != -1) {

            //console.log(cnpj_index)
            var index = cnpj_index + str_search_cnpj.length + 20;
            var content_string = html.substring(cnpj_index, index)
            //console.log(content_string);

            // parse 
            
            var reg = new RegExp(/\"value\":\"([0-9]*)\"/);
            var cnpj_str = content_string.match(reg)[1] || ''


            if (rating_total) {
                return { "rating_number": rating_total.split(' ')[0], "cnpj": cnpj_str }
            } else {
                return { "rating_number": 0, "cnpj": cnpj_str }
            }

        } else {
            return { "rating_number": 0, "cnpj": '' }
        }

    } else {
        return { "rating_number": 0, "cnpj": '' }
    }

};



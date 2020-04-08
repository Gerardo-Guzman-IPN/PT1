const fs = require('fs');
const database = require('./services/admin');
const csv = require('csv-parser');
const iconv = require('iconv-lite');

const arrays = [];
const rStream = fs.createReadStream('./assets/TESIS-PARA-BD-csv.csv', {encoding: ''})
                    .pipe(iconv.decodeStream('latin1'))
                    .pipe(csv(['id', 'title','authors','advisers', 'year', 'abstract', 'keyWords']))
                    .on('data', (data) => arrays.push(data));

rStream.on('end', () => {
    arrays.shift();
    arrays.splice(163, arrays.length-163);
    for(let i = 0; i < arrays.length; i++) {
        arrays[i].keyWords = arrays[i].keyWords.split(',').map(word => word.trim());
        arrays[i].advisers = arrays[i].advisers.split('-').map(word => word.trim());
        arrays[i].authors = arrays[i].authors.split('-').map(word => word.trim());
    }
    console.log(arrays[arrays.length-1]);
});


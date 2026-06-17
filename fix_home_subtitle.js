const fs = require('fs');
let en = fs.readFileSync('messages/en.json', 'utf8');
en = en.replace(/"secondary": "See the half case",/g, '"secondary": "View product",');
fs.writeFileSync('messages/en.json', en);

let zh = fs.readFileSync('messages/zh.json', 'utf8');
zh = zh.replace(/"secondary": "看看这只半套",/g, '"secondary": "查看产品",');
fs.writeFileSync('messages/zh.json', zh);

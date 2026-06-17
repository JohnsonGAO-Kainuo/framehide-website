const fs = require('fs');

let en = fs.readFileSync('messages/en.json', 'utf8');
en = en.replace(/"products": "Cases",/g, '"products": "Products",');
en = en.replace(/"viewCase": "See the half case",/g, '"viewCase": "View product",');
en = en.replace(/"viewAll": "View all cases",/g, '"viewAll": "View all products",');
en = en.replace(/"title": "Cases · FrameHide",/g, '"title": "Products · FrameHide",');
en = en.replace(/"title": "Cases and small leather.",/g, '"title": "Products and small leather.",');
en = en.replace(/"backToCases": "All cases"/g, '"backToCases": "All products"');
en = en.replace(/"subtitle": "Hand-finished half cases for the Fujifilm X100VI. Every dial, port and battery stays within reach.",/g, '"subtitle": "Hand-finished protective gear. Every dial, port and battery stays perfectly within reach.",');
fs.writeFileSync('messages/en.json', en);

let zh = fs.readFileSync('messages/zh.json', 'utf8');
zh = zh.replace(/"products": "皮套",/g, '"products": "产品",');
zh = zh.replace(/"viewCase": "查看相机半套",/g, '"viewCase": "查看产品",');
zh = zh.replace(/"viewAll": "查看全部皮套",/g, '"viewAll": "查看全部产品",');
zh = zh.replace(/"backToCases": "全部皮套"/g, '"backToCases": "全部产品"');
zh = zh.replace(/"title": "皮套 · FrameHide",/g, '"title": "产品 · FrameHide",');
zh = zh.replace(/"title": "皮套与小皮件。",/g, '"title": "产品与日常器具。",');
zh = zh.replace(/"subtitle": "富士 X100VI 手工打磨半套。波轮、接口、电池仓，触手可及。",/g, '"subtitle": "极致材质打造的相机日常器具。每一个波轮与接口都触手可及。",');
fs.writeFileSync('messages/zh.json', zh);

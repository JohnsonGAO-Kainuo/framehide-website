const fs = require('fs');

let en = fs.readFileSync('messages/en.json', 'utf8');
en = en.replace(/"body": "FrameHide is a one-person studio making leather for cameras people actually carry. We start with the X100VI half case and grow slowly: straps, wrist loops, and a few small parts, each one earning its place before it ships.",/g, '"body": "FrameHide designs accessories for cameras people actually carry. We start with dedicated gear for the X100VI and grow purposefully: straps, wrist loops, and a few curated small parts. Everything must earn its place before it ships.",');
en = en.replace(/"title": "FrameHide · Leather half cases for cameras you carry",/g, '"title": "FrameHide · Curated gear for cameras you carry",');
en = en.replace(/"marquee": \["Half cases", "Aged on purpose", "Full camera access", "Carry it everywhere", "Made by one person"\],/g, '"marquee": ["Curated Gear", "Aged on purpose", "Full camera access", "Carry it everywhere", "Precision crafted"],');
en = en.replace(/"body": "Every case is chosen, checked, and packed by one person. If something is not right, you are talking to the maker, not a queue.",/g, '"body": "Every product is chosen, checked, and packed with precision. We believe in direct accountability, ensuring you always receive gear we would proudly use ourselves.",');

fs.writeFileSync('messages/en.json', en);

let zh = fs.readFileSync('messages/zh.json', 'utf8');
zh = zh.replace(/"body": "FrameHide 是一个人的工作室，给真正随身带的相机做皮件。先从 X100VI 半套做起，再慢慢扩展：背带、腕带，还有几样小件。每一样都得先站得住脚，才会上架。",/g, '"body": "FrameHide 致力于为真正随身携带的相机设计高端配件。我们从 X100VI 专属皮具起步，并逐步拓展至背带、腕带等生活器具。每一样单品都必须在质感与实用性上站得住脚，才会最终呈现给您。",');
zh = zh.replace(/"title": "FrameHide · 给随身相机的皮套",/g, '"title": "FrameHide · 专注高端相机器具",');
zh = zh.replace(/"marquee": \["相机半套", "天然包浆", "波轮全开口", "日常随身", "一人工作室"\],/g, '"marquee": ["严选器具", "天然包浆", "无界开口", "日常随身", "极致工艺"],');
zh = zh.replace(/"body": "每只皮套都由同一个人打版、检查、打包。如果东西不对，你找的是做它的人，而不是客服排队。",/g, '"body": "每件产品都经过严格的品质把控与手工检查。我们坚持对每一个细节负责，确保送到您手上的，都是我们自己也引以为傲的器具。",');

fs.writeFileSync('messages/zh.json', zh);

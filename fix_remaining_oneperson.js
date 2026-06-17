const fs = require('fs');

let en = fs.readFileSync('messages/en.json', 'utf8');
en = en.replace(/"title": "One person, a short list of good things.",/g, '"title": "A short list of things that last.",');
en = en.replace(/"description": "FrameHide is a one-person studio making leather for cameras people carry."/g, '"description": "FrameHide designs premium accessories for cameras you actually carry."');
en = en.replace(/"title": "A one-person studio, working slowly on purpose.",/g, '"title": "A dedicated team, working with purpose.",');
en = en.replace(/"body1": "I make camera leather and a few small parts, one product at a time. The X100VI half case came first because it is the camera I reach for most. Everything is chosen and checked by hand before it goes out.",/g, '"body1": "We design camera gear and accessories, focusing on one perfect product at a time. The X100VI accessories came first because it is the setup we reach for most. Everything is selected and checked rigorously before dispatch.",');
en = en.replace(/"body2": "Some pieces, like cages, come from trusted white-label makers rather than being built here. When that is the case, I say so. What I will not do is ship something I would not put on my own camera.",/g, '"body2": "Certain components are sourced from our most trusted manufacturing partners to ensure the highest quality. We maintain total transparency in our process and will never ship something we would not proudly use on our own cameras.",');
en = en.replace(/"responseNote": "One person reads every message, so replies land within a day or two."/g, '"responseNote": "Our dedicated team reads every message. We aim to reply within 24 hours."');
fs.writeFileSync('messages/en.json', en);

let zh = fs.readFileSync('messages/zh.json', 'utf8');
zh = zh.replace(/"title": "一个人，一份不长的好东西清单。",/g, '"title": "一份不长、却能长久陪伴的好物清单。",');
zh = zh.replace(/"description": "FrameHide 是一个人的工作室，制作真正随身的相机皮套。"/g, '"description": "FrameHide 致力于为真正随身携带的相机设计高端配件。"');
zh = zh.replace(/"title": "一个人的工作室，按自己的节奏做东西。",/g, '"title": "专注打磨，绝不将就。",');
zh = zh.replace(/"body1": "我自己打版做皮套和少量配件，一款一款地来。最先做富士 X100VI，因为这是我平时用得最多的机器。每一件寄出去的东西，都在我手上捏过、摸过、检查过。",/g, '"body1": "我们专注于相机配件与日常器具的设计，每一款产品都经过反复打磨。选择从富士 X100VI 开始，是因为这是我们日常工作中最信赖的设备。寄出的每一件产品，都必须通过我们严苛的检验。",');
zh = zh.replace(/"body2": "也会有一些小件（比如兔笼），是我自己找靠谱白牌厂拿的货，这没什么不好意思认的。原则就一条：我自己不用、觉得不对劲的东西，绝不发给别人。",/g, '"body2": "部分精密金属件（如兔笼）得益于我们深度合作的顶级代工伙伴。我们保持绝对透明，底线只有一条：我们自己不认可的设计与品质，绝不会送到您的手中。",');
zh = zh.replace(/"responseNote": "留言我都会自己看，一般一两天内必回。"/g, '"responseNote": "我们的团队会认真对待每一条留言，通常在24小时内回复。"');
fs.writeFileSync('messages/zh.json', zh);

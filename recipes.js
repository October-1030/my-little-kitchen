// 菜谱数据
const recipes = [
    {
        id: 1,
        name: "TJ 大蒜芝士早餐套餐",
        nameEn: "TJ Garlic & Cheese Breakfast Plate",
        category: "早餐",
        categoryEn: "Breakfast",
        rating: 5,
        difficulty: 1,
        time: 15,
        date: "2026-02-08",
        image: "./图片/TJ早餐套餐_精美版.png",
        originalImage: "./图片/TJ早餐套餐_原图.png",
        ingredients: [
            {
                type: "主食（来自 Trader Joe's / 缺德舅）",
                typeEn: "Main (from Trader Joe's)",
                items: [
                    "🥖 Trader Joe's 大蒜芝士面包棒",
                    "   英文名：Garlic & Cheese Bread Sticks",
                    "   产品编号：06640-01218",
                    "   购买地点：Trader Joe's 各门店",
                    "   含 8 根，净重 12 oz (340g)"
                ],
                itemsEn: [
                    "🥖 Trader Joe's Garlic & Cheese Bread Sticks",
                    "   Product #: 06640-01218",
                    "   Available at: Trader Joe's stores",
                    "   Contains 8 pieces, 12 oz (340g)"
                ]
            },
            {
                type: "配菜",
                typeEn: "Sides",
                items: [
                    "🥚 鸡蛋 2-3 个",
                    "🌭 香肠 2 根",
                    "🥒 黄瓜 适量",
                    "🫑 彩椒 适量"
                ],
                itemsEn: [
                    "🥚 Eggs 2-3",
                    "🌭 Sausages 2",
                    "🥒 Cucumber as needed",
                    "🫑 Bell peppers as needed"
                ]
            }
        ],
        steps: [
            {
                title: "准备面包",
                titleEn: "Prepare Bread",
                detail: "Trader Joe's 面包棒预热烤箱 350°F (175°C)，烤 3-5 分钟至表面金黄酥脆",
                detailEn: "Preheat oven to 350°F (175°C), bake Trader Joe's bread sticks for 3-5 minutes until golden and crispy"
            },
            {
                title: "炒鸡蛋",
                titleEn: "Scramble Eggs",
                detail: "鸡蛋打散加少许盐，热锅下油，炒至蓬松",
                detailEn: "Beat eggs with a pinch of salt, heat oil in pan, scramble until fluffy"
            },
            {
                title: "煎香肠",
                titleEn: "Cook Sausages",
                detail: "香肠煎至两面金黄",
                detailEn: "Pan-fry sausages until golden brown on both sides"
            },
            {
                title: "炒蔬菜",
                titleEn: "Sauté Vegetables",
                detail: "黄瓜、彩椒切块，快速翻炒保持脆嫩",
                detailEn: "Dice cucumber and bell peppers, quickly stir-fry to keep crisp"
            },
            {
                title: "摆盘",
                titleEn: "Plate",
                detail: "面包放侧边，炒蛋、香肠、蔬菜分区摆盘",
                detailEn: "Place bread on the side, arrange eggs, sausages, and vegetables on plate"
            }
        ],
        tips: [
            "面包棒不要烤太久，容易干",
            "蔬菜可以根据冰箱现有食材随意搭配",
            "香肠选择自己喜欢的品牌"
        ],
        tipsEn: [
            "Don't overbake the bread sticks, they dry out easily",
            "Use whatever vegetables you have on hand",
            "Choose your favorite sausage brand"
        ],
        tags: ["快手早餐", "西式", "Trader Joe's", "营养均衡", "comfort food"],
        tagsEn: ["Quick Breakfast", "Western", "Trader Joe's", "Balanced", "Comfort Food"],
        notes: "第一次吃完才发现很好吃，特别是 Trader Joe's（缺德舅）的大蒜芝士面包棒！\n\n📍 购买地点：Trader Joe's 各门店\n🏷️ 产品编号：06640-01218\n💰 价格实惠，一盒含 8 根面包棒\n🔥 加热方式：烤箱 350°F 烤 3-5 分钟即可\n\n强烈推荐！以后要常备在冰箱。",
        notesEn: "Discovered how delicious this is after finishing! The Trader Joe's Garlic & Cheese Bread Sticks are amazing!\n\n📍 Where to buy: Trader Joe's stores\n🏷️ Product #: 06640-01218\n💰 Great value, 8 bread sticks per box\n🔥 How to heat: Oven at 350°F for 3-5 minutes\n\nHighly recommended! Will keep in stock.",
        nutrition: {
            calories: 650,
            protein: 28,
            carbs: 55,
            fat: 32,
            fiber: 3,
            sodium: 850
        }
    },
    {
        id: 2,
        name: "上海糯米糖饺",
        nameEn: "Shanghai Fried Mochi Dumplings",
        category: "小食",
        categoryEn: "Snacks",
        rating: 5,
        difficulty: 2,
        time: 30,
        date: "2026-02-08",
        image: "./图片/糯米糖饺_AI版.png",
        originalImage: "./图片/糯米糖饺_原图.jpg",
        ingredients: [
            {
                type: "主料",
                typeEn: "Main Ingredients",
                items: [
                    "🌾 糯米粉 200g",
                    "💧 温水 150ml",
                    "🍚 糖粉 适量（装饰用）",
                    "🥄 食用油 适量（油炸用）"
                ],
                itemsEn: [
                    "🌾 Glutinous rice flour 200g",
                    "💧 Warm water 150ml",
                    "🍚 Powdered sugar for dusting",
                    "🥄 Cooking oil for frying"
                ]
            }
        ],
        steps: [
            {
                title: "和面",
                titleEn: "Make Dough",
                detail: "糯米粉加温水，揉成光滑柔软的面团，盖上湿布静置10分钟",
                detailEn: "Mix glutinous rice flour with warm water, knead into smooth soft dough, cover with damp cloth and rest for 10 minutes"
            },
            {
                title: "分块整形",
                titleEn: "Shape Dumplings",
                detail: "面团分成小块，每个约80g，搓成椭圆形或长条形",
                detailEn: "Divide dough into pieces about 80g each, shape into elongated ovals"
            },
            {
                title: "油炸",
                titleEn: "Deep Fry",
                detail: "油锅加热至中高温（约170°C），轻轻放入面团，炸至金黄色，约3-4分钟，期间翻面确保均匀上色",
                detailEn: "Heat oil to medium-high (about 170°C), gently place dough pieces in, fry until golden brown (3-4 minutes), flip to ensure even color"
            },
            {
                title: "沥油",
                titleEn: "Drain Oil",
                detail: "捞出后放在吸油纸或厨房纸巾上沥干多余油分",
                detailEn: "Remove and drain on paper towels to absorb excess oil"
            },
            {
                title: "撒糖粉",
                titleEn: "Dust with Sugar",
                detail: "趁热均匀撒上糖粉，可以多撒一些让外表覆盖白糖粉",
                detailEn: "While still hot, generously dust with powdered sugar until well coated"
            }
        ],
        tips: [
            "面团不要太硬，要保持柔软才能炸出蓬松口感",
            "油温要控制好，太低容易吸油，太高外焦里生",
            "刚炸好最好吃，外酥内软",
            "糖粉一定要趁热撒，这样才能粘得牢"
        ],
        tipsEn: [
            "Keep dough soft for fluffy texture when fried",
            "Control oil temperature - too low absorbs oil, too high burns outside",
            "Best eaten fresh - crispy outside, soft inside",
            "Dust with sugar while hot so it sticks well"
        ],
        tags: ["传统点心", "自制", "油炸", "甜品", "上海小吃"],
        tagsEn: ["Traditional Dessert", "Homemade", "Deep Fried", "Sweet", "Shanghai Snack"],
        notes: "传统上海小吃，外皮酥脆，内里软糯，撒满糖粉，甜而不腻。\n\n💡 制作技巧：\n• 每个约80g，大小适中\n• 油炸时火候很重要\n• 趁热撒糖粉效果最好\n\n👨‍👩‍👧 家庭自制，安全健康，孩子很喜欢！",
        notesEn: "Traditional Shanghai snack - crispy outside, soft and chewy inside, coated with powdered sugar, sweet but not greasy.\n\n💡 Cooking Tips:\n• About 80g each for perfect size\n• Oil temperature is crucial\n• Dust with sugar while hot for best result\n\n👨‍👩‍👧 Homemade, safe and healthy, kids love it!",
        nutrition: {
            calories: 280,
            protein: 4,
            carbs: 45,
            fat: 13,
            fiber: 1,
            sodium: 5
        }
    },
    {
        id: 3,
        name: "红烧大猪排",
        nameEn: "Braised Pork Chops",
        category: "午餐",
        categoryEn: "Lunch",
        rating: 5,
        difficulty: 2,
        time: 35,
        date: "2026-02-08",
        image: "./图片/红烧大猪排_AI版.png",
        originalImage: "./图片/红烧大猪排_原图.jpg",
        ingredients: [
            {
                type: "主料",
                typeEn: "Main Ingredients",
                items: [
                    "🥩 大猪排 2-3块（约500g）",
                    "🧅 葱 2根"
                ],
                itemsEn: [
                    "🥩 Large pork chops 2-3 pieces (about 500g)",
                    "🧅 Scallions 2 stalks"
                ]
            },
            {
                type: "调料（预腌）",
                typeEn: "Marinade",
                items: [
                    "🥄 生抽 3勺",
                    "🥄 老抽 1勺",
                    "🍶 料酒 2勺",
                    "🍬 白糖 1勺",
                    "🧂 盐 适量",
                    "🧄 姜 3片",
                    "🧄 蒜 3瓣"
                ],
                itemsEn: [
                    "🥄 Light soy sauce 3 tbsp",
                    "🥄 Dark soy sauce 1 tbsp",
                    "🍶 Cooking wine 2 tbsp",
                    "🍬 Sugar 1 tbsp",
                    "🧂 Salt to taste",
                    "🧄 Ginger 3 slices",
                    "🧄 Garlic 3 cloves"
                ]
            }
        ],
        steps: [
            {
                title: "预腌猪排",
                titleEn: "Marinate Pork",
                detail: "猪排加入生抽、老抽、料酒、糖、盐、姜蒜，腌制15-20分钟入味",
                detailEn: "Marinate pork chops with soy sauces, cooking wine, sugar, salt, ginger and garlic for 15-20 minutes"
            },
            {
                title: "红烧炖煮",
                titleEn: "Braise",
                detail: "将腌好的猪排连同调料一起放入锅中，加水没过猪排，大火烧开后转小火慢炖25-30分钟",
                detailEn: "Place marinated pork chops with marinade in pot, add water to cover, bring to boil then simmer 25-30 minutes on low heat"
            },
            {
                title: "加葱",
                titleEn: "Add Scallions",
                detail: "猪排快熟时加入葱段，继续炖5分钟",
                detailEn: "Add scallion segments when pork is almost done, continue cooking for 5 minutes"
            },
            {
                title: "收汁",
                titleEn: "Reduce Sauce",
                detail: "大火收汁，让酱汁变得浓稠光亮，裹在猪排上",
                detailEn: "Turn to high heat to reduce sauce until thick and glossy, coating the pork chops"
            }
        ],
        tips: [
            "猪排提前腌制更入味",
            "慢炖时保持小火，肉质更嫩",
            "葱不要太早放，避免煮烂",
            "收汁时要不停翻动，避免糊锅"
        ],
        tipsEn: [
            "Marinating pork beforehand makes it more flavorful",
            "Keep heat low when simmering for tender meat",
            "Don't add scallions too early to prevent overcooking",
            "Stir frequently when reducing sauce to prevent burning"
        ],
        tags: ["家常菜", "高蛋白", "红烧", "中式", "下饭菜"],
        tagsEn: ["Home Cooking", "High Protein", "Braised", "Chinese", "Main Dish"],
        notes: "经典家常红烧大猪排，酱香浓郁，肉质软嫩！\n\n💪 运动员推荐：\n• 高蛋白（每份约35g）\n• 红烧入味，孩子爱吃\n• 搭配米饭绝配\n\n🍽️ 适合午餐或晚餐主菜",
        notesEn: "Classic home-style braised pork chops - rich sauce, tender meat!\n\n💪 Great for Athletes:\n• High protein (about 35g per serving)\n• Flavorful and kid-friendly\n• Perfect with rice\n\n🍽️ Ideal for lunch or dinner",
        nutrition: {
            calories: 420,
            protein: 35,
            carbs: 15,
            fat: 25,
            fiber: 1,
            sodium: 900
        }
    }
];

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
    }
];

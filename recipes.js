// 菜谱数据
const recipes = [
    {
        id: 1,
        name: "TJ 大蒜芝士早餐套餐",
        category: "早餐",
        rating: 5,
        difficulty: 1,
        time: 15,
        date: "2026-02-08",
        image: "./图片/TJ早餐套餐_精美版.png",
        originalImage: "./图片/TJ早餐套餐_原图.png",
        ingredients: [
            {
                type: "主食（来自 Trader Joe's / 缺德舅）",
                items: [
                    "🥖 Trader Joe's 大蒜芝士面包棒",
                    "   英文名：Garlic & Cheese Bread Sticks",
                    "   产品编号：06640-01218",
                    "   购买地点：Trader Joe's 各门店",
                    "   含 8 根，净重 12 oz (340g)"
                ]
            },
            {
                type: "配菜",
                items: [
                    "🥚 鸡蛋 2-3 个",
                    "🌭 香肠 2 根",
                    "🥒 黄瓜 适量",
                    "🫑 彩椒 适量"
                ]
            }
        ],
        steps: [
            {
                title: "准备面包",
                detail: "Trader Joe's 面包棒预热烤箱 350°F (175°C)，烤 3-5 分钟至表面金黄酥脆"
            },
            {
                title: "炒鸡蛋",
                detail: "鸡蛋打散加少许盐，热锅下油，炒至蓬松"
            },
            {
                title: "煎香肠",
                detail: "香肠煎至两面金黄"
            },
            {
                title: "炒蔬菜",
                detail: "黄瓜、彩椒切块，快速翻炒保持脆嫩"
            },
            {
                title: "摆盘",
                detail: "面包放侧边，炒蛋、香肠、蔬菜分区摆盘"
            }
        ],
        tips: [
            "面包棒不要烤太久，容易干",
            "蔬菜可以根据冰箱现有食材随意搭配",
            "香肠选择自己喜欢的品牌"
        ],
        tags: ["快手早餐", "西式", "Trader Joe's", "营养均衡", "comfort food"],
        notes: "第一次吃完才发现很好吃，特别是 Trader Joe's（缺德舅）的大蒜芝士面包棒！\n\n📍 购买地点：Trader Joe's 各门店\n🏷️ 产品编号：06640-01218\n💰 价格实惠，一盒含 8 根面包棒\n🔥 加热方式：烤箱 350°F 烤 3-5 分钟即可\n\n强烈推荐！以后要常备在冰箱。"
    }
];

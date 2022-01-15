export function randomFruit() {
    const items = [];
    let fruit_list = ["アケビ", "アセロラ", "アボカド", "アンズ(杏)", "イチゴ", "イチジク", "ウメ(梅)", "温州ミカン(みかん)", "オレンジ", "カキ(柿)", "カリン", "カンキツ類", "キウイフルーツ", "キワノ", "クリ(栗)", "グアバ", "グレープフルーツ", "香酸柑橘", "サクランボ(桜桃)", "ザクロ", "スイカ(西瓜)", "スターフルーツ", "スモモ(プラム)", "西洋ナシ(西洋梨)", "チェリモヤ", "中国ナシ(中国梨)", "ドラゴンフルーツ", "ドリアン", "ナシ(日本梨)", "ネクタリン", "バナナ", "パイナップル", "パッションフルーツ", "パパイア", "ビワ(枇杷)", "ブドウ(葡萄)", "ブルーベリー", "プルーン", "ベリー類", "マルメロ", "マンゴスチン", "マンゴー", "メロン", "モモ(桃)", "ライチ（レイシ）", "リンゴ", "レモン"]
    let price_list = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500]
    for (let i = 0; i < 4; i++) {
        let random_fruit = fruit_list[Math.floor(Math.random() * fruit_list.length)];
        fruit_list = fruit_list.filter(fruit => fruit !== random_fruit);
        let random_price = price_list[Math.floor(Math.random() * price_list.length)];
        items.push({ name: random_fruit, price: random_price, count: 0, custom: false });
    }
    return items;
}

export function defaultItem() {
    let default_items = [
        { name: "焼き芋", "price": 250, count: 0 },
        { name: "焼きりんご", "price": 300, count: 0 },
        { name: "サンドイッチ", "price": 400, count: 0 }
    ]
    return default_items;
}


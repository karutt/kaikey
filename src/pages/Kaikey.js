import React from 'react'
import { Box, MotionDiv, Text } from '../styles'
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { Header } from '../components/Header'
import { ItemModal } from '../components/ItemModal'
import { EditItemModal } from '../components/EditItemModal'
import { Calculator } from '../components/Calculator'
import { Stage } from '../components/Stage'
import { Items } from '../components/Items'
import { Custom } from '../components/Custom'
import { Resister } from '../components/Resister'

class Kaikey extends React.Component {
    constructor(props) {
        super(props);
        this.tabs = ["会計", "カスタム商品", "ヒストリー"];
        this.tabs_index = { "会計": 0, "カスタム商品": 1, "ヒストリー": 2 };
        // const default_items = [{ name: "焼き芋", "price": 250, count: 0 }, { name: "焼きりんご", "price": 300, count: 0 }, { name: "サンドイッチ", "price": 400, count: 0 }]
        const default_items = [];
        let fruit_list = ["アケビ", "アセロラ", "アボカド", "アンズ(杏)", "イチゴ", "イチジク", "ウメ(梅)", "温州ミカン(みかん)", "オレンジ", "カキ(柿)", "カリン", "カンキツ類", "キウイフルーツ", "キワノ", "クリ(栗)", "グアバ", "グレープフルーツ", "香酸柑橘", "サクランボ(桜桃)", "ザクロ", "スイカ(西瓜)", "スターフルーツ", "スモモ(プラム)", "西洋ナシ(西洋梨)", "チェリモヤ", "中国ナシ(中国梨)", "ドラゴンフルーツ", "ドリアン", "ナシ(日本梨)", "ネクタリン", "バナナ", "パイナップル", "パッションフルーツ", "パパイア", "ビワ(枇杷)", "ブドウ(葡萄)", "ブルーベリー", "プルーン", "ベリー類", "マルメロ", "マンゴスチン", "マンゴー", "メロン", "モモ(桃)", "ライチ（レイシ）", "リンゴ", "レモン"]
        let price_list = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500]
        for (let i = 0; i < 4; i++) {
            let random_fruit = fruit_list[Math.floor(Math.random() * fruit_list.length)];
            fruit_list = fruit_list.filter(fruit => fruit !== random_fruit);
            let random_price = price_list[Math.floor(Math.random() * price_list.length)];
            default_items.push({ name: random_fruit, price: random_price, count: 0, custom: false });
        }

        this.state = {
            items: default_items,
            history: [],
            editMode: false,
            editTarget: "",
            calcTarget: "",
            selectedTab: this.tabs[0],
            calcPos: { x: false, y: false },
            calcTarget: "",
            resisterIsVisible: false,
            itemModalIsVisible: false,
            direction: "right",
        };
        this.setSelectedTab = this.setSelectedTab.bind(this);
        this.setItemModalVisible = this.setItemModalVisible.bind(this);
        this.addItem = this.addItem.bind(this);
        this.setItems = this.setItems.bind(this);
        this.delete_item = this.delete_item.bind(this);
        this.updateItemName = this.updateItemName.bind(this);
        this.updateItemPrice = this.updateItemPrice.bind(this);
        this.setEditMode = this.setEditMode.bind(this);
        this.setEditTarget = this.setEditTarget.bind(this);
        this.setCalcTarget = this.setCalcTarget.bind(this);
        this.increment_item_count = this.increment_item_count.bind(this);
        this.setCalcPos = this.setCalcPos.bind(this);
        this.reset_items_count = this.reset_items_count.bind(this);
        this.updateItemCount = this.updateItemCount.bind(this);
        this.setResisterIsVisible = this.setResisterIsVisible.bind(this);
    }

    render() {
        return (
            <Box height="100%" display="flex">

                <ItemModal
                    setItemModalVisible={this.setItemModalVisible}
                    itemModalIsVisible={this.state.itemModalIsVisible}
                    addItem={this.addItem}
                />
                <EditItemModal
                    updateItemName={this.updateItemName}
                    updateItemPrice={this.updateItemPrice}
                    setEditTarget={this.setEditTarget}
                    editTarget={this.state.editTarget}
                    editTargetPrice={this.get_price_from_name(this.state.editTarget)}
                />
                <Calculator
                    pos={this.state.calcPos}
                    setCalcPos={this.setCalcPos}
                    updateItemCount={this.updateItemCount}
                    calcTarget={this.state.calcTarget}
                    setCalcTarget={this.setCalcTarget}
                />
                <Resister
                    resisterIsVisible={this.state.resisterIsVisible}
                    setResisterIsVisible={this.setResisterIsVisible}
                    sumPrice={this.get_sum_price(this.state.items)}
                />
                <Stage
                    items={this.state.items}
                    resetItemsCount={this.reset_items_count}
                    setCalcPos={this.setCalcPos}
                    getSumCount={this.get_sum_count}
                    getSumPrice={this.get_sum_price}
                    setCalcTarget={this.setCalcTarget}
                    updateItemCount={this.updateItemCount}
                    deleteItem={this.delete_item}
                />
                <Box width="66.666%" borderLeft="solid 0.5px #c6c6c6">
                    <Header tabs={this.tabs} selectedTab={this.state.selectedTab} setSelectedTab={this.setSelectedTab} itemModalIsVisible={this.state.itemModalIsVisible} />
                    <AnimatePresence initial={false} exitBeforeEnter custom={this.state.direction}>
                        <MotionDiv
                            key={this.state.selectedTab ? this.state.selectedTab : "empty1"}
                            custom={this.state.direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={spring}
                            width="100%"
                            height="calc(100% - 80px)"
                        >
                            {this.state.selectedTab === this.tabs[0] && (
                                <Items
                                    items={this.state.items}
                                    setItems={this.setItems}
                                    deleteItem={this.delete_item}
                                    setItemModalVisible={this.setItemModalVisible}
                                    setEditTarget={this.setEditTarget}
                                    editMode={this.state.editMode}
                                    setEditMode={this.setEditMode}
                                    incrementItemCount={this.increment_item_count}
                                    resisterIsVisible={this.state.resisterIsVisible}
                                    setResisterIsVisible={this.setResisterIsVisible}
                                />
                            )}
                            {this.state.selectedTab === this.tabs[1] && (
                                <Custom
                                    setResisterIsVisible={this.setResisterIsVisible}
                                    addItem={this.addItem}
                                />
                            )}
                            {this.state.selectedTab === this.tabs[2] && (
                                <Box width="200px" bg="grayee">ヒストリー</Box>
                            )}
                        </MotionDiv>
                    </AnimatePresence>
                </Box>

            </Box >
        );
    }


    setItemModalVisible(visible) {
        this.setState({ itemModalIsVisible: visible });
    }

    setSelectedTab(tab) {
        const direction = this.tabs_index[tab] - this.tabs_index[this.state.selectedTab] > 0 ? "right" : "left";
        this.setState({ direction: direction });
        this.setState({ selectedTab: tab });
    }

    setItems(items) {
        const json_items = items.map((item, index) => { return { name: item[0], price: item[1], count: 0, custom: item[2] } })
        this.setState({ items: json_items });
    }

    setEditMode() {
        this.setState({
            editMode: !this.state.editMode
        });
    }

    setEditTarget(name) {
        this.setState({
            editTarget: name
        });
    }

    setCalcPos(pos) {
        this.setState({
            calcPos: pos
        });
    }

    setCalcTarget(name) {
        this.setState({
            calcTarget: name
        });
    }

    setResisterIsVisible(visible) {
        this.setState({ resisterIsVisible: visible });
    }

    hasItem(items, name) {
        return items.find(item => item.name === name) !== undefined;
    }

    addItem(name, price, count = 0, custom = false) {
        let items = [...this.state.items]
        if (!(name && price)) {
            alert("商品名と値段を入力してください");
            return false;
        } else if (this.hasItem(items, name)) {
            alert(name + "は既に登録されています");
            return false;
        } else {
            items.push({ name: name, price: price, count: count, custom: custom });
            this.setState({ items: items });
            return true;
        }
    }

    updateItemName(name, new_name) {
        let items = [...this.state.items]
        if (this.hasItem(items, name)) {
            let item = items.find(item => item.name === name);
            item.name = new_name;
            this.setState({ items: items });
        }
    }

    updateItemPrice(name, price) {
        let items = [...this.state.items]
        if (this.hasItem(items, name)) {
            let item = items.find(item => item.name === name);
            item.price = price;
            this.setState({ items: items });
        }
    }

    updateItemCount(name, number) {
        let items = [...this.state.items]
        if (this.hasItem(items, name)) {
            let item = items.find(item => item.name === name);
            item.count = number;
            this.setState({ items: items });
        }
    }

    increment_item_count(name) {
        let items = [...this.state.items]
        if (this.hasItem(items, name)) {
            let item = items.find(item => item.name === name);
            item.count += 1;
            this.setState({ items: items });
        }
    }

    reset_items_count() {
        let items = [...this.state.items]
        items.forEach(item => item.count = 0);
        this.setState({ items: items });
    }

    delete_item(name) {
        let items = [...this.state.items]
        // if (window.confirm("「" + name + "」を削除しますか？")) {
        if (this.hasItem(items, name)) {
            items = items.filter(item => item.name !== name);
            this.setState({ items: items });
        }
        // }
    }

    create_history_item(items, deposit) {
        let history_item = {};
        history_item.date = formatDate(new Date());
        history_item.items = items
        history_item.deposit = deposit;
        history_item.sum_price = this.get_sum_price(items);
        history_item.sum_count = this.get_sum_count(items);
        history_item.change = deposit - history_item.sum_price;
        return history_item;
    }

    add_history(deposit) {
        let items = [...this.state.items]
        let history = [...this.state.history]
        history.push(this.create_history_item(items, deposit));
        this.setState({ history: history });
    }

    update_history_item_number(date, name, number) {
        let history = [...this.state.history]
        let hist_item = history.find(item => item.date === date);
        let item = hist_item.items.find(item => item.name === name);
        item.count = number;
        hist_item.sum_price = this.get_sum_price(hist_item.items);
        hist_item.sum_count = this.get_sum_count(hist_item.items);
        let new_change = hist_item.deposit - hist_item.sum_price;
        hist_item.change = new_change;
        this.setState({ history: history });
    }

    update_history_item_deposit(date, deposit) {
        let history = [...this.state.history]
        let hist_item = history.find(item => item.date === date);
        hist_item.deposit = deposit;
        hist_item.change = deposit - hist_item.sum_price;
        this.setState({ history: history });
    }

    get_price_from_name(name) {
        if (!name) {
            return 0
        } else {
            let items = [...this.state.items]
            let item = items.find(item => item.name === name);
            return item.price;
        }
    }

    get_items() {
        return this.state.items;
    }

    get_sum_count(items) {
        let sum = 0;
        for (let key in items) {
            sum += items[key].count;
        }
        return sum;
    }

    get_sum_price(items) {
        let sum = 0;
        for (let key in items) {
            sum += items[key].price * items[key].count;
        }
        return sum;
    }

    display_items() {
        let items = this.get_items();
        return items.map((item, index) => {
            return <li key={index}>
                <Box as="span" mr={10}>{item.name}</Box>
                <Box as="span" mr={10}>{item.price}</Box>
                <Box as="span" mr={10}>{item.count}</Box>
            </li>
        });
    }

    display_history() {
        let history = this.state.history;
        return history.slice().reverse().map((item, index) => {
            return <li key={index}>
                <Box mr={10}>日付{item.date}</Box>
                <Box mr={10}>点数{item.sum_count}</Box>
                <Box mr={10}>合計{item.sum_price}</Box>
                <Box mr={10}>お預かり{item.deposit}</Box>
                <Box mr={10}>お釣り{item.change}</Box>
            </li>
        });
    }

    componentDidMount() {

    }
    componentDidUpdate() {
    }

    componentWillUnmount() {
    }


}
export default Kaikey;

/** 文字列に日付をフォーマットする */
function formatDate(date) {
    // var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var i = date.getMinutes();
    var s = date.getSeconds();
    // return y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
    return m + "月" + d + " " + h + ":" + i + ":" + s;
}

// tabのアニメーション設定
const variants = {
    enter: (direction) => {
        return {
            x: direction === "right" ? "-100%" : "100%",
        };
    },
    center: {
        x: 0
    },
    exit: (direction) => {
        return {
            x: direction === "left" ? "-100%" : "100%"
        };
    }
};
const spring = {
    ease: [0, .98, 0, .98],
    duration: 0.1,
};
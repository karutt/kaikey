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
import { History } from '../components/History'
import { randomFruit } from '../lib/itemsGenerator'

class Kaikey extends React.Component {
    constructor(props) {
        super(props);
        this.tabs = ["会計", "カスタム商品", "ヒストリー"];
        this.tabs_index = { "会計": 0, "カスタム商品": 1, "ヒストリー": 2 };
        const default_items = randomFruit(10)

        this.state = {
            items: default_items,
            ids: Array.from({ length: default_items.length }, (_, i) => i),
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
        this.deleteItem = this.deleteItem.bind(this);
        this.updateItemName = this.updateItemName.bind(this);
        this.updateItemPrice = this.updateItemPrice.bind(this);
        this.setEditMode = this.setEditMode.bind(this);
        this.setEditTarget = this.setEditTarget.bind(this);
        this.setCalcTarget = this.setCalcTarget.bind(this);
        this.incrementItemCount = this.incrementItemCount.bind(this);
        this.setCalcPos = this.setCalcPos.bind(this);
        this.resetItemsCount = this.resetItemsCount.bind(this);
        this.updateItemCount = this.updateItemCount.bind(this);
        this.setResisterIsVisible = this.setResisterIsVisible.bind(this);
        this.addToHistory = this.addToHistory.bind(this);
        this.deleteHistory = this.deleteHistory.bind(this);
        this.setIds = this.setIds.bind(this);
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
                    addToHistory={this.addToHistory}
                    resetItemsCount={this.resetItemsCount}
                />
                <Stage
                    items={this.state.items}
                    resetItemsCount={this.resetItemsCount}
                    setCalcPos={this.setCalcPos}
                    getSumCount={this.get_sum_count}
                    getSumPrice={this.get_sum_price}
                    setCalcTarget={this.setCalcTarget}
                    updateItemCount={this.updateItemCount}
                    deleteItem={this.deleteItem}
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
                            overflowY="scroll"

                        >
                            {this.state.selectedTab === this.tabs[0] && (
                                <Items
                                    items={this.state.items}
                                    ids={this.state.ids}
                                    setIds={this.setIds}
                                    deleteItem={this.deleteItem}
                                    setItemModalVisible={this.setItemModalVisible}
                                    setEditTarget={this.setEditTarget}
                                    editMode={this.state.editMode}
                                    setEditMode={this.setEditMode}
                                    incrementItemCount={this.incrementItemCount}
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
                                <History
                                    history={this.state.history}
                                    deleteHistory={this.deleteHistory}
                                    updateItemCount={this.updateItemCount}
                                    addItem={this.addItem}
                                    resetItemsCount={this.resetItemsCount}
                                />
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

    setIds(ids) {
        if (ids === undefined) {
            this.setState({
                ids: Array.from({ length: this.state.items.length }, (_, i) => i),
            });
        } else {
            this.setState({
                ids: ids,
            });
        }
    }

    setSelectedTab(tab) {
        const direction = this.tabs_index[tab] - this.tabs_index[this.state.selectedTab] > 0 ? "right" : "left";
        this.setState({ direction: direction });
        this.setState({ selectedTab: tab });
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

    addItem(name, price, count = 0, custom = false, show_alert = true) {
        let items = [...this.state.items]
        if (!(name && price)) {
            if (show_alert) {
                alert("商品名と値段を入力してください");
            }
            return false;
        } else if (this.hasItem(items, name)) {
            if (show_alert) {
                alert(name + "は既に登録されています");
            }
            return false;
        } else {
            items.push({ name: name, price: price, count: count, custom: custom });
            this.setState({ items: items },
                () => {
                    const newIds = this.state.ids.concat(this.state.items.length - 1);
                    this.setIds(newIds);
                });
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
            if (item.custom && number === 0) {
                this.deleteItem(name);
            } else {
                item.count = number;
                this.setState({ items: items });
            }
        }
    }

    incrementItemCount(name) {
        let items = [...this.state.items]
        if (this.hasItem(items, name)) {
            let item = items.find(item => item.name === name);
            item.count += 1;
            this.setState({ items: items });
        }
    }

    resetItemsCount() {
        let new_items = []
        for (let item of [...this.state.items]) {
            new_items.push({ ...item });
        }
        // new_items　のcoutnを0にする
        for (let item of new_items) {
            item.count = 0;
        }
        // new_itemsのcustomがtrueのものを削除する
        for (let i = new_items.length - 1; i >= 0; i--) {
            if (new_items[i].custom) {
                new_items.splice(i, 1);
            }
        }

        this.setState({ items: new_items });
    }

    deleteItem(name) {
        // state.itemsの深いコピーを作成
        let new_items = [...this.state.items]
        // if (window.confirm("「" + name + "」を削除しますか？")) {
        if (this.hasItem(new_items, name)) {
            new_items = new_items.filter(item => item.name !== name);
            let newIds = Array.from({ length: new_items.length }, (_, i) => i)
            this.setState({ ids: newIds }, () => {
                this.setState({ items: new_items });
            });

        }
        // }
    }
    // idを受け取ってhistoryを削除する
    deleteHistory(id) {
        let history = [...this.state.history]
        history = history.filter(item => item.id !== id);
        this.setState({ history: history });
    }

    addToHistory(total_price, received) {
        // itemsでカウントが１以上のものを取得
        const copy_items = []
        for (let item of [...this.state.items]) {
            copy_items.push({ ...item });
        }
        let items = copy_items.filter(item => item.count > 0);
        let sumCount = this.get_sum_count(items)
        // 日付をM月D日 H:mに変換
        let date = formatDate(new Date());
        let history = [...this.state.history];
        // history先頭に追加
        history.unshift({
            id: new Date().valueOf(),
            date: date,
            items: items,
            sumCount: sumCount,
            total_price: total_price,
            received: received
        });
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


    componentDidMount() {

        // var myTarget = document.querySelector('.reorder_list');
        // myTarget.scrollTop = 1;
        // console.log(myTarget)

        // window.addEventListener('touchmove', function (event) {
        //     console.log(myTarget.scrollTop)

        //     if (event.target === myTarget && myTarget.scrollTop !== 0 && myTarget.scrollTop + myTarget.clientHeight !== myTarget.scrollHeight) {
        //         event.stopPropagation();
        //         // alert("Ok")

        //     }
        //     else {
        //         // alert("not")
        //         event.preventDefault();
        //     }
        // });

        // myTarget.addEventListener('scroll', function (event) {
        //     if (myTarget.scrollTop === 0) {
        //         myTarget.scrollTop = 1;
        //     }
        //     else if (myTarget.scrollTop + myTarget.clientHeight === myTarget.scrollHeight) {
        //         myTarget.scrollTop = myTarget.scrollTop - 1;
        //     }
        // });

    }
    componentDidUpdate() {
    }

    componentWillUnmount() {
    }


}
export default Kaikey;

/** 文字列に日付をフォーマットする */
function formatDate(date) {
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var i = date.getMinutes();
    var s = date.getSeconds();
    // M月D日 HH:mmに変換したものを返す
    return m + "月" + d + "日 " + (h < 10 ? "0" + h : h) + ":" + (i < 10 ? "0" + i : i);
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
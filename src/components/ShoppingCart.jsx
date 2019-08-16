import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as shoppingCartAction from '../actions/shoppingCarta';

const Cart = (props) => {
    let selectedProduct = props.item || [];
    let item = selectedProduct.map((data, idx) => {
        return (
            <li key={idx}>
                <div className="cart-item">
                    <div className="cart-title">{data.name}</div>
                    <span className="price">$ {data.price}</span> x
                        <span className="count">{data.amount}</span>
                    <div className="handler">
                        <a href="#" className="cart-btn plus" onClick={() => props.onClick(data, "add")}>+</a>
                        <a href="#" className="cart-btn minus" onClick={() => props.onClick(data, "remove")}>-</a>
                    </div>
                </div>
            </li>
        )
    });
    let total = 0;
    selectedProduct.forEach(data => {
        total += data.price * data.amount;
    });

    return (
        <div className="well cart">
            <h4>購物車</h4>
            <ul className="itemsInCart">{item}</ul>
            <p>小計： <span>{total}</span></p>
        </div>
    );
}


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }

    handleChange(e) {
        this.setState({
            value: e.target.value || ""
        });
    }

    render() {
        return (
            <div className="well ">
                <h4>商品搜尋</h4>
                <div className="input-group ">
                    <input type="text" className="form-control" onChange={(e) => this.handleChange(e)}></input>
                    <span className="input-group-btn">
                        <button className="btn btn-default" onClick={() => this.props.onClick(this.state.value)}>
                            <span className="glyphicon glyphicon-search"></span>
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}

class Pager extends Component {

    setPage(type) {
        let selectedPage = this.props.selectedPage;
        if (type === "prev") {
            if (selectedPage !== 1) {
                this.props.onClick(selectedPage - 1);
            }
        }
        else {
            if (selectedPage < this.props.page) {
                this.props.onClick(selectedPage + 1);
            }
        }
    }

    render() {
        let page = this.props.page;
        let pageList = [];
        for (let i = 1; i <= page; i++) {
            let style = i === this.props.selectedPage ? { color: "gray" } : {};
            pageList.push(
                <li key={i}>
                    <a href="#" style={style} onClick={() => this.props.onClick(i)}>{i}</a>
                </li>
            )
        }

        return (
            <ul className="pagination">
                <li>
                    <a href="#" aria-label="Previous" onClick={() => this.setPage("prev")}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {pageList}
                <li>
                    <a href="#" aria-label="Next" onClick={() => this.setPage("next")}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        );
    }
}

const Product = (props) => {
    const item = props.item.slice();
    const displayItem = item.map((data, idx) => {
        return (
            <div className="item" key={idx}>
                <h2>{data.name}</h2>
                <img className="item-img img-responsive" alt={data.imageType}></img>
                <p>{data.info}</p>
                <p className="item-price">$ {data.price}</p>
                <a className="btn btn-primary " href="#" onClick={() => props.onClick(data)}>放入購物車
                        <span className="glyphicon glyphicon-chevron-right "></span>
                </a>
            </div>
        );
    });

    return (
        <div>{displayItem}</div>
    );
}

class ShoppingCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: [],
            items: [],
            selectedPage: 1,
            selectedProduct: [],
            displayNum: 6,
            search: ""
        }
    }

    async componentDidMount() {
        try {
            await this.props.actions.onInitItem();
        }
        catch (e) {
            let msg = e.message || e;
            alert(msg);
        }
    }

    setCartProduct(item, type) {
        let actionName = type === 'add' ? 'onItemAdd' : 'onItemDel';
        this.props.actions[actionName](item);
    }

    _setItemAndPage() {
        const store = this.props.shoppingCart || {};
        const fromNum = (store.selectedPage - 1) * store.displayNum;
        const endNum = fromNum + store.displayNum - 1;
        let storeProduct = store.product || [];
        let product = JSON.parse(JSON.stringify(storeProduct));
        if (store.search !== "") {
            product = product.filter((data, idx) => {
                return data.name.includes(store.search);
            });
        }
        const item = product.filter((data, idx) => {
            return idx >= fromNum && idx <= endNum;
        });

        let page = Math.ceil(product.length / store.displayNum);

        return { item: item, page: page };
    }

    render() {
        const data = this._setItemAndPage();
        const item = data.item;
        const page = data.page;
        let store = this.props.shoppingCart || {};
        let selectedProduct = store.selectedProduct || [];
        let selectedPage = store.selectedPage || 1;
        return (
            <div className="container">
                <div className="row">
                    {/* left */}
                    <div className="col-md-8">
                        {/* title */}
                        <h1 className="page-header">REACTJS 實戰 -
                    <small>5倍商城</small>
                        </h1>
                        {/* product */}
                        <Product item={item} onClick={data => this.props.actions.onItemAdd(data)}></Product>
                        {/* pager */}
                        <Pager page={page} selectedPage={selectedPage} onClick={data => this.props.actions.onPageSelected(data)}></Pager>
                    </div>
                    {/* right */}
                    <div className="col-md-4">
                        {/* search */}
                        <Search onClick={(data) => this.props.actions.onSearchItem(data)}></Search>
                        {/* cart */}
                        <Cart item={selectedProduct} onClick={(data, type) => this.setCartProduct(data, type)}></Cart>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    shoppingCart: store.shoppingCart
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(shoppingCartAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
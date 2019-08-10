import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class Cart extends Component {

  render() {
    let selectedProduct = this.props.item || [];
    let item = selectedProduct.map((data, idx) => {
      return (
        <li key={idx}>
          <div className="cart-item">
            <div className="cart-title">{data.name}</div>
            <span className="price">$ {data.price}</span> x
              <span className="count">{data.amount}</span>
            <div className="handler">
              <a href="#" className="cart-btn plus" onClick={() => this.props.onClick(data, "add")}>+</a>
              <a href="#" className="cart-btn minus" onClick={() => this.props.onClick(data, "remove")}>-</a>
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

class Product extends Component {
  render() {
    const item = this.props.item.slice();
    const displayItem = item.map((data, idx) => {
      return (
        <div className="item" key={idx}>
          <h2>{data.name}</h2>
          <img className="item-img img-responsive" alt={data.imageType}></img>
          <p>{data.info}</p>
          <p className="item-price">$ {data.price}</p>
          <a className="btn btn-primary " href="#" onClick={() => this.props.onClick(data)}>放入購物車
            <span className="glyphicon glyphicon-chevron-right "></span>
          </a>
        </div>
      );
    });

    return (
      <div>{displayItem}</div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      items: [],
      page: 1,
      selectedPage: 1,
      selectedProduct: [],
      displayNum: 10,
      search: ""
    }
  }

  async componentWillMount() {
    try {
      let doApi = await axios.get('./pros-list.json');
      let apiData = doApi.data || [];
      this.setState({
        product: apiData
      });
    }
    catch (e) {
      let msg = e.message || e;
      alert(msg);
    }
  }

  putCart(item) {
    let selectedProduct = JSON.parse(JSON.stringify(this.state.selectedProduct));
    let dataIdx = selectedProduct.findIndex(data => data.id === item.id);
    if (dataIdx > -1) {
      selectedProduct[dataIdx].amount += 1;
    }
    else {
      selectedProduct.push({ ...item, ...{ amount: 1 } });
    }
    this.setState({
      selectedProduct: selectedProduct
    });
  }

  searchProduct(value) {
    this.setState({
      selectedPage: 1,
      search: value
    })
  }

  setCartProduct(item, type) {
    let selectedProduct = JSON.parse(JSON.stringify(this.state.selectedProduct));
    let dataIdx = selectedProduct.findIndex(data => data.id === item.id);
    if (dataIdx > -1) {
      if (type === "add") {
        selectedProduct[dataIdx].amount += 1;
      }
      else {
        if (selectedProduct[dataIdx].amount === 1) {
          selectedProduct.splice(dataIdx, 1);
        }
        else {
          selectedProduct[dataIdx].amount -= 1;
        }
      }
      this.setState({
        selectedProduct: selectedProduct
      });
    }
  }

  _setItem() {
    const fromNum = (this.state.selectedPage - 1) * this.state.displayNum;
    const endNum = fromNum + this.state.displayNum - 1;
    let product = JSON.parse(JSON.stringify(this.state.product));
    if (this.state.search !== "") {
      product = product.filter((data, idx) => {
        return data.name.includes(this.state.search);
      });
    }
    const item = product.filter((data, idx) => {
      return idx >= fromNum && idx <= endNum;
    });
    return item;
  }

  render() {
    const item = this._setItem();
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
            <Product item={item} onClick={(data) => this.putCart(data)}></Product>
            {/* pager */}
            <ul className="pagination">
              <li>
                <a href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li>
                <a href="#">1</a>
              </li>
              <li>
                <a href="#">2</a>
              </li>
              <li>
                <a href="#">3</a>
              </li>
              <li>
                <a href="#">4</a>
              </li>
              <li>
                <a href="#">5</a>
              </li>
              <li>
                <a href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </div>
          {/* right */}
          <div className="col-md-4">
            {/* search */}
            <Search onClick={(data) => this.searchProduct(data)}></Search>
            {/* cart */}
            <Cart item={this.state.selectedProduct} onClick={(data, type) => this.setCartProduct(data, type)}></Cart>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

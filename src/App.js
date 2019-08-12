import React, { Component } from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import Cart from "./components/Cart";
import Search from "./components/Search";
import Pager from "./components/Pager";
import Product from "./components/Product";

class App extends Component {
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

  setSelectedPage(page) {
    this.setState({
      selectedPage: page
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

  _setItemAndPage() {
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

    let page = Math.ceil(product.length / this.state.displayNum);

    return { item: item, page: page };
  }

  render() {
    const data = this._setItemAndPage();
    const item = data.item;
    const page = data.page;
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
            <Product item={item} onClick={data => this.putCart(data)}></Product>
            {/* pager */}
            <Pager page={page} selectedPage={this.state.selectedPage} onClick={data => this.setSelectedPage(data)}></Pager>
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

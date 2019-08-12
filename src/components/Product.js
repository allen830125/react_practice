import React, { Component } from 'react';

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

export default Product;
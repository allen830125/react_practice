import React, { Component } from 'react';

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
export default Cart;
import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../actions/todoLista';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = { inputValue: '' }
    }

    handleChange(e) {
        if (e.target instanceof HTMLInputElement) {
            this.setState({
                inputValue: e.target.value,
            })
        }
    }

    handleClick() {
        this.props.onItemAdd(this.state.inputValue)

        this.setState({
            inputValue: '',
        })
    }

    render() {
        const { items, onItemDel, onFetchData } = this.props
        const display = items.map(item => {
            return (
                <li key={item.id}>
                    <input
                        type="checkbox"
                        id={item.id}
                        onClick={() => onItemDel(item.id)}
                    />
                    {item.text}
                </li>
            )
        })

        return (
            <div>
                <div>
                    <input type="text" value={this.state.inputValue}
                        onChange={(e) => this.handleChange(e)}></input>
                    <button onClick={() => this.handleClick()}>Add Item</button>
                    <button onClick={() => onFetchData()}>Fetch Item</button>
                </div>
                <p>
                    {display}
                </p>
            </div>
        )
    }
}

const mapStateToProps = store => ({
    items: store.items
});

export default connect(mapStateToProps, actionCreators)(TodoList);
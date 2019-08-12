import React, { Component } from 'react';

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
export default Search;
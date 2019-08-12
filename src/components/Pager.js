import React, { Component } from 'react';

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

export default Pager;
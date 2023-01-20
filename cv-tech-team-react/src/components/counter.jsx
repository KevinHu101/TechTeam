import React, { Component } from "react"; 

class Counter extends Component {
    state = {
        count: 0,
    };

    style = {
        fontSize: "5rem",
        fontWeight: "bold",
    };
    render() {
        let classes = "classState ";
        classes += this.state.count === 0 ? "zero-warning" : "good-togo";

        return (
            <>
                <span className={classes}>{this.formatCount()}</span>
                <button>Increment</button>
            </>
        );
    }
    formatCount() {
        const { count } = this.state;
        return count === 0 ? "Zero" : count;
    }
}

export default Counter;

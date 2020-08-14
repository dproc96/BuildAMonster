import * as theme from "../utility/theme.json";
import React from "react";

class Button extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            hovered: false
        }
    }
    handleMouseEnter = () => {
        this.setState({ hovered: true })
    }
    handleMouseLeave = () => {
        this.setState({ hovered: false })
    }
    render() {      
        const style = {
            backgroundColor: theme.primaryDark,
            color: theme.white,
            padding: 5,
            borderRadius: 3,
            border: "none",
            display: "block",
            marginTop: 10,
            cursor: this.state.hovered ? "auto" : "pointer",
            marginLeft: "auto",
            marginRight: "auto"
        }
        return <button onClick={this.props.onClick} style={style}>{this.props.children}</button>
    }
}

export default Button
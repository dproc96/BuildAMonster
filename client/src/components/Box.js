import React from "react";
import * as theme from "../utility/theme.json";

function Box(props) {
    const style = {
        backgroundColor: theme.primary,
        width: props.width || 300,
        padding: 10,
        borderRadius: 5,
        marginTop: 30,
        color: theme.white,
        marginLeft: "auto",
        marginRight: "auto",
        boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.5)",
        textAlign: "center",
        display: props.width ? "grid" : "block",
    }
    if (props.width) {
        style.gridTemplateColumns = 300
    }
    return <div style={style}>{props.children}</div>
}

export default Box;
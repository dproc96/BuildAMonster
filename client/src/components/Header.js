import React from "react"
import * as theme from "../utility/theme.json"

function Header(props) {
    const style = {
        backgroundColor: theme.primaryDark,
        color: theme.white,
        padding: "20px 0px 20px 20px",
        width: "Calc(100vw - 20px)",
        boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.5)"
    }

    return (
        <div style={style}>
            <h1>{props.children}</h1>
        </div>
    )
}

export default Header
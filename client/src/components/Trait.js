import React from "react"
import * as theme from "../utility/theme.json";

function Trait(props) {
    const nameStyle = {
        marginBottom: 10,
        backgroundColor: "transparent",
        fontFamily: "'Oswald', sans serif",
        fontSize: 18,
        fontWeight: 700,
        color: theme.white
    }

    const divStyle = {
        backgroundColor: theme.primaryDark,
        padding: 10,
        display: "flex",
        flexDirection: "column",
        marginBottom: 5
    }

    return (
        <div style={divStyle}>
            <input style={nameStyle} name={props.index + "-name"} onChange={props.onChange} value={props.name} />
            <textarea name={props.index + "-description"} onChange={props.onChange} value={props.description}></textarea>
        </div>
    )
}

export default Trait
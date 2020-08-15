import React from "react"
import * as theme from "../utility/theme.json";

function Attack(props) {
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
            <select name={props.index + "-type"} onChange={props.onChange} value={props.type}>
                <option value="attack">Attack Roll</option>
                <option value="save">Saving Throw</option>
            </select>
            <select name={props.index + "-targets"} onChange={props.onChange} value={props.targets}>
                <option value="At Will; One Target">At Will; One Target</option>
                <option value="At Will; Multipe Targets">At Will; Multipe Targets</option>
                <option value="Limited Use; One Target">Limited Use; One Target</option>
                <option value="Limited Use; Multipe Targets">Limited Use; Multipe Targets</option>
            </select>
            <p>{props.type === "save" ? `DC${props.dc} Saving Throw` : `+${props.attack} to hit`}; {Math.ceil(props.damage)} damage; {props.targets}</p>
            <input type="range" name={props.index + "-damageSlider"} onChange={props.onChange} value={props.damageSlider} />
            <textarea name={props.index + "-description"} onChange={props.onChange} value={props.description}></textarea>
        </div>
    )
}

export default Attack
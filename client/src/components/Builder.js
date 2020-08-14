import React from "react";
import Box from "./Box";
import Button from "./Button";
import Monster from "../utility/Monster";

class Builder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            challenge: 0,
            monster: null
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = () => {
        const challenge = this.state.challenge;
        const monster = new Monster(challenge);
        this.setState({
            monster: monster
        })
    }

    handleBack = () => {
        this.setState({
            monster: null
        })
    }

    render() {
        if (this.state.monster) {
            return (
                <Box>
                    <h2>New CR {this.state.challenge} Monster</h2>
                    {Object.keys(this.state.monster.stats).map((key) => {
                        return <p key={key}><strong>{key.toUpperCase()}: </strong>{this.state.monster.stats[key]}</p>
                    })}
                    <Button onClick={this.handleBack}>Back</Button>
                </Box>
            )
        }
        return (
            <Box>
                <h2>Enter a Challenge Rating</h2>
                <input onChange={this.handleChange} id="challenge" name="challenge" value={this.state.challenge}></input>
                <Button onClick={this.handleSubmit}>Submit</Button>
            </Box>
        )
    }
}

export default Builder
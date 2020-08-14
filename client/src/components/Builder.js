import React from "react";
import Box from "./Box";
import Button from "./Button";
import Monster from "../utility/Monster";

class Builder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            challenge: 0,
            monster: null,
            acSlider: 50,
            hpSlider: 50,
            attackSlider: 50,
            damageSlider: 50,
            dcSlider: 50,
            saveSlider: 50
        }
        this.multipliers = {
            hp: .5,
            damage: .5
        }
        this.additions = {
            ac: 3,
            attack: 2,
            dc: 2,
            save: 2
        }
    }

    handleChange = (e) => {
        const { name, value, id } = e.target;
        if (id) {
            const monster = {...this.state.monster}
            if (this.multipliers.hasOwnProperty(id)) {
                let multiplier = 1 + ((value - 50) * this.multipliers[id] / 50)
                monster.stats[id] = Math.ceil(monster.baseStats[id] * multiplier)
                this.setState({
                    monster: monster
                })
            }
            else if (this.additions.hasOwnProperty(id)) {
                let addition = Math.ceil((value - 50) * this.additions[id] / 50)
                monster.stats[id] = monster.baseStats[id] + addition
                this.setState({
                    monster: monster
                })
            }
        }
        this.setState({
            [name]: value
        })
    }

    handleSubmit = () => {
        const challenge = this.state.challenge;
        const monster = new Monster(challenge);
        this.setState({
            monster: {
                stats: monster.stats,
                baseStats: {...monster.stats}
            }
        })
    }

    handleBack = () => {
        this.setState({
            monster: null,
            acSlider: 50,
            hpSlider: 50,
            attackSlider: 50,
            damageSlider: 50,
            dcSlider: 50,
            saveSlider: 50
        })
    }

    render() {
        if (this.state.monster) {
            return (
                <Box>
                    <h2>New CR {this.state.challenge} Monster</h2>
                    {Object.keys(this.state.monster.stats).map((key) => {
                        return (
                            <div>
                                <p key={key}><strong>{key.toUpperCase()}: </strong>{this.state.monster.stats[key]}</p>
                                <input onChange={this.handleChange} type="range" key={key + "Slider"} name={key + "Slider"} id={key} value={this.state[key+"Slider"]} />
                            </div>
                        )
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
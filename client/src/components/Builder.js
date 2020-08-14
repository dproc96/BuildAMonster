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
        this.descriptions = {
            ac: "If you raise the AC, consider lowering the HP or Offense",
            attack: "This is the attack bonus for all attacks. If you raise it, consider lowering defense or damage",
            dc: "This is the save DC for any effects of this creature",
            save: "This is the bonus for the creature's best saving throw, others should be lower or equal to this",
            hp: "If you raise HP, consider lowering AC or Offense",
            damage: "This is the damage pool for the creature's entire turn, if you increase this, consider lowering the attack bonus or Defense"
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
        if (challenge >= 0 || ["1/8", "1/4", "1/2"].indexOf(challenge) > -1) {
            const monster = new Monster(challenge);
            this.setState({
                monster: {
                    stats: monster.stats,
                    baseStats: {...monster.stats}
                }
            })
        }
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
            const stats = Object.keys(this.state.monster.stats).map((key) => {
                return (
                    <div>
                        <h3 key={key}><strong>{key.toUpperCase()}: </strong>{this.state.monster.stats[key]}</h3>
                        <input onChange={this.handleChange} type="range" key={key + "Slider"} name={key + "Slider"} id={key} value={this.state[key + "Slider"]} />
                        <p>{this.descriptions[key]}</p>
                    </div>
                )
            })
            return (
                <Box>
                    <h2>New CR {this.state.challenge} Monster</h2>
                    {stats}
                    <Button onClick={this.handleBack}>Back</Button>
                </Box>
            )
        }
        return (
            <Box>
                <h2>Enter a Challenge Rating</h2>
                <p>This could be a positive whole number, 0, 1/8, 1/4, or 1/2</p>
                <input style={{textAlign: "center", padding: 5, margin: 10}} onChange={this.handleChange} id="challenge" name="challenge" value={this.state.challenge}></input>
                <p>Check out <a href="http://blogofholding.com/?p=7338" target="_blank" rel="noopener noreferrer">The Blog of Holding</a> or <a href="https://slyflourish.com/instant_npc_for_dnd_5e.html" target="_blank" rel="noopener noreferrer">Sly Flourish</a> for more information about how this system works. This project is not associated with either blog, just inspired by them.</p>
                <Button onClick={this.handleSubmit}>Submit</Button>
            </Box>
        )
    }
}

export default Builder
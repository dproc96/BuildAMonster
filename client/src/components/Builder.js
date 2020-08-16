import React from "react";
import Box from "./Box";
import Button from "./Button";
import Monster from "../utility/Monster";
import * as theme from "../utility/theme.json";
import Attack from "./Attack";
import Trait from "./Trait";

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
            saveSlider: 50,
            advanced: false,
            name: "New CR 0 Monster"
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
        this.targetMultipliers = {
            "At Will; One Target": 1,
            "At Will; Multipe Targets": 0.5,
            "Limited Use; One Target": 4,
            "Limited Use; Multipe Targets": 2
        }
    }

    handleChange = (e) => {
        const { name, value, id } = e.target;
        if (id) {
            const monster = {...this.state.monster}
            if (this.multipliers.hasOwnProperty(id)) {
                let addition = Math.ceil(((value - 50) * this.multipliers[id] / 50) * monster.baseStats[id])
                const current = monster.stats[id] 
                monster.stats[id] = monster.baseStats[id] + addition
                if (id === "damage") { 
                    monster.damageRemaining += (monster.stats[id] - current)
                    monster.attacks.forEach(attack => {
                        const damage = attack.damage
                        const multiplier = this.targetMultipliers[attack.targets]
                        const base = damage / multiplier
                        attack.damageSlider = (base / (monster.damageRemaining + base)) * 100
                    })
                }
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
        else if (name === "challenge") {
            this.setState({
                name: `New CR ${value} Monster`
            })
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
                monster: monster
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

    handleAdvanced = () => {
        this.setState({ advanced: true })
    }

    handleUnAdvanced = () => {
        this.setState({ advanced: false })
    }

    handleAttackChange = (e) => {
        let { name, value } = e.target;
        const splitName = name.split("-")
        const index = parseInt(splitName[0])
        name = splitName[1]

        const monster = {...this.state.monster};
        const initial = monster.attacks[index][name]
        let damageRemaining = monster.damageRemaining
        monster.attacks[index][name] = value;

        /* 
        Need to make damage sliders responsive to changes in damage remaining whether from another attack or from base damage increasing
        */

        if (name === "damageSlider") {
            const multiplier = this.targetMultipliers[monster.attacks[index].targets]
            const current = monster.attacks[index].damage
            const base = current / multiplier
            const max = base + damageRemaining
            const percent = value / 100
            const damage = max * percent
            monster.damageRemaining = damageRemaining + base - damage
            monster.attacks.forEach((attack, i) => {
                if (i !== index) {
                    const damage = attack.damage
                    const multiplier = this.targetMultipliers[attack.targets]
                    const base = damage / multiplier
                    attack.damageSlider = (base / (monster.damageRemaining + base)) * 100
                }
            })
            monster.attacks[index].damage = damage * multiplier
        }

        if (name === "targets") {
            const multiplier = this.targetMultipliers[value]
            const current = monster.attacks[index].damage
            const base = current / this.targetMultipliers[initial]
            const damage = base * multiplier
            monster.attacks[index].damage = damage
        }

        this.setState({ 
            monster: monster
        })
    }

    handleAddAttack = () => {
        const attack = {
            name: "Attack",
            type: "attack",
            targets: "At Will; One Target",
            dc: this.state.monster.stats.dc,
            attack: this.state.monster.stats.attack,
            damage: 0,
            damageSlider: 0,
            description: "Description..."
        }
        const monster = {...this.state.monster}
        monster.attacks.push(attack)
        this.setState({
            monster: monster
        })
    }

    handleAddTrait = () => {
        const trait = {
            name: "Trait",
            description: "Description..."
        }
        const monster = { ...this.state.monster }
        monster.traits.push(trait)
        this.setState({
            monster: monster
        })
    }

    handleTraitChange = (e) => {
        let { name, value } = e.target;
        const splitName = name.split("-")
        const index = parseInt(splitName[0])
        name = splitName[1]

        const monster = { ...this.state.monster };
        monster.traits[index][name] = value;

        this.setState({
            monster: monster
        })
    }

    render() {
        const inputStyle = { 
            textAlign: "center", 
            padding: 5, 
            margin: 10 
        }

        const nameStyle = {
            ...inputStyle,
            backgroundColor: "transparent", 
            fontFamily: "'Oswald', sans serif", 
            fontSize: 18, 
            fontWeight: 700, 
            color: theme.white
        }
        const monster = this.state.monster ? {...this.state.monster} : null
        if (monster) {
            const stats = Object.keys(monster.stats).map((key) => {
                return (
                    <div>
                        <h3 key={key}><strong>{key.toUpperCase()}: </strong>{monster.stats[key]}</h3>
                        <input onChange={this.handleChange} type="range" key={key + "Slider"} name={key + "Slider"} id={key} value={this.state[key + "Slider"]} />
                        <p>{this.descriptions[key]}</p>
                    </div>
                )
            })
            if (this.state.advanced) {
                return (
                    <Box width={600}>
                        <input style={{ ...nameStyle, gridColumn: "1 / span 2" }} onChange={this.handleChange} value={this.state.name} name="name"></input>
                        <div style={{ gridColumn: "1 / span 1" }}>
                            {stats}
                        </div>
                        <div style={{ gridColumn: "2 / span 1" }}>
                            <h3>Attacks (Damage Pool Remaining: {Math.round(monster.damageRemaining)})</h3>
                            {monster.attacks.map((attack, i) => {
                                return <Attack onChange={this.handleAttackChange} {...attack} key={i} index={i}/>
                            })}
                            <Button onClick={this.handleAddAttack} plus={true} />
                            <h3>Traits</h3>
                            {monster.traits.map((trait, i) => {
                                return <Trait onChange={this.handleTraitChange} {...trait} key={i} index={i}/>
                            })}
                            <Button onClick={this.handleAddTrait} plus={true} />
                        </div>
                        <div style={{ gridColumn: "1 / span 2" }}>
                            <Button onClick={this.handleUnAdvanced}>Return to Basic Editor</Button>
                            <Button onClick={this.handleBack}>Back</Button>
                        </div>
                    </Box>
                )
            }
            return (
                <Box>
                    <input style={nameStyle} onChange={this.handleChange} value={this.state.name} name="name"></input>
                    {stats}
                    <Button onClick={this.handleAdvanced}>Advanced Editor</Button>
                    <Button onClick={this.handleBack}>Back</Button>
                </Box>
            )
        }
        return (
            <Box>
                <h2>Enter a Challenge Rating</h2>
                <p>This could be a positive whole number, 0, 1/8, 1/4, or 1/2</p>
                <input style={inputStyle} onChange={this.handleChange} id="challenge" name="challenge" value={this.state.challenge}></input>
                <p>Check out <a href="http://blogofholding.com/?p=7338" target="_blank" rel="noopener noreferrer">The Blog of Holding</a> or <a href="https://slyflourish.com/instant_npc_for_dnd_5e.html" target="_blank" rel="noopener noreferrer">Sly Flourish</a> for more information about how this system works. This project is not associated with either blog, just inspired by them.</p>
                <Button onClick={this.handleSubmit}>Submit</Button>
            </Box>
        )
    }
}

export default Builder
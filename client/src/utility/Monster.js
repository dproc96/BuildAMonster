class Monster {
    constructor(challenge) {
        const generalStats = {
            0: {
                ac: 12,
                hp: 3,
                attack: 2,
                damage: 1,
                dc: 9,
                save: 1
            },
            "1/8": {
                ac: 12,
                hp: 9,
                attack: 3,
                damage: 3,
                dc: 10,
                save: 2
            },
            "1/4": {
                ac: 13,
                hp: 15,
                attack: 3,
                damage: 5,
                dc: 10,
                save: 2
            },
            "1/2": {
                ac: 13,
                hp: 24,
                attack: 4,
                damage: 8,
                dc: 11,
                save: 3
            },
            1: {
                ac: 13,
                hp: 30,
                attack: 4,
                damage: 10,
                dc: 11,
                save: 3
            }
        }      
        if (generalStats.hasOwnProperty(challenge)) { this.stats = generalStats[challenge] }
        else {
            if (challenge < 8) {
                this.stats = {
                    ac: 13 + Math.floor(challenge * 0.5),
                    hp: 15 + (15 * challenge),
                    attack: 4 + Math.floor(challenge * 0.5),
                    damage: 5 + (5 * challenge),
                    dc: 11 + Math.floor(challenge * 0.5),
                    save: 3 + Math.floor(challenge * 0.5)
                }
            }
            else {
                this.stats = {
                    ac: 13 + Math.floor(challenge * 0.5),
                    hp: 15 * challenge,
                    attack: 4 + Math.floor(challenge * 0.5),
                    damage: 5 * challenge,
                    dc: 11 + Math.floor(challenge * 0.5),
                    save: 3 + Math.floor(challenge * 0.5)
                }
            }
        }  
        this.attacks = []
        this.traits = []
        this.damageRemaining = this.stats.damage
        this.baseStats = {...this.stats}
    }

    setDamageRemaining = (value, ignoreIndex=-1) => {
        const multipliers = {
            "At Will; One Target": 1,
            "At Will; Multipe Targets": 0.5,
            "Limited Use; One Target": 4,
            "Limited Use; Multipe Targets": 2
        }
        this.damageRemaining = value
        console.log(this)
        this.attacks.forEach((attack, i) => {
            if (i !== ignoreIndex) {
                const damage = attack.damage
                const multiplier = multipliers[attack.targets]
                const base = damage / multiplier
                attack.damageSlider = base / value
            }
        })
    }
}

export default Monster
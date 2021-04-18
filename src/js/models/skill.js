import ProgressBar from "./progressBar";

class Skill {
    get xp() {
        return this._xp;
    }
    set xp(value) {
        this._xp = value;
    }

    getLeftRealXP() {
        return this.xp * this.hardnessMultiplier;
    }

    getNextLevelRealXP() {
        return this._nextXp*this.hardnessMultiplier;
    }

    get level() {
        return this._level;
    }

    /**
     * @param phaserContext: Phaser
     * @param name: string
     * @param hardnessMultiplier
     * @param positionX: number
     * @param positionY: number
     * @param xp?: number
     * @param lastUpdate?: Date
     */
    constructor(phaserContext, name, hardnessMultiplier, positionX, positionY, xp = 0, lastUpdate = new Date()) {
        this._phaserContext = phaserContext;
        this._name = name;
        this._progressBar = new ProgressBar(this._phaserContext, 30, 200, positionX, positionY, 0, this._name);
        this._label = this._phaserContext.add.text(positionX, positionY+30, "X", { font: "15px Arial", fill: "#ffffff", align: "left" });

        this._earnings = new Money();

        this._lastUpdate = lastUpdate;
        this.xp = xp;

        this.hardnessMultiplier = hardnessMultiplier;

        // current level
        this._level = Skill.calculateLevelFromXp(xp);
        // exp needed for the next level
        this.currentLevelXp = Skill.calculateXpFromLevel(this.level);
        this._nextXp = Skill.calculateXpFromLevel(this.level+1);
    }

    triggerUpdate(nowDate, speedMultiplier) {
        const ms = Math.abs(nowDate - this._lastUpdate);

        this.xp = Skill.xpFormulaByMsOffset(this.xp, ms, 1/this.hardnessMultiplier*speedMultiplier);

        this.updateEarningsByMsOffset(ms);

        if(this.xp >= this._nextXp) {
            this._level = Skill.calculateLevelFromXp(this.xp);
            this.currentLevelXp = this._nextXp;
            this._nextXp = Skill.calculateXpFromLevel(this.level+1);
            console.log(this.xp, this.level);
        }

        this._updateGraphics();

        this._lastUpdate = nowDate;
    }



    _updateGraphics() {
        this._progressBar.progress = (this.xp-this.currentLevelXp)/(this._nextXp-this.currentLevelXp);
        this._label.setText([this._name,'Skill level:'+ this.level]);
    }

    transferProfit(wallet) {
        this._earnings.transferAllMoney(wallet);
    }

    static xpFormulaByMsOffset(actualExp, msOffset, speedBonus = 1) {
        return actualExp + (msOffset/1000)*speedBonus;
    }

    updateEarningsByMsOffset(msOffset) {
        this._earnings.setValue(
            Currency.COPPER,
            this._earnings.getValue(Currency.COPPER) + this.level * msOffset * this.hardnessMultiplier
        );
    }

    static calculateLevelFromXp(exp) {
        return Math.floor(2*Math.log((exp+10)/10));
    }

    static calculateXpFromLevel(level) {
        if(level === 0) return 0;
        return 10*Math.exp(level/2)-10;
    }

}

export default Skill;

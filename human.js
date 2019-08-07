class Human {

    constructor(name) {
        this.name = name;
        this.age = 0;
        this.calculateAgeOfDeath();
        this.dead = false;
        this.x = Math.floor(Math.random() * (canvas.width + 1));
        this.y = Math.floor(Math.random() * (canvas.height + 1));
        this.xDest = Math.floor(Math.random() * (canvas.width + 1));
        this.yDest = Math.floor(Math.random() * (canvas.height + 1));
    }

    calculateAgeOfDeath(){
        this.ageOfDeath = Math.round(this.randn_bm(0,120,0.75));
    }

    isChild(){
        return this.age < 18
    }

    randn_bm(min, max, skew) {
        var u = 0, v = 0;
        while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

        num = num / 10.0 + 0.5; // Translate to 0 -> 1
        if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
        num = Math.pow(num, skew); // Skew
        num *= max - min; // Stretch to fill range
        num += min; // offset to min
        return num;
    }

    setAge(newAge) {
        this.age = newAge;
        this.calculateAgeOfDeath();
    }

    age1Year(){
        if(!this.dead){
            this.age++;
            if(this.age == this.ageOfDeath){
                this.dead = true;
            }
        }
    }

    reproduceWith(other) {
        let children = [];
        if (!this.isSameGenderAs(other)) {
            let ageOfWoman = this.gender ? this.age : other.age;
            let n = Math.random(); //got pregnant?
            if (n <= ProbabilityCalculator.probabilityOfPregnancyByAge(ageOfWoman)) {
                n = Math.random(); //is it more than one?
                if (n <= ProbabilityCalculator.PROBABILITY_OF_TWINS) {
                    //it's twins
                    n = Math.random(); //is it identical twins?
                    if (n <= ProbabilityCalculator.PROBABILITY_OF_IDENTICAL_TWINS) {
                        //it's identical twins
                        children.push(HumanGenerator.generateBabyTwins(this, other));
                    } else {
                        //it's not identical twins
                        children.push(HumanGenerator.generateBaby(this, other));
                        children.push(HumanGenerator.generateBaby(this, other));
                    }
                } else {
                    //it's just one baby
                    children.push(HumanGenerator.generateBaby(this, other));
                }
            }
        }
        return children;
    }

    isSameGenderAs(other) {
        return this.gender == other.gender;
    }

    toString() {
        let ageStr;
        if(this.age<=5){
            ageStr = "baby "+(this.gender?"girl":"boy");
        }else if(this.age<=11){
            ageStr = (this.gender?"girl":"boy");
        }else if(this.age<=18){
            ageStr = "teenage "+(this.gender?"girl":"boy");
        }else if(this.age<=25){
            ageStr = "young "+(this.gender?"lady":"man");
        }else {
            ageStr = (this.gender?"woman":"man");
        }

        if(this.age>0){
            ageStr += "("+this.age+")";
        }
        return "["+this.name+" - "+ageStr+" - "+this.eyeColor+ " eyes] "+(this.dead?"(dead)":"(will die at "+this.ageOfDeath+")");
    }
}

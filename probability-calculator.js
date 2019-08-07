const PROBABILITY_OF_TWINS = 0.004;
const PROBABILITY_OF_IDENTICAL_TWINS = 0.001333;

class ProbabilityCalculator {

    static probabilityOfPregnancyByAge(ageOfWoman) {
        if(ageOfWoman>=18 && ageOfWoman<=24){
            return 0.86;
        }else if(ageOfWoman <= 29){
            return 0.78;
        }else if(ageOfWoman <= 34){
            return 0.63;
        }else if(ageOfWoman <= 39){
            return 0.52;
        }else if(ageOfWoman <= 44){
            return 0.36;
        }else if(ageOfWoman <= 49){
            return 0.05;
        }else return 0;
    }

    static getBabyEyeColor(human1, human2) {
        let eyeColor = null;
        let n = Math.random();
        if(human1.eyeColor== "BROWN" && human2.eyeColor=="BROWN"){
            if(n<=0.07){
                eyeColor = "GREEN";
            }else if(n<=0.19){
                eyeColor = "BLUE";
            }else eyeColor = "BROWN";
        }else if((human1.eyeColor== "BROWN" && human2.eyeColor=="BLUE") || (human1.eyeColor== "BLUE" && human2.eyeColor=="BROWN")){
            if(n<=0.5) {
                eyeColor = "BLUE";
            }else eyeColor = "BROWN";
        }else if((human1.eyeColor== "BROWN" && human2.eyeColor=="GREEN") || (human1.eyeColor== "GREEN" && human2.eyeColor=="BROWN")){
            if(n<=0.12){
                eyeColor = "BLUE";
            }else if(n<=0.38){
                eyeColor = "GREEN";
            }else eyeColor = "BROWN";
        }else if(human1.eyeColor== "BLUE" && human2.eyeColor=="BLUE"){
            if(n<=0.01) {
                eyeColor = "BLUE";
            }else eyeColor = "GREEN";
        }else if((human1.eyeColor== "GREEN" && human2.eyeColor=="BLUE") || (human1.eyeColor== "BLUE" && human2.eyeColor=="GREEN")){
            if(n<=0.5) {
                eyeColor = "BLUE";
            }else eyeColor = "GREEN";
        }else if(human1.eyeColor== "GREEN" && human2.eyeColor=="GREEN"){
            if(n<=0.25) {
                eyeColor = "BLUE";
            }else eyeColor = "GREEN";
        }
        return eyeColor;
    }

    static getGender() {
        let n = Math.random();
        if(n<=0.5){
            return true;
        }else return false;
    }

    static getAdultAge() {
        return Math.round(Math.round(((45 - 18 + 1) * Math.random()) + 18));
    }
}
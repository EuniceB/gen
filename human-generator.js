const eyeColors = ["BLUE", "BROWN", "GREEN"];

class HumanGenerator {
    static generateBabyTwins(human1, human2) {
        let newName2 = NameGenerator.generateName();
        let baby1 = generateBaby(human1, human2);
        let baby2 = new Human(newName2);
        baby2.eyeColor = baby1.eyeColor;
        baby2.gender = baby1.gender;
        return [baby1,baby2];
    }

    static generateBaby(human1, human2) {
        let newName = NameGenerator.generateName();
        let eyeColor = ProbabilityCalculator.getBabyEyeColor(human1, human2);
        let gender = ProbabilityCalculator.getGender();
        let baby = new Human(newName);
        baby.eyeColor = eyeColor;
        baby.gender = gender;
        return baby;
    }

    static generateAdult(isWoman) {
        let newName = NameGenerator.generateName();
        let eyeColor = eyeColors[Math.round(Math.round((Math.random()* (eyeColors.length-1))))];
        let adult = new Human(newName);
        adult.eyeColor = eyeColor;
        adult.gender = isWoman;
        adult.setAge(ProbabilityCalculator.getAdultAge());
        return adult;
    }

}

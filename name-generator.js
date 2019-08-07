class NameGenerator{
    static generateName(){
        const vowels = ['A','E','I','O','U','Y'];
        const consonants = ['B','C','D','F','G', 'H', 'J', 'K', 'L', 'M', 'N','P','Q','R','S','T','V','W','X','Z'];
        let n = Math.random();
        let length;
        if(n<0.5){
            length = 4;
        }else{
            length = 6;
        }
        let isItVowelsTurn = false;
        let str = "";
        for(let i=0;i<length;i++){
            if(isItVowelsTurn){
                let rVowels = Math.round(Math.round(Math.random()*(vowels.length-1)));
                str += vowels[rVowels];
            }else{
                let rConsonants = Math.round(Math.round(Math.random()*(consonants.length-1)));
                str += consonants[rConsonants];
            }
            isItVowelsTurn = !isItVowelsTurn;
        }
        return str.substring(0,1)+str.substring(1).toLowerCase();
    }
}
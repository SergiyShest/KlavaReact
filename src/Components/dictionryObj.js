import { WordSet, Dicti } from "./dictionry.js";

export class wordDictionry {

    constructor(json = null) {
        if (json == null) {
            this.wordSets = GetDefaultWordSets(); 
            this.Name = "KvaziText";
            this.Sentations=GetDefaultSentations()
        }
        else {
            this.wordSets =json.wordSets; 
            this.Name = json.Name;
            this.Sentations=json.Sentations
        }
    }

}

export class wordSet {

    constructor(json = null) {
        if (json == null) {
            this.words = []; 
            this.Name = "";
            this.Description = "";
        }
        else {
            this.words = json.words; 
            this.Name = json.Name;
            this.Description = "";
        }
    }
}


export class Word {

    constructor(word) {
            this.word = word; 
            this.Enabled = true;
            this.Description = "";
    }
}

function  GetDefaultWordSets() {
var wordSets=[];
var names = Object.getOwnPropertyNames(Dicti); 
names.forEach(item => {
    let vs= new wordSet();
    vs.Name = item;
    var words = Dicti[item];
  words.forEach(word=> { 

  vs.words.push(new  Word(word));
});
    wordSets.push(vs);   
});

}

function GetDefaultSentations(){
    return []
}
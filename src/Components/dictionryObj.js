import { Dicti } from "./dictionry.js";

export class wordDictionry {
    constructor(json = null) {
        if (json == null) {
            this.wordSets = GetDefaultWordSets();
            this.Name = "KvaziText";
            this.Sentations = GetDefaultSentations()
        }
        else {
            this.wordSets = json.wordSets;
            this.Name = json.Name;
            this.Sentations = json.Sentations
        }
    }

    getSentation() {
        var sentTemplate = this.Sentations[0];
        var sent = '';
        sentTemplate.template.forEach(item => { sent += ' ' + this.getWord(item); });
        return sent;
    }
    //get word by wordSet name
    getWord(vsName) {

        var wordSet = this.wordSets.find((ws) => { return ws.Name === vsName });
        if (typeof wordSet == 'undefined') { return vsName; }
        else {
            return wordSet.getWord();
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
         this. _wordArray = null;
    }
    get wordArray() {
        if (this._wordArray == null) {
            this._wordArray = [];
            this.words.forEach(w => { if (w.Enabled) this._wordArray.push(w.word); });
            shuffleArray(this._wordArray);
        }
        return this._wordArray;
    }

    getWord() {
        return WordEx(this.wordArray)
    }

}


class Word {

    constructor(word) {
        this.word = word;
        this.Enabled = true;
        this.Description = "";
    }
}

export class SentationTemplate {

    constructor(name) {
        this.Name = name;
        this.Enabled = true;
        this.Description = "";
        this.template = [];
    }

}


export function GetDefaultWordSets() {
    var wordSets = [];
    var names = Object.getOwnPropertyNames(Dicti);
    names.forEach(item => {
        let vs = new wordSet();
        vs.Name = item;
        switch (vs.Name) {
            case 'Actors': vs.Text = "Действующее лицо"; break;
            case 'ActorsWomen': vs.Text = "Действующее лицо ж. р."; break;
            case 'Adjectives': vs.Text = "Прилагательное м. р."; break;
            case 'AdjectivesW': vs.Text = "Прилагательное ж. р."; break;
            case 'AddVerbs': vs.Text = "Наречие"; break;
            case 'Verb': vs.Text = "Глагол м. р ед числа"; break;
            case 'Verbs': vs.Text = "Глагол мн числа"; break;
            case 'VerbW': vs.Text = "Глагол ж р ед числа"; break;
            case 'PlasesIn': vs.Text = "Место в"; break;
            case 'PlasesOn': vs.Text = "Место на"; break;
            case 'PlasesUnder': vs.Text = "Место под"; break;

        }

        var words = Dicti[item];
        words.forEach(word => {

            vs.words.push(new Word(word));
        });
        wordSets.push(vs);

    });

    return wordSets;
}



function GetDefaultSentations() {

    var sentations = [];

    var sent = new SentationTemplate('простейшее предложение')
    sent.template = ['Adjectives', 'Actors', 'AddVerbs', 'Verb']
    sentations.push(sent);

    var sent = new SentationTemplate('простейшее предложение 2');
    sent.template = ['Adjectives', 'и', 'Adjectives', 'Actors', 'AddVerbs', 'Verb']
    sentations.push(sent);
    return sentations;

}
//получение случайного слова из массива 
//перемешивание осуществляется каждый раз по достиженни конца массива
export function WordEx(arrey) {
    var counerNam = "_counter";
    var word = '';

    if (!arrey[counerNam]) { arrey[counerNam] = 0 }//add property counter and  set counter=0 first time
    if (arrey[counerNam] == 0) {
        shuffleArray(arrey);//
        // console.log('shuffled ' + dictName +'='+Dicti[counerNam]);
    }
    word = arrey[arrey[counerNam]];
    arrey[counerNam]++;//incriment couner
    if (arrey[counerNam] == arrey.length) {//if counrer reach end of array
        arrey[counerNam] = 0;
    }
    return word;
}
//перемешивание массива
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];//store last elem array
        array[i] = array[j];//copy ramdom elem in last
        array[j] = temp;//set ramdom elem stored value
    }
}
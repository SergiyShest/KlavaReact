import {GetDefaultWordSets, wordDictionry } from '../components/dictionryObj.js';



describe('Dictionry tests', () => {
    it('Description should created correctly', () => {

      var wDictionry = new wordDictionry();
         wDictionry.wordSets.forEach(ws => {
     //       console.log(`${ws.Name}--${ws.Text}`);
            expect(ws.Text==null).toBe(false);
        });

    });

    it('Description should created correctly', () => {

      var wDictionry = new wordDictionry();
      var sent=   wDictionry.getSentation();
        console.log(sent);
    });
});

describe('WordSet tests', () => {
  it('wordSet mast giv words random', () => {

    var wDictionry = new wordDictionry();
    var ws=  wDictionry.wordSets[0];
     var word= ws.getWord()
    

  });


});
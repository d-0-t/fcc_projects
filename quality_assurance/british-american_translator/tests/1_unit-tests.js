const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  suite('To British English', () => {
    let american = [
      "Mangoes are my favorite fruit.",
      "I ate yogurt for breakfast.",
      "We had a party at my friend's condo.",
      "Can you toss this in the trashcan for me?",
      "The parking lot was full.",
      "Like a high tech Rube Goldberg machine.",
      "To play hooky means to skip class or work.",
      "No Mr. Bond, I expect you to die.",
      "Dr. Grosh will see you now.",
      "Lunch is at 12:15 today."
    ]
    let british = [
      "Mangoes are my favourite fruit.",
      "I ate yoghurt for breakfast.",
      "We had a party at my friend's flat.",
      "Can you toss this in the bin for me?",
      "The car park was full.",
      "Like a high tech Heath Robinson device.",
      "To bunk off means to skip class or work.",
      "No Mr Bond, I expect you to die.",
      "Dr Grosh will see you now.",
      "Lunch is at 12.15 today."
    ]
    for (let x = 0; x < 10; x++) {
      test(american[x], function (done) {
        let translatedText = translator.toBritish(american[x]);
        assert.equal(translatedText.nonFormatted,british[x]);
        done();
      });  
    }
  });
  suite('To American English', () => {
    let british = [
      "We watched the footie match for a while.",
      "Paracetamol takes up to an hour to work.",
      "First, caramelise the onions.",
      "I spent the bank holiday at the funfair.",
      "I had a bicky then went to the chippy.",
      "I've just got bits and bobs in my bum bag.",
      "The car boot sale at Boxted Airfield was called off.",
      "Have you met Mrs Kalyani?",
      "Prof Joyner of King's College, London.",
      "Tea time is usually around 4 or 4.30."
    ]
    let american = [
      "We watched the soccer match for a while.",
      "Tylenol takes up to an hour to work.",
      "First, caramelize the onions.",
      "I spent the public holiday at the carnival.",
      "I had a cookie then went to the fish-and-chip shop.",
      "I've just got odds and ends in my fanny pack.",
      "The swap meet at Boxted Airfield was called off.",
      "Have you met Mrs. Kalyani?",
      "Prof. Joyner of King's College, London.",
      "Tea time is usually around 4 or 4:30."
    ]
    for (let x = 0; x < 10; x++) {
      test(british[x], function (done) {
        let translatedText = translator.toAmerican(british[x]);
        assert.equal(translatedText.nonFormatted,american[x]);
        done();
      });  
    }
  });
  suite('Highlighting translation', () => {
    let americanToBritish = [[
      "Mangoes are my favorite fruit.",
      "I ate yogurt for breakfast."
    ],[
      'Mangoes are my <span class="highlight">favourite</span> fruit.',
      'I ate <span class="highlight">yoghurt</span> for breakfast.'
    ]]
    let britishToAmerican = [[
      "We watched the footie match for a while.",
      "Paracetamol takes up to an hour to work."
    ],[
      'We watched the <span class="highlight">soccer</span> match for a while.',
      '<span class="highlight">Tylenol</span> takes up to an hour to work.'
    ]]
    for (let x = 0; x < 2; x++) {
      test(americanToBritish[0][x], function (done) {
        let translatedText = translator.toBritish(americanToBritish[0][x]);
        assert.equal(translatedText.formatted,americanToBritish[1][x]);
        done();
      });  
    }
    for (let x = 0; x < 2; x++) {
      test(britishToAmerican[0][x], function (done) {
        let translatedText = translator.toAmerican(britishToAmerican[0][x]);
        assert.equal(translatedText.formatted,britishToAmerican[1][x]);
        done();
      });  
    }
  });
});

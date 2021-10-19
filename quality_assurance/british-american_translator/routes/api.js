'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let { text, locale } = req.body;
      
      if (text === "") {
        res.json({ error: "No text to translate" });
        return 0;
      }
      if (!text || !locale) {
        res.json({ error: "Required field(s) missing" });
        return 0;
      }
      
      let translation = "";
      if (locale == "american-to-british") {
        translation = translator.toBritish(text);
      } else if (locale == "british-to-american") {
        translation = translator.toAmerican(text);
      } else {
        res.json({ error: "Invalid value for locale field" });
        return 0;
      }
      
      if (translation.formatted === text) {
        res.json({ text: text, translation: "Everything looks good to me!" });
        return 0;
      }
      
      if(translation.lowNonFormatted === translation.lowOriginal && typeof translation !== "object") {
        res.json({ text: text, translation: translation });
        return 0;
      }
      res.json({ text: text, translation: translation.formatted });
    });
};

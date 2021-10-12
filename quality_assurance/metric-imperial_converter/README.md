# Metric/Imperial Converter

Click here for the working [[DEMO]](https://replit.com/@d-0-t/MetricImperial-Converter) as well as the files/code I did not upload here (the ones fcc provided and I did no modifications whatsoever, but you can download the whole thing as a zip).

If you want to fork the project and try the tests on your own platform / computer, you'll have to add **NODE_ENV=test** to your replit secrets / .env file to enable them (it's in the sample.env but commented out because replit does not use env files).

## Description

This simple app will convert between a few metric/imperial units and will return a string with the answer, as well as a JSON object containing the detailed result.

The valid input contains no spaces and no special characters, only uses the defined units. The numbers can be integers and simple fractions.

I understand it'd be much better if we'd enforce the correct input by specialized fields, but I could not do that because of freecodecamp's testing. I often have this problem with fcc projects - that it could be better, but due to bot testing, we have no choice but to comply to user stories, etc. :-)

### Valid input characters
- Numbers 0-9,
- dot (.) for decimals,
- slash (/) for fractions,
- letters for units.

### Valid unit inputs:
- L, gal
- km, mi
- kg, lbs

### Valid number inputs:
- Integers: 2, 13, 42, ...
- Decimals: 2.5, 1.33333, ...
- Fractions: 2/5, 2.5/6, 2.5/10.3, ...

### Example usage
    /api/convert?input=4gal
    /api/convert?input=1/2km
    /api/convert?input=5.4/3lbs
    /api/convert?input=kg
    
### Example return
    { initNum: 3.1, initUnit: 'mi', returnNum: 4.98895, returnUnit: 'km', string: '3.1 miles converts to 4.98895 kilometers' }

import * as fuzzysort from 'fuzzysort'

test('test fuzzy sort', ()=>{
   const testInput = [
      'aOcsMobileICCardImage', 
      'aOcsMobileICCardImageWithSuffix',
      'aOcsMobileICCardImageWithALongerSuffix',
   ];

   const sortResults = fuzzysort.go('aocsmobileiccardimage', testInput);
   console.log(sortResults);
});
(function (message) {
  const superHero = "Batman";
  console.log(message, superHero);
})("Hello");

(function (message) {
  const superHero = "Superman";
  console.log(message, superHero);
})("Hey");

/*
  module wrapper
  
  (function(exports, require, module, __filename, __dirname) {
    const superHero = "Batman";
    console.log(superHero);
  })

*/

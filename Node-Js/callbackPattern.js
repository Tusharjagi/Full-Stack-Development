function greet(name) {
  console.log(`Hello ${name}`);
}

function higherOrderFunction(callback) {
  const name = "Tushar";
  callback(name);
}

higherOrderFunction(greet);

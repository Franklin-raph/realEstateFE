let number = 40871935;

// Format as currency (assuming USD in this example)
let formattedCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(number);

console.log(formattedCurrency);

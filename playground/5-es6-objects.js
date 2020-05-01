const name = 'Andrew';
const ageNumber= 27;

const user = {
    name,
    age: ageNumber,
    location: 'Philadelphia'
};

console.log(user);

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
};

const { label:productLabel, stock, rating = 5 } = product;

console.log(productLabel);
console.log(stock);
console.log(rating);
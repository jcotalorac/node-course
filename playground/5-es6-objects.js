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

const { label, stock } = product;

console.log(label);
console.log(stock);
const first = [1,2,3,4];
const second  = first.splice(2,2);
const third = first.splice(1,1);

console.log([first, second, third]); // [[1, 4], [3], [2]
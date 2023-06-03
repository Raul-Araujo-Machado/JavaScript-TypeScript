var jsonStr = '{"nome": "João", "idade": 30, "cidade": "São Paulo"}';
var obj = JSON.parse(jsonStr);

console.log(obj.nome);   // Output: João
console.log(obj.idade);  // Output: 30
console.log(obj.cidade); // Output: São Paulo
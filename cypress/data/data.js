const faker = require('faker-br');


const dadosPessoais = {
  nome: faker.name.firstName(),
  sobrenome:faker.name.lastName(),
  dataNascimento: '13/07/1986',
  cpf: faker.br.cpf(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  cpfInvalido: '77777777777',
  cpfUsado: '762.826.786-68',
  cpfIncompleto: '762.826.786',	
  emailInvalido: 'teste.com',

}
const endereco = {
  cep: faker.address.zipCode(),
  numero: faker.random.number(),
  //pais: faker.address.country(),
  complemento: faker.address.secondaryAddress(),
  cidade: faker.address.city(),
  estado: faker.address.stateAbbr(),
  bairro: faker.address.streetName(),
  rua: faker.address.streetName(),
  cepInvalido: '12345678',

}


module.exports = {
  dadosPessoais, endereco
}
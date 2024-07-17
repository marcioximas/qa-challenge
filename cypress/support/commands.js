const faker = require('faker-br') 

Cypress.Commands.add('visitaCadastroPage', () => {
    cy.visit('/18/cadastro/') 
  }) 
  Cypress.Commands.add('clicaBotaoFazerInscricao', () => {
    cy.get('#btn-enroll').click()
 
})

  Cypress.Commands.add('preencheDadosFormularioCadastro', (dadosCadastro) => {
    cy.get('#signup-personal-data-firstName').type(dadosCadastro.nome) 
    cy.get('#signup-personal-data-lastName').type(dadosCadastro.sobrenome) 
    cy.get('#signup-personal-data-birthDate').type(dadosCadastro.dataNascimento) 
    cy.get('#signup-personal-data-cpf').type(dadosCadastro.cpf)
    cy.get('#signup-personal-data-email').type(dadosCadastro.email) 
    cy.get('#signup-personal-data-email-confirm').type(dadosCadastro.email) 
    cy.get('#signup-personal-data-password').type(dadosCadastro.password) 
    cy.get('#signup-personal-data-password-confirm').type(dadosCadastro.password) 
    cy.get('#signup-personal-data-lgpd').check() 
  }) 


  Cypress.Commands.add('selecionaNivelIngles', () => {
    const englishLevels = ['Advanced', 'Intermediate', 'Beginner'] 
    const randomIndex = Math.floor(Math.random() * englishLevels.length) 
  //  cy.get('#signup-personal-data-englishLevel').type(randomIndex) 
    cy.get('button[aria-controls="dropdown-button-1"]').click()  
    cy.get('span').contains(englishLevels[randomIndex]).click() 
 
  })
  Cypress.Commands.add('generateValidCEP', () => {
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min 
    const cepPart1 = getRandomInt(10000, 99999) 
    const cepPart2 = getRandomInt(0, 999) 
    const formattedCepPart2 = cepPart2.toString().padStart(3, '0') 
    return `${cepPart1}-${formattedCepPart2}` 
  })

  Cypress.Commands.add('preencherEndereco', (endereco) => {
   
    //cy.get('#signup-address-country').type(endereco.pais) 
   // cy.get('#signup-address-state').type(endereco.estado) 
    //cy.get('#signup-address-city').type(endereco.cidade) 
      cy.get('#signup-address-street').type(endereco.rua) 
    cy.get('#signup-address-number').type(endereco.numero) 
    cy.get('#signup-address-complement').type(endereco.complemento) 
    //cy.get('#signup-address-neighborhood').type(endereco.bairro) 
 
  })
  Cypress.Commands.add('geracepValido', () => {
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min  
    const cepPart1 = getRandomInt(73752,73752)   
    const cepPart2 = getRandomInt(651, 660)  
    const formattedCepPart2 = cepPart2.toString().padStart(3, '0')  
    return `${cepPart1}-${formattedCepPart2}`  
  }) 
  Cypress.Commands.add('validaMensangemDeErro', (fieldSelector, validationMessage) => {
    cy.get(fieldSelector).clear()  
    cy.get('button[id*="signup_submit"]').eq(0).click({force: true})  
    cy.get(`${fieldSelector}:invalid`)
      .should('have.length', 1)
      .then(($el) => {
        const message = $el[0].validationMessage  
        expect(message).to.eq(validationMessage)  
      })
    })
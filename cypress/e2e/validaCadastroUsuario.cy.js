describe('Validar formulario de cadastro', () => {

  const { dadosPessoais } = require('/cypress/data/data.js');
  const { endereco } = require('/cypress/data/data.js');
  beforeEach(() => {
    cy.visitaCadastroPage()
  })

  it('Valida cadastro com sucesso', () => {
    cy.clicaBotaoFazerInscricao()
    cy.log(dadosPessoais.dadaNascimento)
    cy.preencheDadosFormularioCadastro(dadosPessoais)
    cy.selecionaNivelIngles()
    cy.get('#signup_submit_button_1').click()
    cy.get('h2').contains('Endereço').should('exist');
    cy.geracepValido().then((cep) => {
      cy.wrap(cep).should('be.a', 'string');
      cy.get('#signup-address-cep').type(cep);
    })
    cy.preencherEndereco(endereco)
    cy.get('#signup_submit_button_3').click()
    cy.get('h1').contains('Thank you for').should('exist');
  })
})

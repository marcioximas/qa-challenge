describe('Valida campos da pagina de cadastro', () => {
  const { dadosPessoais, endereco } = require('/cypress/data/data.js') 
  const MESSAGES = {
    required: 'Please fill out this field.',
    passwordsMismatch: 'As senhas não são iguais.',
    emailsMismatch: 'Os e-mails não são iguais.',
    checkBox: 'Please check this box if you want to proceed.',
    cpfInUse: 'Este CPF já está em uso.',
    invalidCpfFormat: 'Precisa corresponder ao formato esperado',
    invalidEmail: 'Email inválido.',
    invalidCep: 'CEP não encontrado.'
  } 

  const SELECTORS = {
    personalData: {
      nome: '#signup-personal-data-firstName',
      sobrenome: '#signup-personal-data-lastName',
      dataNascimento: '#signup-personal-data-birthDate',
      cpf: '#signup-personal-data-cpf',
      email: '#signup-personal-data-email',
      confirmEmail: '#signup-personal-data-email-confirm',
      password: '#signup-personal-data-password',
      confirmPassword: '#signup-personal-data-password-confirm',
      termosDeUso: '#signup-personal-data-lgpd',
      submitButton: '#signup_submit_button_1'
    },
    addressData: {
      cep: '#signup-address-cep',
      bairro: '#signup-address-neighborhood',
      endereco: '#signup-address-street',
      numero: '#signup-address-number',
      submitButton: '#signup_submit_button_3'
    },
    error: '.input-error',
    toastSuccess: 'ul.toasts-list > li.toast.toast-success.toast-number-0'
  } 

  beforeEach(() => {
    cy.visitaCadastroPage() 
    cy.clicaBotaoFazerInscricao() 
    cy.preencheDadosFormularioCadastro(dadosPessoais) 
  }) 

  const validateRequiredField = (selector) => {
    cy.validaMensangemDeErro(selector, MESSAGES.required) 
  } 

  const validateErrorMessage = (selector, message) => {
    cy.validaMensangemDeErro(selector, message) 
  } 

  it('Validar campos obrigatórios da tela Dados pessoais', () => {
    validateRequiredField(SELECTORS.personalData.nome) 
    validateRequiredField(SELECTORS.personalData.sobrenome) 
    validateRequiredField(SELECTORS.personalData.dataNascimento) 
    validateRequiredField(SELECTORS.personalData.cpf) 
    validateRequiredField(SELECTORS.personalData.email) 
    validateRequiredField(SELECTORS.personalData.password) 
  }) 

  it('Validar campo obrigatório Termos de Uso', () => {
   cy.get(SELECTORS.personalData.termosDeUso).uncheck() 
   cy.selecionaNivelIngles() 
   cy.get(SELECTORS.personalData.submitButton).click() 
   cy.get(`${SELECTORS.personalData.termosDeUso}:invalid`)
     .should('have.length', 1)
     .then(($el) => {
       const message = $el[0].validationMessage  
       expect(message).to.eq(MESSAGES.checkBox) 
     }) 
 }) 

  it('Validar mensagens de divergência', () => {
    validateErrorMessage(SELECTORS.personalData.confirmEmail, MESSAGES.emailsMismatch) 
    validateErrorMessage(SELECTORS.personalData.confirmPassword, MESSAGES.passwordsMismatch) 
  }) 

  it('Validar mensagem de CPF já utilizado', () => {
    cy.get(SELECTORS.personalData.cpf).clear().type(dadosPessoais.cpfUsado) 
    cy.get(SELECTORS.personalData.submitButton).click() 
    cy.get(SELECTORS.error).contains(MESSAGES.cpfInUse) 
  }) 

  it('Validar mensagem de CPF formato inválido', () => {
    cy.selecionaNivelIngles() 
    cy.get(SELECTORS.personalData.cpf).clear().type(dadosPessoais.cpfInvalido) 
    cy.get(SELECTORS.error).contains(MESSAGES.invalidCpfFormat) 
  }) 

  it('Validar mensagem de CPF incompleto', () => {
    cy.selecionaNivelIngles() 
    cy.get(SELECTORS.personalData.cpf).clear().type(dadosPessoais.cpfIncompleto) 
    cy.get(SELECTORS.personalData.submitButton).click() 
    cy.get(SELECTORS.error).contains(MESSAGES.invalidCpfFormat) 
  }) 

  it('Validar mensagem de email inválido', () => {
    cy.selecionaNivelIngles() 
    cy.get(SELECTORS.personalData.email).clear().type(dadosPessoais.emailInvalido) 
    cy.get(SELECTORS.personalData.submitButton).click() 
    cy.get(SELECTORS.error).contains(MESSAGES.invalidEmail) 
  }) 

  it('Validar mensagem de confirmação de email inválido', () => {
    cy.selecionaNivelIngles() 
    cy.get(SELECTORS.personalData.confirmEmail).clear().type(dadosPessoais.emailInvalido) 
    cy.get(SELECTORS.personalData.submitButton).click() 
    cy.get(SELECTORS.error).contains('Precisa ser email') 
  }) 

  it('Validar mensagem de CEP obrigatorio', () => {
    cy.selecionaNivelIngles() 
    cy.get(SELECTORS.personalData.submitButton).click() 
    cy.get(SELECTORS.addressData.submitButton).click()
    validateRequiredField(SELECTORS.addressData.cep) 
  }) 
  it('Validar mensagem de Bairro obrigatorio', () => {
   cy.selecionaNivelIngles() 
   cy.get(SELECTORS.personalData.submitButton).click() 
   cy.geracepValido().then((cep) => {
      cy.wrap(cep).should('be.a', 'string') 
      cy.get('#signup-address-cep').type(cep) 
    })
   cy.preencherEndereco(endereco) 
   cy.get(SELECTORS.addressData.bairro).clear()
   cy.get(SELECTORS.addressData.submitButton).click()
   validateRequiredField(SELECTORS.addressData.bairro) 
 }) 
 it('Validar mensagem de Endereco obrigatorio', () => {
   cy.selecionaNivelIngles() 
   cy.get(SELECTORS.personalData.submitButton).click() 
   cy.geracepValido().then((cep) => {
      cy.wrap(cep).should('be.a', 'string') 
      cy.get('#signup-address-cep').type(cep) 
    })
   cy.preencherEndereco(endereco) 
   cy.get(SELECTORS.addressData.endereco).clear()
   cy.get(SELECTORS.addressData.submitButton).click()
   validateRequiredField(SELECTORS.addressData.endereco)
 }) 
  it('Validar mensagem de CEP inválido', () => {
   cy.selecionaNivelIngles() 
   cy.get(SELECTORS.personalData.submitButton).click() 
   cy.preencherEndereco(endereco) 
   cy.get(SELECTORS.addressData.cep).clear().type(endereco.cepInvalido) 
   cy.get(SELECTORS.addressData.submitButton).click() 
   cy.get(SELECTORS.toastSuccess).should('have.text', MESSAGES.invalidCep) 
 }) 
}) 
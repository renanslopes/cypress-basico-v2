/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

  beforeEach(() => {
    cy.visit('./src/index.html');
  })

  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function () {
    cy.get('input[id="firstName"]').type("Renan", { delay: 0 })
    cy.get('input[id="lastName"]').type("Lopes")
    cy.get('input[id="email"]').type("renan@renan.com");
    cy.get('textarea[id="open-text-area"]').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", { delay: 0 });
    cy.get('button[class="button"]').click();
    cy.get('span[class="success"]').should('be.visible');
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.get('input[id="firstName"]').type("Renan", { delay: 0 })
    cy.get('input[id="lastName"]').type("Lopes")
    cy.get('input[id="email"]').type("renan-renan.com");
    cy.get('textarea[id="open-text-area"]').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", { delay: 0 });
    cy.get('button[class="button"]').click();
    cy.get('span[class="error"]').should('be.visible');
  })

  it('valida tentativa de escrita de letras no campo telefone', function () {
    cy.get('input[id="firstName"]').type("Renan")
    cy.get('input[id="lastName"]').type("Lopes")
    cy.get('input[id="email"]').type("renan@renan.com");
    cy.get('input[id="phone"]').type("renan").should('be.empty');
    cy.get('textarea[id="open-text-area"]').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", { delay: 0 });
    cy.get('button[class="button"]').click();
    // cy.get('span[class="error"]').should('be.visible');
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.get('input[id="firstName"]').type("Renan")
    cy.get('input[id="lastName"]').type("Lopes")
    cy.get('input[id="email"]').type("renan@renan.com")
    cy.get('input[id="phone-checkbox"]').check();
    // cy.get('input[id="phone"]').type("renan").should('be.empty');
    cy.get('textarea[id="open-text-area"]').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", { delay: 0 })
    cy.get('button[class="button"]').click();
    cy.get('span[class="error"]').should('be.visible');
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('input[id="firstName"]').type("Renan").clear().should('have.value', '')
    cy.get('input[id="lastName"]').type("Lopes").clear().should('have.value', '')
    cy.get('input[id="email"]').type("renan@renan.com").clear().should('have.value', '')
    // cy.get('input[id="phone-checkbox"]').check();
    cy.get('input[id="phone"]').type("21975848415").clear().should('have.value', '')
    cy.get('textarea[id="open-text-area"]').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", { delay: 0 }).clear().should('have.value', '')
    cy.get('button[class="button"]').click();
    cy.get('span[class="error"]').should('be.visible');
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {

    cy.get('button[class="button"]').click();
    cy.get('span[class="error"]').should('be.visible');
  })

  it('envia o formuário com sucesso usando um comando customizado', function () {
    cy.fillMandatoryFieldsAndSubmit()

  })

  it('testando o contains ao inves do cy.get', function () {
    cy.get('input[id="firstName"]').type("Renan", { delay: 0 })
    cy.get('input[id="lastName"]').type("Lopes")
    cy.get('input[id="email"]').type("renan@renan.com");
    cy.get('textarea[id="open-text-area"]').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", { delay: 0 });
    cy.contains('button[class="button"]', 'Enviar').click();
    cy.get('span[class="success"]').should('be.visible');

  })

  it('seleciona um produto (YouTube) por seu texto', function () {
    cy.get('select').select('YouTube').contains('YouTube')

  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function () {
    cy.get('select').select('Mentoria').should('have.value', 'mentoria')

  })

  it('seleciona um produto (Blog) por seu índice', function () {
    cy.get('select').select(1).should('have.value', 'blog')

  })

  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[name="atendimento-tat"]').check()

  })

  it('marca cada tipo de atendimento', function () {
    cy.get('input[value="ajuda"]').check().should('be.checked')
    cy.get('input[value="elogio"]').check().should('be.checked')
    cy.get('input[value="feedback"]').check().should('be.checked')

  })

  it('marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"]').check().should('be.checked')
    cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked')


  })

  it('seleciona um arquivo da pasta fixtures', function () {
    cy.get('input[type="file"]').selectFile("cypress/fixtures/example.json")
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('input[type="file"]').selectFile("cypress/fixtures/example.json", { action: 'drag-drop' })
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.json', { enconding: null }).as('exampleFile')
    cy.get('input[type="file"]')
      .selectFile({
        contents: '@exampleFile',
        fileName: 'example.json'
      })
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')

  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.get('#title').should("be.visible")
  })

  it('testa a página da política de privacidade de forma independente', function () {
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
  })





})

/// <reference types="cypress-e2e" />

let usuarios;
let tagInfo;
describe('Tag', () => {

  before(() => {
    cy.fixture('users').then(users => {
      usuarios = users;
    });
	cy.fixture('tag').then((tag) => {
		tagInfo = tag
	});
  });

  beforeEach(() => {
    cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
	cy.screenshot('create-tag/clicking-login')
  });

  it('create tag ', () => {
	const stage ='create-tag'
    const newTag = tagInfo.nameTag;
    cy.newTag(newTag,stage);
    //valida que la lista contenga el nuevo tag
	cy.screenshot('create-tag/clicking-all-tags')
    cy.get('a[href="#/tags/'+newTag.toLowerCase()+'/"]').should('contain',newTag)
	cy.deleteTag(newTag,stage);
  });


  afterEach(() => {
   cy.closeDashBoardSession();
  })

});

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

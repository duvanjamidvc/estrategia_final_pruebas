/// <reference types="cypress-e2e" />

Cypress.on('uncaught:exception', (err, a) => {
	return false;
});

let usuarios;
describe('post and tag', () => {

	before(() => {
		cy.fixture('users').then(users => {
			usuarios = users;
			cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
			cy.screenshot('post-tag/clicking-login');
		});
	});
	
	it('Como usuario quiero crear un tag y asignarselo a una página', () => {
		const stage ='post-tag'
		const newTag = cy.faker.commerce.productAdjective()+cy.faker.datatype.number();
		cy.newTag(newTag,stage);
		
		let title = 'Titulo del post' + new Date().getTime();
		let contenido = cy.faker.lorem.paragraph();

		cy.createPostWithTag(title, contenido, newTag,stage);

		cy.publishPost(stage);
		cy.wait(100);
		cy.get('.post-view-link').click();
		cy.goToDashBoard();
		cy.deleteTag(newTag,stage);
	});

	after(function () {
		cy.closeDashBoardSession();
	});

});

/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, a) => {
	return false;
});

let usuarios;
describe('Pages', () => {

	before(() => {
		cy.fixture("users").then((users) => {
			usuarios = users;
		});
	});

	beforeEach(() => {
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
		cy.screenshot('create-post-delete-post/clicking-login');
	});
	it('Crear post, publicarlo, editarlo, cambiar el estado a borrador y válido en la lista de post que el estado sea borrador', () => {
		const stage ='create-post-delete-post'
		let title = cy.faker.name.title();
		let contenido = cy.faker.lorem.sentence();
		cy.createPostWithoutBack(title, contenido,stage);
		cy.publishPost(stage);
		cy.wait(400);
		cy.get('.gh-editor-back-button').click();
		cy.get('a[href="#/posts/?type=published"]').click();
		cy.wait(400);

		cy.selectFirstPostOfListAndChangeState(title,stage);

		cy.wait(400);
		cy.get('.gh-editor-back-button').click();
		cy.get('a[href="#/posts/?type=draft"]').click();
		cy.wait(400);

		cy.validateDraftStatePost(title, 1);
	});

	afterEach(function () {
		cy.closeDashBoardSession();
	});

});

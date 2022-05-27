/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, a) => {
	return false;
});

let usuarios;
describe('Pages', () => {

	before(() => {
		cy.fixture('users').then(users => {
			usuarios = users;
			cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
			cy.screenshot('create-public-page/clicking-login');
		});
	});

	it('Crear pagina, publicarla y verificar que se publicó a traves del link generado en el las configuraciones de la pagina', () => {
		const stage = "create-public-page";
		let title = cy.faker.name.title();
		let contenido = cy.faker.lorem.sentence();
		cy.createPageWithoutBack(title, contenido,stage);
		cy.validatePublishPageFromSettings(stage);
	});

	after(function () {
		cy.closeDashBoardSession();
	});

});

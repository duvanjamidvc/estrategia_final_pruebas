/// <reference types="cypress" />

Cypress.on("uncaught:exception", (err, a) => {
	return false;
});

let usuarios;
describe("Pages", () => {
	before(() => {
		cy.fixture("users").then((users) => {
			usuarios = users;
		});
	});

	beforeEach(() => {
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
		cy.screenshot('create-page-delete-page/clicking-login');
	});

	it("Crear pagina, publicarla, editarla y verificar que se publicó a traves del link generado en el las configuraciones de la pagina", () => {
		const stage = "create-page-delete-page";
		let title = cy.faker.name.title();
		let contenido = cy.faker.lorem.sentence();
		cy.createPageWithoutBack(title, contenido,stage);
		cy.wait(400);
		cy.get(".gh-editor-back-button").click();
		cy.screenshot(`${stage}/back-button-page`);
		cy.wait(400);
		cy.filterPublishPage(stage);
		cy.selectFirstPageOfListAndEdit(stage);
		cy.publishPage(stage);
		cy.validatePublishPageFromSettings(stage);
	});

	afterEach(function () {
		cy.closeDashBoardSession();
	});
});

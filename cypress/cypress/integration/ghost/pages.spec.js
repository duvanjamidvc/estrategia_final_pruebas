/// <reference types="cypress" />
/// <reference types="../../support" />

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
		cy.screenshot("create-page-link/clicking-login");
		cy.screenshot("create-page-delete-page-link/clicking-login");
		cy.screenshot("create-public-page-nav/clicking-login");
	});
	it("Crear pagina y publicarla con Link", () => {
		const stage = "create-page-link";
		let title = "Titulo de la pagina" + new Date().getTime();
		let contenido = cy.faker.lorem.paragraph();

		cy.createPage(title, contenido,stage);
		cy.createPageLink(title, stage);
		cy.closeDashBoardSession();
		cy.validatePageByTitleAndLink(title, 1, stage);
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
	});

	it("Crear pagina y publicarla", () => {
		const stage = "create-public-page-nav";
		let title = "Titulo de la pagina" + new Date().getTime();
		let contenido = cy.faker.lorem.paragraph();

		cy.createPage(title, contenido,stage);
		cy.validatePageLoadPublicLink(title,stage);
	});

	it("Eliminar pagina y link corespondiente", () => {
		const stage = "create-page-delete-page-link";
		let title = "Titulo de la pagina" + new Date().getTime();
		let contenido = cy.faker.lorem.paragraph();

		cy.createPage(title, contenido,stage);
		cy.createPageLink(title, stage);
		cy.closeDashBoardSession();
		cy.validatePageByTitleAndLink(title, 1, stage);
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
		cy.deletePageLinkByTitle(title,stage);
		cy.deletePageByTitle(title,stage);
		cy.validatePageByTitleAndLink(title, 0, stage);
	});

	afterEach(function () {
		cy.closeDashBoardSession();
	});
});

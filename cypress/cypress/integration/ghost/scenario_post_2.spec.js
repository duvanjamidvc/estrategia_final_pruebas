/// <reference types="cypress" />

Cypress.on("uncaught:exception", (err, a) => {
	return false;
});

let usuarios;
describe("Posts", () => {
	before(() => {
		cy.fixture("users").then((users) => {
			usuarios = users;
		});
	});

	beforeEach(() => {
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
		cy.screenshot("create-post-edit-post/clicking-login");
	});

	it("Como usuario inicio sesion, creo un post lo publico y luego lo edito y lo vuelvo a publicar", () => {
		const stage = "create-post-edit-post";
		let title = "Titulo del post" + new Date().getTime();
		let contenido = cy.faker.lorem.paragraph();

		cy.createPostWithoutBack(title, contenido,stage);
		cy.publishPost(stage);
		cy.validatePublishPostFromSettings(stage);
		cy.wait(400);
		cy.get(".gh-editor-back-button").click();
		cy.selectFirstPostOfListAndEdit(title, contenido,stage);
		cy.publishPost(stage);
		cy.validatePublishPostFromSettings(stage);
	});

	afterEach(function () {
		cy.closeDashBoardSession();
	});
});

/// <reference types="cypress-e2e" />

Cypress.on("uncaught:exception", (err, a) => {
	return false;
});

let usuarios;
describe("Cambiar nombre de usuario", () => {
	before(() => {
		cy.fixture("users").then((users) => {
			usuarios = users;
		});
	});

	beforeEach(() => {
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
		cy.screenshot("edit-user-name/clicking-login");
	});

	it("Cambiar nombre de usuario", () => {
		const stage = "edit-user-name";
		const url = Cypress.config("baseUrlDashBoard");
		cy.visit(url);
		cy.goUserProfile(stage);

		const nameUser = cy.faker.name.findName();
		cy.get("#user-name").clear().type(nameUser, { force: true });

		cy.saveUserProfile(stage);

		cy.get(".gh-user-avatar").click();
		cy.screenshot(`${stage}/click-avatar-user`);
		cy.get(".gh-user-name").should("have.text", nameUser);
	});

	afterEach(function () {
		cy.closeDashBoardSession();
	});
});

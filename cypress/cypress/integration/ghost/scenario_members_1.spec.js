/// <reference types="cypress" />

let usuarios;
describe("Members", () => {
	before(() => {
		cy.fixture("users").then((users) => {
			usuarios = users;
		});
	});

	beforeEach(() => {
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
		cy.screenshot("create-member/clicking-login");
	});

	it("create member  ", () => {
		const stage = "create-member";
		const newMember = cy.faker.internet.email();
		cy.newMember(newMember,stage);
		// esperamos que el guardado sea existoso
		cy.intercept("**/ghost/api/**").as("addMember");
		cy.wait("@addMember")
			.its("response.statusCode")
			.should("be.oneOf", [200, 201]);
		//obtiene url para tomar id
		cy.url().then((url) => {
			const id = url.split("members/")[1];
			//valida si fue creado
			cy.get('[href="#/members/"]:visible').parent().first().click();
			cy.get("body").should("contain", newMember);
			cy.deleteMember(id,stage);
		});
	});

	after(() => {
		cy.closeDashBoardSession();
	});
});

Cypress.on("uncaught:exception", (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false;
});

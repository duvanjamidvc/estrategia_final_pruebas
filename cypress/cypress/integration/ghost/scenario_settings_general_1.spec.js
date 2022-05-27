/// <reference types="cypress" />

let usuarios;
describe("General Settings", () => {
	before(() => {
		cy.fixture("users").then((users) => {
			usuarios = users;
		});
	});

	beforeEach(() => {
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
		cy.screenshot("edit-general-password/clicking-login");
	});

	it("set private site and validate incorrect password ", () => {
		const stage = "edit-general-password";
		const newPassword = cy.faker.internet.password();
		cy.goToGeneralSettings(stage);
		//valida si el sitioes privado y si no lo es asigna privado
		cy.setPassword(newPassword, stage);
		// esperamos que el guardado sea existoso

		cy.wait(5000);
		//va a dashboard
		cy.get('a[href="#/dashboard/"]').parent().first().click();
		cy.screenshot(`${stage}/click-dashboard`);
		//va de nuevo a settings
		cy.goToGeneralSettings(stage);
		//valida que la contraseña sea la guardada

		cy.get('input[name="general[password]"]').click({ force: true });
		cy.screenshot(`${stage}/click-general-password`);
		cy.get('input[name="general[password]"]').should(
			"have.value",
			newPassword
		);
	});

	it("Set public site", () => {
		const stage = "edit-general-password";
		cy.goToGeneralSettings(stage);
		//vuelve a poner el sitio como publico
		cy.get(
			"body > div.gh-app > div > main > section > div:nth-child(4) > section > div > div.gh-expandable-header > div.for-switch > label > span"
		).click();
		//guarda
		cy.get(
			".gh-canvas-header > .gh-canvas-header-content > .view-actions "
		).click();
		cy.wait(500);
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

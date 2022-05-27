Cypress.Commands.add("login", (username, password) => {
	const url = Cypress.config("baseUrlDashBoard");
	cy.log(`Logging in as ${username}`);
	cy.visit(url);
	cy.get('[name="identification"]').type(username);
	cy.get('[name="password"]').type(password);
	cy.get("#ember11").click();
	cy.intercept("GET", "**/ghost/**").as("goToDashBoard");
	cy.wait("@goToDashBoard")
		.its("response.statusCode")
		.should("be.oneOf", [200]);
});

/**
 *  Comando para cerrar la session del dashboard
 */
Cypress.Commands.add("closeDashBoardSession", () => {
	const url = Cypress.config("baseUrlDashBoard");
	cy.visit(url);

	cy.intercept("GET", "**/ghost/**").as("goToDashBoardToCloseSession");
	cy.wait("@goToDashBoardToCloseSession");

	cy.get(".gh-user-avatar").parent().parent().click();
	cy.get(".user-menu-signout").click();
});

Cypress.Commands.add('goUserProfile', () => {
	cy.get('.gh-user-avatar').click();
	cy.intercept('**/ghost/api/**').as('viewProfile');
	cy.get('a[href*="#/settings/staff"]').click();
	cy.wait('@viewProfile').its('response.statusCode').should('be.oneOf', [204, 200, 201]);
});
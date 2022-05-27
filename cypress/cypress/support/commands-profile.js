/**
 *  Comando para ingresar al perfil del usuario
 */
Cypress.Commands.add('goUserProfile', (stage) => {
	cy.get('.gh-user-avatar').click();
	cy.screenshot(`${stage}/clicking-profile`);
	cy.intercept('**/ghost/api/**').as('viewProfile');
	cy.get('a[href*="#/settings/staff"]').click();
	cy.wait('@viewProfile').its('response.statusCode').should('be.oneOf', [204, 200, 201]);
});


Cypress.Commands.add('saveUserProfile', (stage) => {
	cy.intercept('**/ghost/api/**').as('saveUserProfile');
	cy.get('.view-actions .gh-btn').click();
	cy.screenshot(`${stage}/clicking-save-profile`);
	cy.wait('@saveUserProfile').its('response.statusCode').should('be.oneOf', [204, 200, 201]);
});


Cypress.Commands.add('changePassword', (userPasswordOld, userPasswordNew,stage) => {
	cy.get('#user-password-old').clear().type(userPasswordOld, {force: true});
	cy.screenshot(`${stage}/write-old-Password`);
	cy.get('#user-password-new').clear().type(userPasswordNew, {force: true});
	cy.screenshot(`${stage}/write-new-Password`);
	cy.get('#user-new-password-verification').clear().type(userPasswordNew, {force: true});
	
	cy.intercept('**/ghost/api/**').as('changePassword');
	cy.get('.button-change-password').click();
	cy.screenshot(`${stage}/click-save-new-Password`);
	cy.wait('@changePassword').its('response.statusCode').should('be.oneOf', [204, 200, 201]);
});

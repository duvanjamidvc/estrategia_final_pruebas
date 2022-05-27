/// <reference types="cypress-e2e" />

Cypress.on('uncaught:exception', (err, a) => {
	return false;
});

let usuarios;
describe('Cambiar contraseña de usuario', () => {

	before(() => {
		cy.fixture('users').then(users => {
			usuarios = users;
		});
	});

	beforeEach(() => {
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
		cy.screenshot('edit-user-password/clicking-login');
	});

	it('Cambiar contraseña de usuario', () => {
		const stage='edit-user-password'
		const url = Cypress.config('baseUrlDashBoard');
		cy.visit(url);
		cy.goUserProfile(stage);

		const userPasswordOld = usuarios.admins[0].password;
		const userPasswordNew = 'Qwerty1234567';
		
		cy.changePassword(userPasswordOld, userPasswordNew,stage);

		cy.closeDashBoardSession();
		
		cy.login(usuarios.admins[0].username, userPasswordNew)
		cy.screenshot(`${stage}/login-valid`);
		cy.goUserProfile(stage);

		cy.changePassword(userPasswordNew, userPasswordOld,stage);
		
	});
	
	afterEach(function () {
		cy.closeDashBoardSession();
	});

});

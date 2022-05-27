class LoginPage {
	navegate() {
		const url = Cypress.config('baseUrlDashBoard');
		cy.visit(url);
	}
	
	inputEmail() {
		return cy.get('[name="identification"]');
	}
	inputPassword() {
		return cy.get('[name="password"]');
	}
	
	submit() {
		return cy.get('[type="submit"]');
	}

	forgot() {
		return cy.get('.forgotten-link ');
	}
	
	mainError() {
		return cy.get('.main-error');
	}
	
	alertContent() {
		return cy.get('.gh-alert-content');
	}
	
}

export default LoginPage;
class ProfilePage {
	navegate() {
		const url = Cypress.config('baseUrlDashBoard');
		cy.visit(url);
		cy.goUserProfile();
	}

	inputUser() {
		return cy.get('#user-name');
	}

	inputUserSlug() {
		return cy.get('#user-slug');
	}

	inputEmail() {
		return cy.get('#user-email');
	}

	inputLocation() {
		return cy.get('#user-location');
	}

	inputWebSite() {
		return cy.get('#user-website');
	}

	inputFacebook() {
		return cy.get('#user-facebook');
	}

	inputTwitter() {
		return cy.get('#user-twitter');
	}

	inputBio() {
		return cy.get('#user-bio');
	}

	inputPassOld() {
		return cy.get('#user-password-old');
	}

	inputPassNew() {
		return cy.get('#user-password-new');
	}

	inputPassNewVerification() {
		return cy.get('#user-new-password-verification');
	}

	btnChanngePass() {
		return cy.get('.button-change-password');
	}

	errorMessage() {
		return cy.get('.error .response');
	}

}

export default ProfilePage;
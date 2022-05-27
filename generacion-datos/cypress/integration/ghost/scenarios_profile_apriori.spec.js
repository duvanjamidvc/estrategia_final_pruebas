import ProfilePage from "../pageObject/profilePage";

function getRowDataPool(array){
	const max = array.length-1;
	const pos = Math.round(Math.random() * max);
	return array[pos];
}

let profilePage= new ProfilePage();

Cypress.on('uncaught:exception', (err, a) => {
	return false;
});

describe("profile data to priori", () => {
	let profileDataRow;
	let usuariosAdmin;
	let profileDataEmailLength192;
	let profileDataEmailLength191;
	let profileDataWebsiteBadFormat;
	let profileDataUrlFacebookBadFormat;
	let profileDataUrlTwitterBadFormat;
	let profileDataBioLength201;
	let profileDataBioLength200;
	let changePasswordData;
	let changePasswordDataNewPassValid;
	
	before(() => {
		cy.fixture("profile").then((data)=>  {
			profileDataRow = getRowDataPool(data.profileData);
			profileDataEmailLength192 = getRowDataPool(data.profileDataEmailLength192);
			profileDataEmailLength191 = getRowDataPool(data.profileDataEmailLength191);
			profileDataWebsiteBadFormat = getRowDataPool(data.profileDataWebsiteBadFormat);
			profileDataUrlFacebookBadFormat = getRowDataPool(data.profileDataUrlFacebookBadFormat);
			profileDataUrlTwitterBadFormat = getRowDataPool(data.profileDataUrlTwitterBadFormat);
			profileDataBioLength201 = getRowDataPool(data.profileDataBioLength201);
			profileDataBioLength200 = getRowDataPool(data.profileDataBioLength200);
			changePasswordData = getRowDataPool(data.changePasswordData);
			changePasswordDataNewPassValid = getRowDataPool(data.changePasswordDataNewPassValid)
		});

		cy.fixture('users').then(users => {
			usuariosAdmin = users.admins;
		});
	})

	beforeEach(() => {
		let usuario =  getRowDataPool(usuariosAdmin);
		cy.login(usuario.username, usuario.password);
	});

	it('should enter a name', () => {
		profilePage.navegate();
		profilePage.inputUser().clear();
		profilePage.inputEmail().type(profileDataRow.email);
		profilePage.inputLocation().type(profileDataRow.location);
		profilePage.inputWebSite().type(profileDataRow.website);
		profilePage.inputFacebook().type(profileDataRow.facebook);
		profilePage.inputTwitter().type(profileDataRow.twitter);
		profilePage.inputBio().type(profileDataRow.bio);
		profilePage.errorMessage().contains('Please enter a name.');
	});

	it('should a valid email address', () => {
		profilePage.navegate();
		profilePage.inputUser().type(profileDataRow.user);
		profilePage.inputEmail().type(profileDataRow.email)
		profilePage.inputLocation().type(profileDataRow.location);
		profilePage.inputWebSite().type(profileDataRow.website);
		profilePage.inputFacebook().type(profileDataRow.facebook);
		profilePage.inputTwitter().type(profileDataRow.twitter);
		profilePage.inputBio().type(profileDataRow.bio);
		profilePage.inputEmail().siblings('.response').should('be.hidden');
	});

	it('should supply a valid email address: email empty', () => {
		profilePage.navegate();
		profilePage.inputUser().type(profileDataRow.user);
		profilePage.inputEmail().clear();
		profilePage.inputLocation().type(profileDataRow.location);
		profilePage.inputWebSite().type(profileDataRow.website);
		profilePage.inputFacebook().type(profileDataRow.facebook);
		profilePage.inputTwitter().type(profileDataRow.twitter);
		profilePage.inputBio().type(profileDataRow.bio);
		profilePage.inputEmail().siblings('.response').contains('Please supply a valid email address');
	});

	it('should supply a valid email address: bad format', () => {
		profilePage.navegate();
		profilePage.inputUser().type(profileDataRow.user);
		profilePage.inputEmail().type(profileDataRow.email).blur();
		profilePage.inputEmail().siblings('.response').contains('Please supply a valid email address');
		profilePage.inputLocation().type(profileDataRow.location);
		profilePage.inputWebSite().type(profileDataRow.website);
		profilePage.inputFacebook().type(profileDataRow.facebook);
		profilePage.inputTwitter().type(profileDataRow.twitter);
		profilePage.inputBio().type(profileDataRow.bio);
	});

	it('should supply a valid email address: length 192', () => {
		profilePage.navegate();
		profilePage.inputUser().type(profileDataEmailLength192.user);
		profilePage.inputEmail().type(profileDataEmailLength192.email).blur();
		profilePage.inputEmail().siblings('.response').contains(/Email is too long|Please supply a valid email address/g);
		profilePage.inputLocation().type(profileDataEmailLength192.location);
		profilePage.inputWebSite().type(profileDataEmailLength192.website);
		profilePage.inputFacebook().type(profileDataEmailLength192.facebook);
		profilePage.inputTwitter().type(profileDataEmailLength192.twitter);
		profilePage.inputBio().type(profileDataEmailLength192.bio);
	});

	// it('should supply a valid email address: length 191', () => {
	// 	profilePage.navegate();
	// 	profilePage.inputUser().type(profileDataEmailLength191.user);
	// 	profilePage.inputEmail().type(profileDataEmailLength191.email).blur();
	// 	profilePage.inputEmail().siblings('.response').should('be.hidden');
	// 	profilePage.inputLocation().type(profileDataEmailLength191.location);
	// 	profilePage.inputWebSite().type(profileDataEmailLength191.website);
	// 	profilePage.inputFacebook().type(profileDataEmailLength191.facebook);
	// 	profilePage.inputTwitter().type(profileDataEmailLength191.twitter);
	// 	profilePage.inputBio().type(profileDataEmailLength191.bio);
	// });

	it('should Website is not a valid url: not a valid url', () => {
		profilePage.navegate();
		profilePage.inputUser().type(profileDataWebsiteBadFormat.user);
		profilePage.inputEmail().type(profileDataWebsiteBadFormat.email);
		profilePage.inputLocation().type(profileDataWebsiteBadFormat.location);
		profilePage.inputWebSite().type(profileDataWebsiteBadFormat.website).blur();
		profilePage.inputWebSite().siblings('.response').contains('Website is not a valid url');
		profilePage.inputFacebook().type(profileDataWebsiteBadFormat.facebook);
		profilePage.inputTwitter().type(profileDataWebsiteBadFormat.twitter);
		profilePage.inputBio().type(profileDataWebsiteBadFormat.bio);
	});

	it('should Website a valid url', () => {
		profilePage.navegate();
		profilePage.inputUser().type(profileDataRow.user);
		profilePage.inputEmail().type(profileDataRow.email);
		profilePage.inputLocation().type(profileDataRow.location);
		profilePage.inputWebSite().type(profileDataRow.website).blur();
		profilePage.inputWebSite().siblings('.response').should('be.hidden');
		profilePage.inputFacebook().type(profileDataRow.facebook);
		profilePage.inputTwitter().type(profileDataRow.twitter);
		profilePage.inputBio().type(profileDataRow.bio);
	});

	it('should facebook is not a valid url: not a valid url', () => {
		profilePage.navegate();
		profilePage.inputUser().type(profileDataUrlFacebookBadFormat.user);
		profilePage.inputEmail().type(profileDataUrlFacebookBadFormat.email);
		profilePage.inputLocation().type(profileDataUrlFacebookBadFormat.location);
		profilePage.inputWebSite().type(profileDataUrlFacebookBadFormat.website);
		profilePage.inputFacebook().type(profileDataUrlFacebookBadFormat.facebook).blur();
		profilePage.inputFacebook().siblings('.response').contains('The URL must be in a format like https://www.facebook.com/yourPage');
		profilePage.inputTwitter().type(profileDataUrlFacebookBadFormat.twitter);
		profilePage.inputBio().type(profileDataUrlFacebookBadFormat.bio);
	});

	it('should facebook a valid url', () => {
		profilePage.navegate();
		profilePage.inputUser().type(profileDataRow.user);
		profilePage.inputEmail().type(profileDataRow.email);
		profilePage.inputLocation().type(profileDataRow.location);
		profilePage.inputWebSite().type(profileDataRow.website);
		profilePage.inputFacebook().type(profileDataRow.facebook).blur();
		profilePage.inputFacebook().siblings('.response').should('be.hidden');
		profilePage.inputTwitter().type(profileDataRow.twitter);
		profilePage.inputBio().type(profileDataRow.bio);
	});


	it('should twitter is not a valid url: not a valid url', () => {
		profilePage.navegate();
		profilePage.inputUser().type(profileDataUrlTwitterBadFormat.user);
		profilePage.inputEmail().type(profileDataUrlTwitterBadFormat.email);
		profilePage.inputLocation().type(profileDataUrlTwitterBadFormat.location);
		profilePage.inputWebSite().type(profileDataUrlTwitterBadFormat.website);
		profilePage.inputFacebook().type(profileDataUrlTwitterBadFormat.facebook);
		profilePage.inputTwitter().type(profileDataUrlTwitterBadFormat.twitter).blur();
		profilePage.inputTwitter().siblings('.response').contains('Your Username is not a valid Twitter Username');
		profilePage.inputBio().type(profileDataUrlTwitterBadFormat.bio);
	});

	it('should twitter a valid url', () => {
		profilePage.navegate();
		profilePage.inputUser().type(profileDataRow.user);
		profilePage.inputEmail().type(profileDataRow.email);
		profilePage.inputLocation().type(profileDataRow.location);
		profilePage.inputWebSite().type(profileDataRow.website);
		profilePage.inputFacebook().type(profileDataRow.facebook);
		profilePage.inputTwitter().type(profileDataRow.twitter).blur();
		profilePage.inputTwitter().siblings('.response').should('be.hidden');
		profilePage.inputBio().type(profileDataRow.bio);
	});

	it('should have used 201', () => {
		profilePage.navegate();
		profilePage.inputUser().type(profileDataBioLength201.user);
		profilePage.inputEmail().type(profileDataBioLength201.email);
		profilePage.inputLocation().type(profileDataBioLength201.location);
		profilePage.inputWebSite().type(profileDataBioLength201.website);
		profilePage.inputFacebook().type(profileDataBioLength201.facebook);
		profilePage.inputTwitter().type(profileDataBioLength201.twitter);
		profilePage.inputBio().type(profileDataBioLength201.bio).blur();
		profilePage.inputBio().siblings('p').children('.word-count').contains('201');
	});

	it('should have used 201 span red', () => {
		profilePage.navegate();
		profilePage.inputUser().type(profileDataBioLength201.user);
		profilePage.inputEmail().type(profileDataBioLength201.email);
		profilePage.inputLocation().type(profileDataBioLength201.location);
		profilePage.inputWebSite().type(profileDataBioLength201.website);
		profilePage.inputFacebook().type(profileDataBioLength201.facebook);
		profilePage.inputTwitter().type(profileDataBioLength201.twitter);
		profilePage.inputBio().type(profileDataBioLength201.bio).blur();
		profilePage.inputBio().siblings('p').children('.word-count').should('have.css', 'color', 'rgb(226, 84, 64)');
	});

	it('should Bio is too long', () => {
		profilePage.navegate();
		profilePage.inputUser().type(profileDataBioLength201.user);
		profilePage.inputEmail().type(profileDataBioLength201.email);
		profilePage.inputLocation().type(profileDataBioLength201.location);
		profilePage.inputWebSite().type(profileDataBioLength201.website);
		profilePage.inputFacebook().type(profileDataBioLength201.facebook);
		profilePage.inputTwitter().type(profileDataBioLength201.twitter);
		profilePage.inputBio().type(profileDataBioLength201.bio).blur();
		profilePage.inputBio().siblings('.response').contains('Bio is too long');
	});

	it('should have used 200 span green', () => {
		profilePage.navegate();
		profilePage.inputUser().type(profileDataBioLength200.user);
		profilePage.inputEmail().type(profileDataBioLength200.email);
		profilePage.inputLocation().type(profileDataBioLength200.location);
		profilePage.inputWebSite().type(profileDataBioLength200.website);
		profilePage.inputFacebook().type(profileDataBioLength200.facebook);
		profilePage.inputTwitter().type(profileDataBioLength200.twitter);
		profilePage.inputBio().type(profileDataBioLength200.bio).blur();
		profilePage.inputBio().siblings('p').children('.word-count').should('have.css', 'color', 'rgb(48, 207, 67)');
	});

	it('should not found Bio is too long', () => {
		profilePage.navegate();
		profilePage.inputUser().type(profileDataBioLength200.user);
		profilePage.inputEmail().type(profileDataBioLength200.email);
		profilePage.inputLocation().type(profileDataBioLength200.location);
		profilePage.inputWebSite().type(profileDataBioLength200.website);
		profilePage.inputFacebook().type(profileDataBioLength200.facebook);
		profilePage.inputTwitter().type(profileDataBioLength200.twitter);
		profilePage.inputBio().type(profileDataBioLength200.bio).blur();
		profilePage.inputBio().siblings('.response').should('be.hidden');
	});

	it('Password must be at least 10 characters long', () => {
		profilePage.navegate();
		profilePage.inputPassOld().type(changePasswordData.passOld);
		profilePage.inputPassNew().type(changePasswordData.passNew);
		profilePage.inputPassNewVerification().type(changePasswordData.passNewVerification);
		profilePage.btnChanngePass().click();
		profilePage.inputPassNew().siblings('.response').contains('Password must be at least 10 characters long.');
	});

	it('Your new passwords do not match', () => {
		profilePage.navegate();
		profilePage.inputPassOld().type(changePasswordData.passOld);
		profilePage.inputPassNew().type(changePasswordData.passNew);
		profilePage.inputPassNewVerification().type(changePasswordData.passNewVerification);
		profilePage.btnChanngePass().click();
		profilePage.inputPassNewVerification().siblings('.response').contains('Your new passwords do not match');
	});


	it('Your current password is required to set a new one', () => {
		profilePage.navegate();
		profilePage.inputPassOld().clear();
		profilePage.inputPassNew().type(changePasswordData.passNew);
		profilePage.inputPassNewVerification().type(changePasswordData.passNewVerification);
		profilePage.btnChanngePass().click();
		profilePage.inputPassOld().siblings('.response').contains('Your current password is required to set a new one');
	});


	it('Sorry, passwords can not be blank', () => {
		profilePage.navegate();
		profilePage.inputPassOld().type(changePasswordData.passOld);
		profilePage.inputPassNew().clear();
		// profilePage.inputPassNewVerification().type(changePasswordData.passNewVerification);
		profilePage.btnChanngePass().click();
		profilePage.inputPassNew().siblings('.response').contains("Sorry, passwords can't be blank");
	});

	it('Your new passwords do not match be hidden', () => {
		profilePage.navegate();
		profilePage.inputPassOld().type(changePasswordData.passOld);
		profilePage.inputPassNew().type(changePasswordData.passNew);
		profilePage.inputPassNewVerification().type(changePasswordData.passNew);
		profilePage.btnChanngePass().click();
		profilePage.inputPassNewVerification().siblings('.response').should('be.hidden');
	});

	it('message "Your current password is required to set a new one" be hidden', () => {
		profilePage.navegate();
		profilePage.inputPassOld().type(changePasswordDataNewPassValid.passOld);
		profilePage.inputPassNew().type(changePasswordDataNewPassValid.passNew);
		profilePage.inputPassNewVerification().type(changePasswordDataNewPassValid.passNew);
		profilePage.btnChanngePass().click();
		profilePage.inputPassNew().siblings('.response').should('be.hidden');
	});
		
	
	afterEach(function () {
		cy.closeDashBoardSession();
	});
})
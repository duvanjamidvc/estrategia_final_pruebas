import LoginPage from "../pageObject/loginPage";


function getRowDataPool(array){
	const max = array.length-1;
	const pos = Math.floor(Math.random() * max);
	return array[pos];
}

let loginPage = new LoginPage();

describe("Login data a priori", () => {
	let userValid;
	let userInvalid;
	let userEmailInvalid;
	beforeEach(() => {
		cy.fixture("login").then((data)=>  {
			userValid = getRowDataPool(data.dataValid);
			userInvalid = getRowDataPool(data.dataInvalid);
			userEmailInvalid = getRowDataPool(data.dataEmailInvalid);
		});
	})
	it('should login data valid', () => {
		loginPage.navegate();
		loginPage.inputEmail().type(userValid.email);
		loginPage.inputPassword().type(userValid.password);
		loginPage.submit().click();
		cy.intercept("GET", "**/ghost/**").as("goToDashBoard");
		cy.wait("@goToDashBoard")
			.its("response.statusCode")
			.should("be.oneOf", [200]);
	});
	
	it('should login data invalid', () => {
		loginPage.navegate();
		loginPage.inputEmail().type(userInvalid.email);
		loginPage.inputPassword().type(userInvalid.password);
		loginPage.submit().click();
		cy.wait(500);
		loginPage.mainError().contains('There is no user with that email address.');
	});
	
	it('should email empty', () => {
		loginPage.navegate();
		loginPage.inputEmail().clear();
		loginPage.inputPassword().type(userInvalid.password);
		loginPage.submit().click();
		cy.wait(500);
		loginPage.mainError().contains('Please fill out the form to sign in.');
	});

	it('should password empty', () => {
		loginPage.navegate();
		loginPage.inputEmail().type(userInvalid.email);
		loginPage.inputPassword().clear();
		loginPage.submit().click();
		cy.wait(500);
		loginPage.mainError().contains('Please fill out the form to sign in.');
	});

	it('should email bad format', () => {
		loginPage.navegate();
		loginPage.inputEmail().type(userEmailInvalid.email);
		loginPage.inputPassword().type(userEmailInvalid.password);
		loginPage.submit().click();
		cy.wait(500);
		loginPage.mainError().contains('Please fill out the form to sign in.');
	});
	
	
});

describe("forgot data a priori", () => {
	let dataEmailInvalid;
	let dataEmailFormatValid;
	let userValid;
	beforeEach(() => {
		cy.fixture("login").then((data)=>  {
			dataEmailInvalid = getRowDataPool(data.dataEmailInvalidFormatForgot);
			dataEmailFormatValid = getRowDataPool(data.dataFormatEmailValid);
			userValid = getRowDataPool(data.dataValid);
		});
	});

	it('should email bad format forgot', () => {
		loginPage.navegate();
		loginPage.inputEmail().type(dataEmailInvalid.email);
		loginPage.forgot().click();
		cy.wait(500);
		loginPage.mainError().contains('We need your email address to reset your password!');
	});

	it('should user not found', () => {
		loginPage.navegate();
		loginPage.inputEmail().type(dataEmailFormatValid.email);
		loginPage.forgot().click();
		cy.wait(500);
		loginPage.mainError().contains('User not found.');
	});
	
	it('should send instructions for recovery password', () => {
		loginPage.navegate();
		loginPage.inputEmail().type(userValid.email);
		loginPage.forgot().click();
		cy.wait(500);
		loginPage.alertContent().contains('Please check your email for instructions.');
	})
	
	
})


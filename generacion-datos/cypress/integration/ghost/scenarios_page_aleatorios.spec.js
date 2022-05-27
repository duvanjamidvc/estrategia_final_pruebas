/// <reference types="cypress" />

function getRowDataPool(array){
	const max = array.length-1;
	const pos = Math.round(Math.random() * max);
	return array[pos];
}
Cypress.on("uncaught:exception", (err, a) => {
	return false;
});

let usuarios;
describe("Pages aleatorios", () => {
	before(() => {
		cy.fixture("users").then((users) => {
			usuarios = users;
		});
	});

	beforeEach(() => {
		let usuario =  getRowDataPool(usuarios.admins);
		cy.login(usuario.username, usuario.password);
		cy.wait(1000);
		cy.GoCreatePage();
	});
	it("Page Excerpt cannot be longer than 300 characters.", () => {
		let data = {
			newTittle: cy.faker.lorem.word(),
			newExcerpt: cy.faker.lorem.sentence(100),
		};
		cy.CreatePageExcerpt(data.newTittle, data.newExcerpt);
		cy.publishPage();
		cy.get("button").should("contain", "Retry");
	});
	it("Page Excerpt contain less than 300 characters.", () => {
		let data = {
			newTittle: cy.faker.lorem.word(),
			newExcerpt: cy.faker.lorem.sentence(5),
		};
		cy.CreatePageExcerpt(data.newTittle, data.newExcerpt);
		cy.publishPage();
		cy.get(".gh-publishmenu-footer").should("contain", "Published");
	});
	it("Page Publish date cannot be Invalid.", () => {
		let data = {
			newTittle: cy.faker.lorem.word(),
			newDate: cy.faker.lorem.sentence(1),
		};
		cy.publishPageDate(data.newTittle, data.newDate);
		cy.get("button").should("contain", "Retry");
	});
	it("Page Publish date must be format YYYY-MM-DD.", () => {
		let monthFormat = cy.faker.datatype.datetime().getMonth() + 1;
		let data = {
			newTittle: cy.faker.lorem.word(),
			newDate:
				cy.faker.datatype.datetime().getFullYear() +
				"-" +
				(monthFormat > 9 ? monthFormat : "0" + String(monthFormat)) +
				"-" +
				cy.faker.datatype.datetime().getDate(),
		};
		cy.publishPageDate(data.newTittle, data.newDate);
		cy.wait(1000)
		cy.get(".gh-publishmenu-footer").should("contain", "Scheduled");
	});
	it("Page Canonical URL cannot be longer than 2000 characters.", () => {
		let data = {
			newTittle: cy.faker.lorem.word(),
			newUrl: cy.faker.lorem.sentence(300),
		};
		cy.CreatePageCanonicalURL(data.newTittle, data.newUrl);
		cy.publishPage();
		cy.get("button").should("contain", "Retry");
	});
	it("Page Canonical URL contain less than 2000 characters and valid.", () => {
		let data = {
			newTittle: cy.faker.lorem.word(),
			newUrl: cy.faker.internet.url(),
		};
		cy.CreatePageCanonicalURL(data.newTittle, data.newUrl);
		cy.publishPage();
		cy.get(".gh-publishmenu-footer").should("contain", "Published");
	});
	it("Page Canonical URL cannot be invalid.", () => {
		let data = {
			newTittle: cy.faker.lorem.word(),
			newUrl: cy.faker.lorem.sentence(40),
		};
		cy.CreatePageCanonicalURL(data.newTittle, data.newUrl);
		cy.publishPage();
		cy.get("button").should("contain", "Retry");
	});
	it("Page Tittle contain less than 250 characters.", () => {
		let data = {
			newTittle: cy.faker.lorem.sentence(3),
		};
		cy.CreatePageTittle(data.newTittle);
		cy.publishPage();
		cy.get(".gh-publishmenu-footer").should("contain", "Published");
	});
	it("Page Tittle cannot be longer than 250 characters.", () => {
		let data = {
			newTittle: cy.faker.lorem.sentence(50),
		};
		cy.CreatePageTittle(data.newTittle);
		cy.get("button").should("not.have", "Publish");
	});
	it("Page  contain text", () => {
		let data = {
			newTittle: cy.faker.lorem.word(),
		};
		cy.CreatePageTittle(data.newTittle);
		cy.publishPage();
		cy.get(".gh-publishmenu-footer").should("contain", "Published");
	});
	it("Page  cannot be blank page.", () => {
		let data = {};
		cy.get("button").should("not.have", "Publish");
	});

	it("Page  description twter cannot be longer than 500 characters", () => {
		let data = {
			newTittle: cy.faker.lorem.word(),
			newUrl: cy.faker.lorem.sentence(150),
		};
		cy.CreatePageTwitterDescription(data.newTittle, data.newUrl);
		cy.publishPage();
		cy.get("button").should("contain", "Retry");
	});

	after(function () {
		cy.closeDashBoardSession();
	});
});

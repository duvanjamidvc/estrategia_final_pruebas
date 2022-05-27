/// <reference types="cypress" />

let usuarios;
import TagsPage from "../pageObject/tagsPage";
let tagsPage = new TagsPage();

function getRowDataPool(array) {
	const max = array.length - 1;
	const pos = Math.round(Math.random() * max);
	return array[pos];
}

describe("Tag aleatorios", () => {
	before(() => {
		cy.fixture("users").then((users) => {
			usuarios = users;
		});
	});

	beforeEach(() => {
		let usuario = getRowDataPool(usuarios.admins);
		cy.login(usuario.username, usuario.password);
		cy.wait(1000);
		cy.goToNewTag();
	});

	it("Tag color is not number", () => {
		let data = {
			newColor: cy.faker.random.number(3),
			newName: cy.faker.lorem.word(),
		};
		cy.NewTagNameColor(data.newName, data.newColor);
		cy.get("p").should(
			"contain",
			"The colour should be in valid hex format"
		);
		cy.get("button").should("contain", "Retry");
		tagsPage.menuOptionTag().parent().first().click();
		cy.wait(1000);
		tagsPage.buttonLeaveNewTag().click();
	});

	it("Tag color is not letters", () => {
		let data = {
			newColor: cy.faker.random.word(),
			newName: cy.faker.lorem.word(),
		};
		cy.NewTagNameColor(data.newName, data.newColor);
		cy.get("p").should(
			"contain",
			"The colour should be in valid hex format"
		);
		cy.get("button").should("contain", "Retry");
		tagsPage.menuOptionTag().parent().first().click();
		cy.wait(1000);
		tagsPage.buttonLeaveNewTag().click();
	});

	it("Tag color must have correct hex validate error", () => {
		let data = {
			newColor: cy.faker.datatype.hexaDecimal(8),
			newName: cy.faker.lorem.word(),
		};
		cy.NewTagNameColor(data.newName, data.newColor);
		cy.get("p").should(
			"contain",
			"The colour should be in valid hex format"
		);
		cy.get("button").should("contain", "Retry");
		tagsPage.menuOptionTag().parent().first().click();
		cy.wait(1000);
		tagsPage.buttonLeaveNewTag().click();
	});

	it("Tag color must have correct hex", () => {
		let data = {
			newColor: cy.faker.datatype.hexaDecimal(8).split("0x")[1],
			newName: cy.faker.lorem.word(),
		};
		cy.NewTagNameColor(data.newName, data.newColor);
		cy.wait(1000);
		tagsPage.menuOptionTag().parent().first().click();
		cy.get('a[href="#/tags/' + data.newName.toLowerCase() + '/"]').should(
			"contain",
			data.newName
		);
		cy.deleteTag(data.newName);
		cy.wait(1000);
	});

	it("Tag names cannot be longer than 191 characters.", () => {
		let data = {
			newName: cy.faker.lorem.paragraphs(),
		};
		cy.NewTagName(data.newName);
		cy.get("p").should(
			"contain",
			"Tag names cannot be longer than 191 characters."
		);
		tagsPage.menuOptionTag().parent().first().click();
		cy.wait(1000);
		tagsPage.buttonLeaveNewTag().click();
	});

	it("Tag names contain less than 191 characters.", () => {
		let data = {
			newName: cy.faker.lorem.word(),
		};
		cy.NewTagName(data.newName);
		cy.wait(1000);
		tagsPage.menuOptionTag().parent().first().click();
		cy.get('a[href="#/tags/' + data.newName.toLowerCase() + '/"]').should(
			"contain",
			data.newName
		);
		cy.deleteTag(data.newName);
		cy.wait(1000);
	});

	it("Tag slug cannot be longer than 191 characters.", () => {
		let data = {
			newName: cy.faker.lorem.word(),
			newSlug: cy.faker.lorem.paragraphs(),
		};
		cy.NewTagSlug(data.newSlug, data.newName);
		cy.get("button").should("contain", "Retry");
		tagsPage.menuOptionTag().parent().first().click();
		cy.wait(1000);
		tagsPage.buttonLeaveNewTag().click();
	});

	it("Tag slug contain less than 191 characters.", () => {
		let data = {
			newName: cy.faker.lorem.word(),
			newSlug: cy.faker.lorem.word(),
		};
		cy.NewTagSlug(data.newSlug, data.newName);
		cy.wait(1000);
		tagsPage.menuOptionTag().parent().first().click();
		cy.wait(1000);
		cy.get(
			'a[href="#/tags/' +
				data.newName.toLowerCase() +
				data.newSlug.toLowerCase() +
				'/"]'
		).should("contain", data.newName);
		cy.wait(1000);
		cy.deleteTag(data.newName.toLowerCase() + data.newSlug.toLowerCase());
	});

	it("Tag Description cannot be longer than 500 characters.", () => {
		let data = {
			newName: cy.faker.lorem.word(),
			newDescription: cy.faker.lorem.sentence(150),
		};
		cy.NewTagDescription(data.newDescription, data.newName);
		cy.get("button").should("contain", "Retry");
		tagsPage.menuOptionTag().parent().first().click();
		cy.wait(1000);
		tagsPage.buttonLeaveNewTag().click();
	});

	it("Tag Description contain less than 500 characters.", () => {
		let data = {
			newName: cy.faker.lorem.word(),
			newDescription: cy.faker.lorem.paragraph(),
		};
		cy.NewTagDescription(data.newDescription, data.newName);
		tagsPage.menuOptionTag().parent().first().click();
		cy.get('a[href="#/tags/' + data.newName.toLowerCase() + '/"]').should(
			"contain",
			data.newName
		);
		cy.deleteTag(data.newName);
		cy.wait(1000);
	});

	afterEach(() => {
		cy.closeDashBoardSession();
	});
});

Cypress.on("uncaught:exception", (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false;
});

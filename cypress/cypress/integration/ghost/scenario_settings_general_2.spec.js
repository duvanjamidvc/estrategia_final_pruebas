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
	cy.screenshot('edit-general-tittle/clicking-login')
  });

  it("update tittle and subtittle  ", () => {
	const stage = "edit-general-tittle";
    const url = Cypress.config("baseUrl");
    const tittle = cy.faker.company.companyName();
    const subtittle = cy.faker.company.catchPhrase();
    cy.goToGeneralSettings(stage);
    cy.get(
      ".gh-main-section:nth-child(2) > .gh-expandable > .gh-expandable-block:nth-child(1) > .gh-expandable-header > button "
    ).click();
	cy.screenshot(`${stage}/click-section-tittle`);
    cy.get("div[class='gh-setting-content-extended']")
      .contains("The name of your site")
      .parent()
      .within(() => {
        cy.get("input[type='text']").invoke("val", "").type(tittle);
      });
    cy.get("div[class='gh-setting-content-extended']")
      .contains("Used in your theme, meta data and search results")
      .parent()
      .within(() => {
        cy.get("input[type='text']").invoke("val", "").type(subtittle);
      });
    cy.get(
      ".gh-canvas-header > .gh-canvas-header-content > .view-actions "
    ).click();
	cy.screenshot(`${stage}/click-save-section-tittle`);
    cy.wait(5000);
    cy.visit(url);
	cy.screenshot(`${stage}/public-url`);
    cy.get("body").should("contain", tittle); 
    cy.get("body").should("contain", subtittle); 
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

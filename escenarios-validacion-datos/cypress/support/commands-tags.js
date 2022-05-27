import TagsPage from "../integration/pageObject/tagsPage";
let tagsPage = new TagsPage();

Cypress.Commands.add("NewTagNameColor", (newName, newColor) => {
	tagsPage.inputTagName().type(newName);
	tagsPage.inputTagColor().first().type(newColor);
	tagsPage.buttonSaveTag().click();
	cy.wait(1000);
});

Cypress.Commands.add("goEditTag", (newName) => {
	cy.get('a[href="#/tags/' + newName.toLowerCase().replace(" ", "-") + '/"]')
	.first()
	.click();
});

Cypress.Commands.add("NewTagName", (newName) => {
	tagsPage.inputTagName().type(newName);
	tagsPage.buttonSaveTag().click();
	cy.wait(1000);
});

Cypress.Commands.add("NewTagSlug", (newSlug, newName) => {
	tagsPage.inputTagName().type(newName);
	cy.get('[id="tag-slug"]').type(newSlug);
	tagsPage.buttonSaveTag().click();
	cy.wait(1000);
});

Cypress.Commands.add("newTag", (newName) => {
	
	//asigna variables
	tagsPage.inputTagName().type(newName);
	//guarda
	tagsPage.buttonSaveTag().click();
	cy.wait(2000);
	//leva a tags de nuevo
	tagsPage.menuOptionTag().parent().first().click();
});


Cypress.Commands.add("deleteTag", (newTag) => {
	tagsPage.menuOptionTag().parent().first().click();
	//navega a tag
	cy.get('a[href="#/tags/' + newTag.toLowerCase() + '/"]')
		.first()
		.click();
	//elimina descripción tag
	cy.get(".gh-main > .gh-canvas > div > .gh-btn ").click();
	cy.wait(3000);
	cy.get(
		".fullscreen-modal > .modal-content > .modal-footer > .gh-btn-red "
	).click();
	cy.wait(3000);
});


Cypress.Commands.add("NewTagDescription", (newDescription,newName) => {
	cy.get('[id="tag-name"]').type(newName);
	cy.get('[id="tag-description"]').type(newDescription);
	tagsPage.buttonSaveTag().click();
	cy.wait(1000);
});

Cypress.Commands.add("goToNewTag", () => {
	cy.get('a[href="#/tags/"]').parent().first().click();
	cy.wait(3000);
	cy.get('section.view-actions>a[href="#/tags/new/"]').click();
});

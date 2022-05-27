Cypress.Commands.add("login", (username, password) => {
	const url = Cypress.config("baseUrlDashBoard");
	cy.log(`Logging in as ${username}`);
	cy.visit(url);
	cy.get('[name="identification"]').type(username);
	cy.get('[name="password"]').type(password);
	cy.get("#ember11").click();
	cy.intercept("GET", "**/ghost/**").as("goToDashBoard");
	cy.wait("@goToDashBoard")
		.its("response.statusCode")
		.should("be.oneOf", [200]);
});

/**
 *  Comando para cerrar la session del dashboard
 */
Cypress.Commands.add("closeDashBoardSession", () => {
	const url = Cypress.config("baseUrlDashBoard");
	cy.visit(url);

	cy.intercept("GET", "**/ghost/**").as("goToDashBoardToCloseSession");
	cy.wait("@goToDashBoardToCloseSession");

	cy.get(".gh-user-avatar").parent().parent().click();
	cy.get(".user-menu-signout").click();
});

Cypress.Commands.add("goToDashBoard", () => {
	const url = Cypress.config("baseUrlDashBoard");
	cy.visit(url);
	cy.intercept("GET", "**/ghost/**").as("goToDashBoard");
	cy.wait("@goToDashBoard");
});

Cypress.Commands.add("goToPublicPage", () => {
	const url = Cypress.config("baseUrl");
	cy.visit(url);
	cy.intercept("GET", "**/ghost/**").as("goToPublicPage");
	cy.wait("@goToPublicPage");
});

Cypress.Commands.add("newTag", (newTag, stage) => {
	const colorTag = cy.faker.datatype.hexaDecimal(8).split("0x")[1];
	cy.get('a[href="#/tags/"]').parent().first().click();
	cy.wait(5000);
	cy.screenshot(`${stage}/clicking-tags`);
	//da clic en crear tag
	cy.get('section.view-actions>a[href="#/tags/new/"]').click();
	cy.screenshot(`${stage}/clicking-new-tag`);
	//asigna variables
	cy.get('[id="tag-name"]').type(newTag);
	cy.get('[name="accent-color"]').first().type(colorTag);
	//guarda
	cy.get(
		".gh-canvas-header > .gh-canvas-header-content > .view-actions "
	).click();
	cy.wait(1000);
	cy.screenshot(`${stage}/clicking-save-tag`);
	cy.wait(3000);
	//leva a tags de nuevo
	cy.get('a[href="#/tags/"]').parent().first().click();
});

Cypress.Commands.add("editTag", (descEdit, newTag, stage) => {
	cy.get('a[href="#/tags/"]').parent().first().click();
	cy.screenshot(`${stage}/clicking-tags-edit`);
	//navega a tag
	cy.get('a[href="#/tags/' + newTag.toLowerCase() + '/"]')
		.first()
		.click();
	cy.screenshot(`${stage}/clicking-tag-detail`);
	//actualiza descripción tag
	cy.get('[id="tag-description"]').type(descEdit);
	//guarda
	cy.get(
		".gh-canvas-header > .gh-canvas-header-content > .view-actions "
	).click();
	cy.wait(4000);
	cy.screenshot(`${stage}/clicking-tag-edit-save`);
	//regresa a tags
	cy.get('a[href="#/tags/"]').parent().first().click();
});

Cypress.Commands.add("deleteTag", (newTag, stage) => {
	cy.get('a[href="#/tags/"]').parent().first().click();
	cy.screenshot(`${stage}/clicking-tags-edit`);
	//navega a tag
	cy.get('a[href="#/tags/' + newTag.toLowerCase() + '/"]')
		.first()
		.click();
	cy.screenshot(`${stage}/clicking-tag-detail`);
	//elimina descripción tag
	cy.get('.gh-main > .gh-canvas > div > .gh-btn ').click();
	cy.screenshot(`${stage}/clicking-delete-tag`);
	cy.wait(3000);
	cy.get('.fullscreen-modal > .modal-content > .modal-footer > .gh-btn-red ').click()
	cy.screenshot(`${stage}/clicking-delete-tag-confirm`);
	cy.wait(3000);
});

Cypress.Commands.add("goToGeneralSettings", (stage) => {
	cy.get('a[href="#/settings/"]').first().click();
	cy.screenshot(`${stage}/clicking-settings`);
	cy.get('a[href="#/settings/general/"]').first().click();
	cy.screenshot(`${stage}/clicking-general-settings`);
});

Cypress.Commands.add("newMember", (emailMember, stage) => {
	const newMember = cy.faker.name.firstName();
	const noteMember = cy.faker.lorem.paragraph();
	cy.get('a[href="#/members/"]:visible').parent().first().click();
	cy.screenshot(`${stage}/clicking-members`);
	cy.get('a[href="#/members/new/"]').click();
	//asignar variables
	cy.screenshot(`${stage}/clicking-new-members`);
	cy.get('[id="member-name"]').type(newMember, { force: true });
	cy.get('[id="member-email"]').type(emailMember);
	cy.get('[id="member-note"]').type(noteMember);
	//guardar
	cy.get(
		".gh-canvas-header > .gh-canvas-header-content > .view-actions "
	).click();
	cy.screenshot(`${stage}/clicking-new-members-save`);
});
Cypress.Commands.add("deleteMember", (idMember, stage) => {
	//ingresa a miembro a eliminar
	cy.get('a[href="#/members/' + idMember + '/"]')
		.first()
		.click();
	//clic en eliminar
	cy.screenshot(`${stage}/clicking-members-delete`);
	cy.get(".view-actions > .dropdown > .gh-btn > span > svg").click();
	cy.get(
		".view-actions > .dropdown > .dropdown > li:nth-child(2) > .mr2"
	).click();
	cy.screenshot(`${stage}/clicking-member-delete-option`);
	cy.wait(400);
	//click en modal aceptar
	cy.get(".modal-footer > .gh-btn.gh-btn-red.gh-btn-icon.ember-view")
		.first()
		.click();
	cy.screenshot(`${stage}/clicking-member-delete-confirm`);
});

Cypress.Commands.add("editMember", (idMember,stage) => {
	const newMember = cy.faker.name.firstName();
	const noteMember = cy.faker.lorem.paragraph();
	//ingresa a miembro a eliminar
	cy.get('a[href="#/members/' + idMember + '/"]')
		.first()
		.click();
	cy.screenshot(`${stage}/clicking-members-detail`);
	//asignar variables
	cy.get('[id="member-name"]').type(newMember, { force: true });
	cy.get('[id="member-note"]').clear().type(noteMember);
	//guardar
	cy.get(".view-actions > button").click();
	cy.screenshot(`${stage}/clicking-members-edit-save`);
	// esperamos que el guardado sea existoso
	cy.intercept("**/ghost/api/**").as("addMember");
	cy.wait("@addMember")
		.its("response.statusCode")
		.should("be.oneOf", [200, 201]);

	// esperamos que el guardado sea existoso
	cy.intercept("**/ghost/api/**").as("goBack");
	cy.get(".gh-canvas-title > a").click();
	cy.wait("@goBack")
		.its("response.statusCode")
		.should("be.oneOf", [200, 201]);
});

Cypress.Commands.add("setPassword", (newPassword, stage) => {
	cy.get("body").then(($body) => {
		if ($body.find('[name="general[password]"]').length <= 0) {
			cy.get(
				"body > div.gh-app > div > main > section > div:nth-child(4) > section > div > div.gh-expandable-header > div.for-switch > label > span"
			).click();
		}
		cy.screenshot(`${stage}/clicking-on-general-password`);
		//asigna contraseña
		cy.get('[name="general[password]"]')
			.invoke("val", "")
			.type(newPassword);
		cy.screenshot(`${stage}/clicking-general-password-save`);
	});
	//guarda
	cy.get(
		".gh-canvas-header > .gh-canvas-header-content > .view-actions "
	).click();
});

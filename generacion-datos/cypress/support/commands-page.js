/**
 * Comando para publicar una pagina 
 */
Cypress.Commands.add('publishPage', () => {
	// vamos al menu publicar
	cy.get('.gh-publishmenu.ember-view').click();
	// clic en el boton publicar
	cy.intercept('**/ghost/api/**').as('publish');
	cy.get('.gh-publishmenu-footer>button.gh-publishmenu-button').click();
	cy.wait('@publish').its('response.statusCode').should('be.oneOf', [200, 201]);
});

/**
 *  Comando para ir a crear un page
 */
 Cypress.Commands.add('GoCreatePage', () => {
	// accede al menu pages
	cy.get('.gh-nav-list.gh-nav-manage  li  a[href="#/pages/"]').click();
	// clic en el boton de crear pagina
	cy.get('section.view-actions>a[href="#/editor/page/"]').click({ force: true });	
});

/**
 *  Comando para publicar un page con expert
 */
 Cypress.Commands.add('CreatePageExcerpt', (newTittle,newExcerpt) => {
	cy.get('textarea.gh-editor-title').clear().type(newTittle);
	cy.get('.settings-menu-toggle').click();
	cy.get('#custom-excerpt').type(newExcerpt);
	cy.wait(5000)
});

/**
 * Comando para validar por el titulo de la pagina o post, si esta en estado borrador
 */
Cypress.Commands.add('validateDraftStatePage', (title, ocurrencias) => {
	cy.get('.view-container ol li:nth-child(2) .gh-post-list-title .gh-content-entry-title').contains(title).should('have.length', ocurrencias);
});

/**
 *  Comando para publicar un page con Canonical URL
 */
 Cypress.Commands.add("CreatePageCanonicalURL", (newTittle, newUrl) => {
	cy.get("textarea.gh-editor-title").clear().type(newTittle);
	cy.get(".settings-menu-toggle").click();
	cy.get("form > .nav-list > .nav-list-item:nth-child(1) > button").click();
	cy.get('[name="post-setting-canonicalUrl"]').type(newUrl);
});

/**
 *  Comando para publicar un page 
 */
 Cypress.Commands.add("CreatePageTittle", (newTittle) => {
	cy.get("textarea.gh-editor-title").clear().type(newTittle);
	cy.get('.koenig-editor__editor-wrapper > .koenig-editor__editor').click()
});

Cypress.Commands.add("CreatePageTwitterDescription", (newTittle, newDescriptionT) => {
	cy.get("textarea.gh-editor-title").clear().type(newTittle);
	cy.get(".settings-menu-toggle").click();
	cy.get("form > .nav-list > .nav-list-item:nth-child(2) > button").click();
	cy.get('[name="post-setting-twitter-description"]').type(newDescriptionT);
});

/**
 * Comando para publicar una pagina con fecha invalida
 */
 Cypress.Commands.add('publishPageDate', (newTittle,newDate) => {
	cy.get('textarea.gh-editor-title').clear().type(newTittle);
	cy.get('.koenig-editor__editor-wrapper > .koenig-editor__editor').click()
	cy.wait(3000)
	// vamos al menu publicar
	cy.get('.gh-publishmenu.ember-view').click();
	cy.get('.gh-date-time-picker-date > input').invoke("val", "").type(newDate);
	// clic en el boton publicar
	cy.get('.gh-publishmenu-footer>button.gh-publishmenu-button').click();
});
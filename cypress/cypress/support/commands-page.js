
/**
 *  Comando para crear un post
 */
Cypress.Commands.add('createPage', (title, content,stage ) => {

	cy.log(`Creando pagina con titulo ${title}  y contenido  ${content}`);

	const url = Cypress.config('baseUrlDashBoard');
	cy.visit(url);
	// accede al menu pages
	cy.get('.gh-nav-list.gh-nav-manage  li  a[href="#/pages/"]').click();
	cy.screenshot(`${stage}/clicking-pages`);
	// // esperamos que cargue el contenido
	// cy.intercept('**/ghost/**').as('createPage');
	// cy.wait('@createPage');
	// clic en el boton de crear pagina
	cy.get('section.view-actions>a[href="#/editor/page/"]').click({ force: true });
	cy.screenshot(`${stage}/clicking-create-page`);
	//llena el titulo del post 
	cy.get('textarea.gh-editor-title').clear().type(title);
	// llena el contenido 
	cy.get('article.koenig-editor').type(content);
	// esperamos que el guardado sea existoso
	cy.intercept('**/ghost/api/**').as('publishPage');
	cy.screenshot(`${stage}/clicking-publish-page`);
	cy.wait('@publishPage').its('response.statusCode').should('be.oneOf', [200, 201]);
	// vamos al menu publicar
	cy.get('.gh-publishmenu.ember-view').click();
	// clic en el boton publicar
	cy.get('.gh-publishmenu-footer>button.gh-publishmenu-button').click();
	cy.screenshot(`${stage}/clicking-confirm-publish-page`);
	// vamos atras
	cy.get('.gh-editor-back-button').click();
});



Cypress.Commands.add('createPageLink', (title,stage) => {

	let titleToLink = title.replace(/\s/gi, '-').toLowerCase();

	cy.log(`Creando link de pagina con titulo ${title}  y link to ${titleToLink}`);

	const url = Cypress.config('baseUrlDashBoard');
	cy.visit(url);
	// accede al menu de configuracion
	cy.get('a[href="#/settings/"]').click();
	cy.screenshot(`${stage}/clicking-settings`);
	// clic en el boton navegacion
	cy.get('a[href="#/settings/navigation/"]').click();
	cy.screenshot(`${stage}/clicking-settings-navigation`);
	//llena el titulo de la pagina
	cy.get('#settings-navigation .gh-blognav-line  .gh-blognav-label').last().find('input.ember-text-field').clear().type(title);

	// lena el link de la pagina
	cy.get('#settings-navigation  .gh-blognav-line  .gh-blognav-url').last().find('input.ember-text-field').type(titleToLink);
	// da clic en guardar
	cy.get('.view-actions>button').click();
	cy.screenshot(`${stage}/clicking-settings-navigation-save`);


});

Cypress.Commands.add('deletePageLinkByTitle', (title,stage) => {

	let titleToLink = title.replace(/\s/gi, '-').toLowerCase();

	cy.log(`Eliminando link de pagina con titulo ${title}  y link to ${titleToLink}`);

	const url = Cypress.config('baseUrlDashBoard');
	cy.visit(url);
	// accede al menu de configuracion
	cy.get('a[href="#/settings/"]').click();

	// clic en el boton navegacion
	cy.get('a[href="#/settings/navigation/"]').click();
	cy.screenshot(`${stage}/clicking-settings-navigation-delete`);
	//llena el titulo de la pagina
	cy.get('#settings-navigation .gh-blognav-line  .gh-blognav-label')
		.find('input.ember-text-field')
		.each(($input) => {
			const text = $input.val();
			if (text == title) {
				cy.wrap($input)
					.parents('.gh-blognav-item')
					.find('>.gh-blognav-delete')
					.click();
			}
		});

	//abrimos el menu lateral derecho
	cy.get('section.view-actions>button').click({ force: true });
	cy.screenshot(`${stage}/clicking-settings-navigation-delete-save`);
});
/**
 *  Comando para eliminar el primer post basado en el titulo
 */
Cypress.Commands.add('deletePageByTitle', (title,stage) => {
	cy.log(`Boorando pagina con titulo ${title} `);

	const url = Cypress.config('baseUrlDashBoard');
	cy.visit(url);
	// accede al menu pages
	cy.get('.gh-nav-list.gh-nav-manage  li  a[href="#/pages/"]').click();
	cy.screenshot(`${stage}/clicking-pages-delete`);
	// // esperamos que cargue el contenido
	// cy.intercept('**/ghost/api/**').as('deletePageByTitle');
	// cy.wait('@deletePageByTitle');

	//buscamos la pagina en la lista y accedemos
	cy.get('li.gh-posts-list-item>a.gh-post-list-title>h3.gh-content-entry-title')
		.contains(title)
		.parents('.gh-posts-list-item')
		.click();
	cy.screenshot(`${stage}/clicking-pages-detail`);
	//abrimos el menu lateral derecho
	cy.get('.settings-menu-toggle').click();
	// eliminarmos el post
	cy.get('.settings-menu-delete-button').click();
	cy.screenshot(`${stage}/clicking-delete-page`);
	// damos clic en eliminar en el mensaje de confirmacion
	cy.get(' .modal-content > .modal-footer > .ember-view ').click();
	cy.screenshot(`${stage}/clicking-delete-page-confirm`);
});


/**
 *  Comando para validar numero de veces que aparece una pagina publicado
 */
Cypress.Commands.add('validatePageByTitleAndLink', (title, ocurrencias,stage) => {
	let titleToLink = title.replace(/\s/gi, '-').toLowerCase();
	cy.log(`Validando que la pagina con titulo ${title}  y  ${titleToLink} este publicada`);
	const url = Cypress.config('baseUrl');
	cy.visit(url);
	cy.screenshot(`${stage}/validate-page`);
	cy.get('div.gh-head-menu>.nav>li>a[href$="/' + titleToLink + '/"]').should('have.length', ocurrencias);
});


/**
 *  Comando para validar numero de veces que aparece una pagina publicado
 */
Cypress.Commands.add('validatePageLoadPublicLink', (title,stage) => {
	let titleToLink = title.replace(/\s/gi, '-').toLowerCase();
	cy.log(`Validando que la pagina con titulo ${title}  y  ${titleToLink} este publicada`);
	const url = Cypress.config('baseUrl');
	cy.visit(url + '/' + titleToLink + '/');
	cy.screenshot(`${stage}/validate-page-load-public-link`);
	cy.url().should('include', titleToLink);
});

/**
 *  Comando para crear un post sin volver atras
 */
Cypress.Commands.add('createPageWithoutBack', (title, content,stage ) => {

	cy.log(`Creando pagina con titulo ${title}  y contenido  ${content}`);

	const url = Cypress.config('baseUrlDashBoard');
	cy.visit(url);
	// accede al menu pages
	cy.get('.gh-nav-list.gh-nav-manage  li  a[href="#/pages/"]').click();
	cy.screenshot(`${stage}/click-pages`);
	// clic en el boton de crear pagina
	cy.get('section.view-actions>a[href="#/editor/page/"]').click({ force: true });
	cy.screenshot(`${stage}/click-new-page`);
	//llena el titulo del post 
	cy.get('textarea.gh-editor-title').clear().type(title);
	// llena el contenido 
	cy.get('article.koenig-editor').type(content);
	// esperamos que el guardado sea existoso
	cy.intercept('**/ghost/api/**').as('publishPage');
	cy.wait('@publishPage').its('response.statusCode').should('be.oneOf', [200, 201]);
	// vamos al menu publicar
	cy.get('.gh-publishmenu.ember-view').click();
	cy.screenshot(`${stage}/click-public-menu-page`);
	// clic en el boton publicar
	cy.get('.gh-publishmenu-footer>button.gh-publishmenu-button').click();
	cy.screenshot(`${stage}/click-public-page`);
});

/**
 * Comando para publicar una pagina 
 */
Cypress.Commands.add('publishPage', (stage) => {
	// vamos al menu publicar
	cy.get('.gh-publishmenu.ember-view').click();
	cy.screenshot(`${stage}/click-publish-page`);
	// clic en el boton publicar
	cy.intercept('**/ghost/api/**').as('publish');
	cy.get('.gh-publishmenu-footer>button.gh-publishmenu-button').click();
	cy.wait('@publish').its('response.statusCode').should('be.oneOf', [200, 201]);
});

/**
 *  Comando para validar una pagina publicada desde la opcion de configuraciones
 */
Cypress.Commands.add('validatePublishPageFromSettings', (stage) => {
	cy.get('.settings-menu-toggle').click();
	cy.wait(100);
	cy.get('.post-view-link').click();
	cy.screenshot(`${stage}/validate-public-page-settings`);
});

/**
 * Comando para filtrar paginas publicadas
 */
Cypress.Commands.add('filterPublishPage', (stage) => {
	cy.wait(100);
	cy.get('.view-actions .gh-contentfilter .gh-contentfilter-type .ember-basic-dropdown-trigger').click();
	cy.screenshot(`${stage}/filter-public-page-option`);
	cy.get('.ember-power-select-options li[data-option-index="2"]').click();
	cy.screenshot(`${stage}/filter-public-page`);
});

/**
 * Comando para filtrar paginas en borrador
 */
Cypress.Commands.add('filterDraftPage', (stage) => {
	cy.wait(100);
	cy.get('.view-actions .gh-contentfilter .gh-contentfilter-type .ember-basic-dropdown-trigger').click();
	cy.screenshot(`${stage}/click-filter-draft-page-option`);
	cy.get('.ember-power-select-options li[data-option-index="1"]').click();
	cy.screenshot(`${stage}/click-filter-draft-page`);
});


/**
 * Comando para seleccionar y editar la primera pagina de la lista de paginas
 */
Cypress.Commands.add('selectFirstPageOfListAndEdit', (stage) => {
	cy.get('.view-container ol li:nth-child(2)').click();
	cy.screenshot(`${stage}/select-first-page-of-list`);
	cy.get('.koenig-editor__editor-wrapper').type(cy.faker.lorem.sentence());
});

/**
 * Comando para seleccionar y editar para cambiar el estado a borrador de la primera pagina de la lista de paginas  
 */
Cypress.Commands.add('selectFirstPageOfListAndChangeState', (stage) => {
	cy.get('.view-container ol li:nth-child(2)').click();
	cy.screenshot(`${stage}/select-first-page-of-list`);
	cy.get('.gh-publishmenu').click();
	cy.screenshot(`${stage}/select-first-page-of-list-option`);
	cy.get('.gh-publishmenu-radio:not(.active)').click();
	cy.screenshot(`${stage}/select-first-page-of-list-radio-active`);
	cy.get('.gh-publishmenu-button').click();
	cy.screenshot(`${stage}/select-first-page-of-list-click`);
	cy.get('.gh-main').click();
	cy.wait(200);
});


/**
 *  Comando para crear un post sin volver atras
 */
Cypress.Commands.add('createPageWithTag', (title, content, tag,stage) => {

	cy.log(`Creando pagina con titulo ${title}  y contenido  ${content}`);

	const url = Cypress.config('baseUrlDashBoard');
	cy.visit(url);
	// accede al menu pages
	cy.get('.gh-nav-list.gh-nav-manage  li  a[href="#/pages/"]').click();
	cy.screenshot(`${stage}/click-pages`);
	// clic en el boton de crear pagina
	cy.get('section.view-actions>a[href="#/editor/page/"]').click({ force: true });
	cy.screenshot(`${stage}/click-new-pages`);
	//llena el titulo del post 
	cy.get('textarea.gh-editor-title').clear().type(title);
	// llena el contenido 
	cy.get('article.koenig-editor').type(content);
	
	cy.get('.settings-menu-toggle').click();
	cy.screenshot(`${stage}/click-options-pages`);
	cy.get('#tag-input').type(tag);

	cy.get('.ember-power-select-option')
		.contains(tag)
		.first()
		.click();
	
	// esperamos que el guardado sea existoso
	cy.intercept('**/ghost/api/**').as('publishPage');
	cy.screenshot(`${stage}/click-public-pages`);
	cy.wait('@publishPage').its('response.statusCode').should('be.oneOf', [200, 201]);
	
});

/**
 * Comando para validar por el titulo de la pagina o post, si esta en estado borrador
 */
Cypress.Commands.add('validateDraftStatePage', (title, ocurrencias) => {
	cy.get('.view-container ol li:nth-child(2) .gh-post-list-title .gh-content-entry-title').contains(title).should('have.length', ocurrencias);
});


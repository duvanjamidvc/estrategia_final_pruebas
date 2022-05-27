/// <reference types="cypress-e2e" />
/// <reference types="../../support" />

Cypress.on('uncaught:exception', (err, a) => {
	return false;
});

let usuarios;
describe('Crear una subcategoría de filtrado los post publicados', () => {

	before(() => {
		cy.fixture('users').then(users => {
			usuarios = users;
		});
	});

	beforeEach(() => {
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
		cy.screenshot('filter-post/clicking-login');
		cy.screenshot('create-post-nav/clicking-login');
		cy.screenshot('create-post-delete-nav/clicking-login')
	});

	it('Ingresar a post publicados y crear filtro', () => {
		const stage = "filter-post";

		const url = Cypress.config('baseUrlDashBoard');
		cy.visit(url);

		const newTag = cy.faker.commerce.productAdjective().toUpperCase()+cy.faker.datatype.number();
		cy.newTag(newTag,stage);

		// accede al menu de post publicados
		cy.get('.gh-nav-view-list > li > a[href="#/posts/?type=published"]').click();
		cy.screenshot(`${stage}/clicking-post-published`);
		// // esperamos que cargue la pagina
		
		cy.wait(3000);

		// da clic en el menu de filtro por tag
		cy.get('.gh-contentfilter > .gh-contentfilter-tag').click();
		cy.screenshot(`${stage}/clicking-filter-tag`);
		// selecciona el segundo tag desplegado
		cy.get('ul.ember-power-select-options').children('li').contains(newTag).click();
		cy.screenshot(`${stage}/clicking-filter-tag-option`);
		// da clic en el segundo tag desplegado

		// da clic en el boton para guardar el filtro 
		cy.get('.view-actions > .gh-contentfilter > .dropdown > .gh-btn-save-view').click()
		// en el popUp pone un nombre al filtro
		cy.screenshot(`${stage}/clicking-filter-tag-option-save`);
		cy.get('#view-name').clear().type(newTag.trim());

		// le pone un color al filtro
		cy.get('#view-pink').parent().click();
		cy.screenshot(`${stage}/clicking-filter-tag-color`);
		// da clic en guardar
		cy.get(' .modal-content > .modal-footer > .ember-view ').click()
		cy.screenshot(`${stage}/clicking-filter-tag-save`);
		// valida el que el filtro se muestre en el menu lateral
		cy.get(`.gh-nav-view-list  li  a[title="${newTag.trim()}"]`).children('span.gh-nav-viewname').should('have.text', newTag.trim());
		cy.goToDashBoard();
		cy.deleteTag(newTag,stage);
	});

	it('Crear post publico', () => {
		const stage = "create-post-nav";
		let title = 'Titulo del post' + new Date().getTime();
		let contenido = cy.faker.lorem.paragraph();

		cy.createPost(title, contenido,stage);

		cy.validatePostPublicByTitle(title, 1,stage);

	});


	it('Eliminar post publicado', () => {
		const stage = "create-post-delete-nav";
		let title = 'Titulo del post' + new Date().getTime();
		let contenido = cy.faker.lorem.paragraph();

		cy.createPost(title, contenido,stage);

		cy.closeDashBoardSession();

		cy.validatePostPublicByTitle(title, 1,stage);

		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);

		cy.deletePostByTitle(title,stage);

		cy.validatePostPublicByTitle(title, 0,stage);



	});

	afterEach(function () {
		cy.closeDashBoardSession();
	});

});

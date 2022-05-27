class TagsPage {
	inputTagName() {
		return cy.get('[id="tag-name"]');
	}

	inputTagColor() {
		return cy.get('[name="accent-color"]');
	}

	menuOptionTag() {
		return cy.get('a[href="#/tags/"]');
	}

	buttonSaveTag() {
		return cy.get(
			".gh-canvas-header > .gh-canvas-header-content > .view-actions "
		);
	}

	buttonLeaveNewTag() {
		return cy.get(".modal-footer > .gh-btn-red > span")
	}
}

export default TagsPage;

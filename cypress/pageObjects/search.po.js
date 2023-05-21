export const SearchPage = {
  getCancelSearchBtn() {
    return cy.get(".aa-DetachedCancelButton", { timeout: 10000 });
  },
  getClearBtn() {
    return cy.get(".aa-ClearButton", { timeout: 10000 });
  },
  clickSearchBtn() {
    return cy
      .get(".aa-Autocomplete", { timeout: 10000 })
      .should("exist")
      .within(() => {
        cy.get(".aa-DetachedSearchButton", { timeout: 10000 })
          .as("searchBtn")
          .should("exist");
        cy.get("@searchBtn")
          .trigger("mouseover", { force: true })
          .click({ force: true });
      });
  },
  getSearchInput() {
    return cy.get(".aa-Input");
  },
  getSearchModal() {
    return cy.get(".aa-DetachedContainer--modal");
  },
  getSearchResultItems(sourceId) {
    return cy
      .get(`[data-autocomplete-source-id='${sourceId}']`, { timeout: 10000 })
      .find(".aa-Item");
  },
  performSearch(searchTerm) {
    SearchPage.clickSearchBtn();
    SearchPage.getSearchModal().should("be.visible");
    SearchPage.getSearchInput().type(searchTerm);
    SearchPage.getSearchInput().should("have.value", searchTerm, {
      matchCase: false,
    });
  },
  checkSearchResultsContainText(resultType, searchTerm) {
    SearchPage.getSearchResultItems(resultType)
      .as(`${resultType}ListItems`)
      .contains(new RegExp(searchTerm, "i"), { timeout: 10000 })
      .should("have.length.at.least", 1);
  },
  checkSearchResultItemsHaveLinks(resultType) {
    cy.get(`@${resultType}ListItems`).each(($el) => {
      const $anchor = $el.find("a");
      expect($anchor).to.have.length(1);
      expect($anchor).to.have.attr("href");
    });
  },
  checkPageitemsHaveLinks() {
    cy.log("**checks 'pages' contain 'visit this link' links**");
    SearchPage.getSearchResultItems("pages")
      .as("pageItems")
      .should("have.length.at.least", 1);
    cy.get("@pageItems").each(($el) => {
      const $anchor = $el.find("a");
      expect($anchor).to.have.length(1);
      expect($anchor).to.have.attr("href");
    });
  },
};

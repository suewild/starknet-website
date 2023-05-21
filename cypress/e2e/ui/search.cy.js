import {} from "../../support/command";
import { SearchPage } from "../../pageObjects/search.po";

describe("check search results", () => {
  beforeEach(() => {
    cy.log("**intercept Algolia API calls**");
    cy.intercept(
      "POST",
      "https://vhyjo45ti4-dsn.algolia.net/1/indexes/*/queries?*"
    ).as("searchResults");
    cy.log("**visit home page**");
    cy.visit("/");
    cy.log("**check the page is loaded**");
    cy.location("pathname").should("eq", "/en");
    cy.log(
      "**check header buttons are visible - search, color-mode, langauges**"
    );
    cy.get("div.chakra-stack.css-iew95a", {
      timeout: 10000,
    }).should("be.visible");
    cy.log("**perform search**");
    SearchPage.performSearch("cairo");
    SearchPage.getSearchInput().should("have.value", "cairo", {
      matchCase: false,
    });
    cy.log("**wait for search results to load**");
    cy.wait("@searchResults", { timeout: 10000 });
  });

  it("checks search results dislay under posts and documentation. Also checks the pages section displays", () => {
    cy.log("**checks 'posts' search results contain search term**");
    SearchPage.getSearchResultItems("posts")
      .as("postListItems")
      .contains(new RegExp("cairo", "i"), { timeout: 10000 })
      .should("have.length.at.least", 1);
    cy.log("**checks each 'post' search result has a link**");
    cy.get("@postListItems").each(($el) => {
      const $anchor = $el.find("a");
      expect($anchor).to.have.length(1);
      expect($anchor).to.have.attr("href");
    });
    cy.log("**checks 'documentation' search results contain search term**");
    SearchPage.getSearchResultItems("docs")
      .as("docListItems")
      .contains(new RegExp("cairo", "i"), { timeout: 10000 })
      .should("have.length.at.least", 1);
    cy.log("**checks each 'documentation' search result has a link**");
    cy.get("@docListItems").each(($el) => {
      const $anchor = $el.find("a");
      expect($anchor).to.have.length(1);
      expect($anchor).to.have.attr("href");
    });
    cy.log("**checks 'pages' contain 'visit this link' links**");
    SearchPage.getSearchResultItems("pages")
      .as("pageItems")
      .should("have.length.at.least", 1);
    cy.get("@pageItems").each(($el) => {
      const $anchor = $el.find("a");
      expect($anchor).to.have.length(1);
      expect($anchor).to.have.attr("href");
    });
    cy.log("**clicks on clear**");
    SearchPage.getClearBtn().should("be.visible").trigger("mouseover").click();
    cy.log("**check search input is empty**");
    SearchPage.getSearchInput().should("have.value", "");
    cy.log("**click on cancel**");
    SearchPage.getCancelSearchBtn()
      .should("be.visible")
      .trigger("mouseover")
      .click();
    cy.log("**check search modal is closed**");
    SearchPage.getSearchModal().should("not.exist");
  });

  it.only("checks search results dislay under posts and documentation. Also checks the pages section displays", () => {
    cy.log("**check 'posts' search results contain search term**");
    SearchPage.checkSearchResultsContainText("posts", "cairo");
    cy.log("**check each 'post' search result has a link**");
    SearchPage.checkSearchResultItemsHaveLinks("posts");
    cy.log("**check 'documentation' search results contain search term**");
    SearchPage.checkSearchResultsContainText("docs", "cairo");
    cy.log("**check each 'documentation' search result has a link**");
    SearchPage.checkSearchResultItemsHaveLinks("docs");
    cy.log("**check 'pages' contain links**");
    SearchPage.checkPageitemsHaveLinks();
    cy.log("**clear search**");
    SearchPage.getClearBtn().should("be.visible").trigger("mouseover").click();
    cy.log("**check search input is empty**");
    SearchPage.getSearchInput().should("have.value", "");
    cy.log("**cancel search**");
    SearchPage.getCancelSearchBtn()
      .should("be.visible")
      .trigger("mouseover")
      .click();
    cy.log("**check search modal is closed**");
    SearchPage.getSearchModal().should("not.exist");
  });
});

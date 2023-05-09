import {} from "../../support/command";

function testLinks(selector, description) {
  cy.log(`**checks '${description}' links are visible**`);
  cy.get(selector, { timeout: 10000 }).should("exist");
  cy.verifyLinksStatusBySelector(selector);
}

describe("Header and footer Links", () => {
  beforeEach(() => {
    cy.log("**visit home page**");
    cy.visit("/");
    cy.log("**check the page is loaded**");
    cy.location("pathname").should("eq", "/en");
  });

  it.only("checks links return 200 OK Status code for header and footer", () => {
    cy.log("**check all links in the header return 200**");
    testLinks("[role='navigation'] [role='group'] a", "header");
    cy.log("**check all links in the footer return 200**");
    testLinks("[role='contentinfo'] a", "footer");
  });
});

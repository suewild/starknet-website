import {} from "../../support/command";

describe("header and footer", () => {
  beforeEach(() => {
    cy.log("**visit home page**");
    cy.visit("/");
    cy.log("**checks pathname contains default language**");
    cy.location("pathname").should("eq", "/en");
    cy.log("**checks top navigation menu is visible**");
    cy.get("div.chakra-button__group.css-kvp5xf", { timeout: 10000 }).should(
      "be.visible"
    );
    cy.log(
      "**checks header buttons are visible - search, color-mode, langauges**"
    );
    cy.get("div.chakra-stack.css-iew95a", {
      timeout: 10000,
    }).should("be.visible");
  });

  it("displays light mode by default", () => {
    cy.log("**check light mode is displayed by default**");
    cy.get("body").should("have.class", "chakra-ui-light");
  });

  it("displays dark mode when clicked", () => {
    cy.log("**click toggle color button**");
    cy.get("button[aria-label='Toggle color mode']")
      .trigger("mouseover")
      .click();
    cy.log("**check dark mode displays**");
    cy.get("body").should("have.class", "chakra-ui-dark");
  });

  it("displays english as default language", () => {
    cy.log("**check 'en' displays as selected language**");
    cy.contains("button[id='popover-trigger-:rb:']", "en").should("exist");
  });

  it("opens languages", () => {
    cy.log("**click languages button**");
    cy.get("button[id='popover-trigger-:rb:']").trigger("mouseover").click();
    cy.log("**checks languages popover displays**");
    cy.get(".chakra-popover__content").should("be.visible");
    cy.log("**checks 'Language Center' heading displays**");
    cy.contains("h6.chakra-heading", "Language Center").should("be.visible");
  });

  it("checks header links return 200", () => {
    cy.testLinksReturn200("[role='navigation'] [role='group'] a", "header");
  });

  it("checks footer links return 200", () => {
    cy.testLinksReturn200("[role='contentinfo'] a", "footer");
  });
});

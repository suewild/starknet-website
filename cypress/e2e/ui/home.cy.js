import {} from "../../support/command";

describe("Home page", () => {
  beforeEach(() => {
    cy.log("**visit home page**");
    cy.visit("/");
    cy.log("**check the page is loaded**");
    cy.location("pathname").should("eq", "/en");
  });

  it("checks all images display", () => {
    cy.checkImagesDisplay();
  });

  it("checks all cards have a parent link", () => {
    cy.get(".chakra-card").closest("a").should("have.class", "chakra-linkbox");
  });
});

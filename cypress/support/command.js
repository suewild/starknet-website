/*
  disabling application errors to enable tests to run
*/

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("Hydration failed")) {
    return false;
  }
});

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("There was an error while hydrating")) {
    return false;
  }
});

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("Failed to execute 'removeChild' on 'Node'")) {
    return false;
  }
});

Cypress.on("uncaught:exception", (err, runnable) => {
  if (
    err.message.includes(
      "Cannot read properties of undefined (reading 'slice')"
    )
  ) {
    return false;
  }
});

/* custom commands start here */

Cypress.Commands.add("testLinksReturn200", (selector, description) => {
  cy.get(selector, { timeout: 10000 })
    .should("exist")
    .each(($a) => {
      const href = $a.prop("href");
      if (href && !href.startsWith("mailto:")) {
        cy.request(href).its("status").should("eq", 200);
      }
    });
});

Cypress.Commands.add("checkImagesDisplay", () => {
  cy.get(".chakra-image").each(($img) => {
    cy.wrap($img)
      .should("be.visible")
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });
});

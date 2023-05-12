// <reference types="Cypress" />

export const InPageNavigationPage = {
  getOnThisPageListItems() {
    return cy.get("[role='list'] li");
  },
  getHeadings() {
    return cy.get("[id^='toc']");
  },
};

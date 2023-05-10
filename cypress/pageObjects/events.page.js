// <reference types="Cypress" />

export const EventsPage = {
  getEvents() {
    return cy.get("div.css-1c54vx9");
  },
  getEventDates() {
    return this.getEvents().find(".chakra-text.css-ir4roe");
  },
  getLink(name) {
    return cy.get("a").contains(name, { matchCase: false });
  },
  getFilterBtns() {
    return cy.get("[dir='column'] button");
  },
  getFilterBtn(buttonName) {
    return cy.get("button").contains(buttonName);
  },
};

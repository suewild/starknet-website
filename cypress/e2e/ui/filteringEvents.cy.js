import { parse, compareAsc } from "date-fns";
import {} from "../../support/command";
import { EventsPage } from "../../pageObjects/events.page.js";

describe("filtering events", () => {
  beforeEach(() => {
    cy.log("**intercept Algolia API calls**");
    cy.intercept(
      "POST",
      "https://vhyjo45ti4-dsn.algolia.net/1/indexes/*/queries?*"
    ).as("events");
    cy.log("**visit events page**");
    cy.visit("/en/events");
    cy.location("pathname").should("eq", "/en/events");
    cy.log("**wait for events to load**");
    cy.wait("@events", { timeout: 10000 });
  });

  it("has 'upcoming events' selected by default", () => {
    cy.log("**checks upcoming events is selected**");
    EventsPage.getLink("upcoming events").should("have.attr", "data-active");
    cy.log("**checks past events is not selected**");
    EventsPage.getLink("past events").should("not.have.attr", "data-active");
    cy.log("**checks upcoming events list is not empty**");
    EventsPage.getEvents().should("be.visible").should("not.be.empty");
  });

  it("has 'upcoming events' in the correct order - closest date first, furthest date away last", () => {
    cy.log("**checks upcoming events is selected**");
    EventsPage.getLink("upcoming events").should("have.attr", "data-active");
    const datesArr = [];
    cy.log("**checks event dates are in ascending order**");
    EventsPage.getEventDates()
      .should("be.visible")
      .should("have.length.greaterThan", 0)
      .each(($date) => {
        const dateText = $date.text().replace(/·.+/, "").trim();
        datesArr.push(dateText);
      })
      .then(() => {
        const datesSorted = [...datesArr].sort((a, b) =>
          compareAsc(
            parse(a, "dd MMMM yyyy", new Date()),
            parse(b, "dd MMMM yyyy", new Date())
          )
        );
        expect(datesArr).to.deep.eq(datesSorted);
      });
  });

  it("has 'past events' in the correct order - closest date first, earliest date last", () => {
    cy.log("**click on 'past events'**");
    EventsPage.getLink("past events").as("pastEvents").click({ force: true });
    cy.get("@pastEvents").should("have.attr", "data-active");

    cy.log("**check url path is /en/events/past**");
    cy.location("pathname", { timeout: 10000 }).should("eq", "/en/events/past");

    cy.log("**wait for events to load**");
    cy.wait("@events", { timeout: 10000 });

    cy.log("**checks event dates are in ascending order**");
    const datesArr = [];
    EventsPage.getEventDates()
      .should("be.visible")
      .should("have.length.greaterThan", 0)
      .each(($date) => {
        const dateText = $date.text().replace(/·.+/, "").trim();
        datesArr.push(dateText);
      })
      .then(() => {
        const datesSorted = [...datesArr].sort((a, b) =>
          compareAsc(
            parse(a, "dd MMMM yyyy", new Date()),
            parse(b, "dd MMMM yyyy", new Date())
          )
        );
        expect(datesArr).to.deep.eq(datesSorted);
      });
  });

  it("filters upcoming events by 'Europe'", () => {
    cy.log("**check no filters are selected**");
    EventsPage.getFilterBtns().should("have.class", "css-1umf0ha");
    cy.log("**click on Europe button**");
    EventsPage.getFilterBtn("Europe").click();
    EventsPage.getFilterBtn("Europe").should("have.class", "css-1pbupku");
    cy.log("**wait for events to load**");
    cy.wait("@events", { timeout: 10000 });
    cy.log("**check events are visible**");
    EventsPage.getEvents()
      .as("events")
      .should("have.length.greaterThan", 0)
      .and("be.visible");
    cy.log("**check Europe tag is on every event**");
    cy.get("@events").each(($el) => {
      cy.wrap($el)
        .find("span.css-1kuwq4c")
        .contains("Europe", { matchCase: false })
        .should("be.visible");
    });
  });

  it("filters upcoming events by 'Europe' and 'Conference'", () => {
    cy.log("**check no filters are selected**");
    EventsPage.getFilterBtns().should("have.class", "css-1umf0ha");
    cy.log("**click on Europe button**");
    EventsPage.getFilterBtn("Europe").as("europeBtn").click();
    cy.get("@europeBtn").should("have.class", "css-1pbupku");
    cy.log("**wait for events to load**");
    cy.wait("@events"), { timeout: 10000 };
    cy.log("**click on Conference button**");
    EventsPage.getFilterBtn("Conference").as("conferenceBtn").click();
    cy.get("@conferenceBtn").should("have.class", "css-1pbupku");
    cy.log("**wait for events to load**");
    cy.wait("@events"), { timeout: 10000 };
    cy.log("**check events are visible**");
    EventsPage.getEvents()
      .as("events")
      .should("have.length.greaterThan", 0)
      .and("be.visible");
    cy.log("**check Europe and Conference tags are on every event**");
    cy.get("@events").each(($el) => {
      cy.wrap($el)
        .find("span.css-1kuwq4c")
        .should("be.visible")
        .should(($tags) => {
          const tagsText = $tags.text();
          expect(tagsText).to.contain("Europe");
          expect(tagsText).to.contain("Conference");
        });
    });
  });
});

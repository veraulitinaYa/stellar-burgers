/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
Cypress.Commands.add('addItem', (item: string, locationSelector: string) => {
  cy.get(locationSelector)
    .contains(item)
    .parent()
    .contains('Добавить')
    .click();
});

Cypress.Commands.add('clickItem', (item: string, locationSelector: string) => {
  cy.get(locationSelector).contains(item).click();
});

Cypress.Commands.add('clickLocationForceTrue', (selector: string) => {
  cy.get(selector).click({ force: true });
});

Cypress.Commands.add('clickLocation', (selector: string) => {
  cy.get(selector).click();
});

Cypress.Commands.add('testExistItem', (item: string, locationSelector: string) => {
  cy.get(locationSelector).contains(item).should('exist');
});

Cypress.Commands.add('testNotExistItem', (item: string, locationSelector: string) => {
  cy.get(locationSelector).contains(item).should('not.exist');
});

Cypress.Commands.add('testExistLocation', (selector: string) => {
  cy.get(selector).should('exist');
});

Cypress.Commands.add('testNotExistLocation', (selector: string) => {
  cy.get(selector).should('not.exist');
});

Cypress.Commands.add('testIntercept', (intercept: string) => {
  cy.wait(intercept).its('response.statusCode').should('eq', 200);
});


declare namespace Cypress {
  interface Chainable {
    addItem(item: string, locationSelector: string): Chainable<void>;
    clickItem(item: string, locationSelector: string): Chainable<void>;
    clickLocationForceTrue(selector: string): Chainable<void>;
    clickLocation(selector: string): Chainable<void>;
    testExistItem(item: string, locationSelector: string): Chainable<void>;
    testNotExistItem(item: string, locationSelector: string): Chainable<void>;
    testExistLocation(selector: string): Chainable<void>;
    testNotExistLocation(selector: string): Chainable<void>;
    testIntercept(intercept: string): Chainable<void>;
  }
}
// }

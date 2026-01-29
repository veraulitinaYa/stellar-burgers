export function addItem (item: string) {
    cy.contains(item)
      .parent()
      .contains('Добавить')
      .click();
}

export function testExistItem (item: string) {
    cy.contains(item).should('exist');
}


export function testNotExistItem (item: string) {
    cy.contains(item).should('not.exist');
}


export function clickItem (item: string) {
    cy.contains(item).click();
} 

export function getItemForceTrue (item: string) {
    cy.get(item).click({ force: true });
} 

export function getItem (item: string) {
   cy.get(item).click();
}

export function testIntercept (intercept: string) {
    cy.wait(intercept).its('response.statusCode').should('eq', 200);
}

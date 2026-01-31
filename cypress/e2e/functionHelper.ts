export function addItem (item: string, locationIdentifier: string) {
    cy.get(locationIdentifier)
    .contains(item)
      .parent()
      .contains('Добавить')
      .click();
}


export function testExistLocation ( locationIdentifier: string) {
    cy.get(locationIdentifier).should('exist');
}
export function testNotExistLocation ( locationIdentifier: string) {
   cy.get(locationIdentifier).should('not.exist');
}
export function testExistItem ( item: string, locationIdentifier: string) {
    cy.get(locationIdentifier).contains(item).should('exist');
}
export function testNotExistItem ( item: string, locationIdentifier: string) {
   cy.get(locationIdentifier).contains(item).should('not.exist');
}


export function clickItem (item: string, locationIdentifier: string) {
    cy.get(locationIdentifier).contains(item).click();
} 
export function clickItemForceTrue (item: string, locationIdentifier: string) {
    cy.get(locationIdentifier).contains(item).click({ force: true });
} 
export function clickLocation (locationIdentifier: string) {
    cy.get(locationIdentifier).click();
} 
export function clickLocationForceTrue (locationIdentifier: string) {
    cy.get(locationIdentifier).click({ force: true });
} 

export function testIntercept (intercept: string) {
    cy.wait(intercept).its('response.statusCode').should('eq', 200);
}

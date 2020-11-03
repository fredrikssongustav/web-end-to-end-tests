/// <reference types="cypress" />

context('Window', () => {
  it('signs in successfully', () => {
    cy.visit('https://github.com/');

    // Find Github icon
    cy.get('[class="octicon octicon-mark-github text-white"]').should('exist')
  });
});

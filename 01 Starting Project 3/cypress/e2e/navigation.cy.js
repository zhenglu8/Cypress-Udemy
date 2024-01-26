/// <reference types="Cypress" />

describe('page navigation', () => {
  it('should navigate betwen pages', () => {
    cy.visit('/');
    // data-cy="header-about-link"
    cy.get('[data-cy="header-about-link"]').click()

    cy.location('pathname').should('equal', '/about') // about page

    cy.go('back')

    cy.location('pathname').should('equal', '/') // home page

    cy.get('[data-cy="header-about-link"]').click()
    cy.get('[data-cy="header-home-link"]').click()

    cy.location('pathname').should('equal', '/') // home page
  })
})
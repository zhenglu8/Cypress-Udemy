/// <reference types="Cypress" />

describe('tasks page', () => {
  it('should render the main image', () => {
    cy.visit('http://localhost:5173/')
    cy.get('.main-header img') // find all imgs under the element with main header css class name
    cy.get('.main-header').get('img') //get('img') starts on top of the page. not within the previous element
    cy.get('.main-header').find('img') //find('img') within the previous element
  })

  it('should display the page title', () => {
    cy.visit('http://localhost:5173/')
    //cy.get('h1') // here verify the exist of h1, not the content of h1
    cy.get('h1').should('have.length', 1) // explicit assertion
    cy.get('h1').contains('React Tasks') // implicit assertion
    cy.contains('React Tasks')
  })
})

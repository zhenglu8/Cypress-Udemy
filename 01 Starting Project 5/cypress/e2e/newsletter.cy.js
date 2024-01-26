/// <reference types="Cypress" />

describe('Newsletter', () => {
    beforeEach(() => {
      cy.task('seedDatabase');
    })
    it('should display a success message', () => {
      // intercept any HTTP request localhost:3000/newsletter?any
      cy.intercept('POST', '/newsletter*', {status: 201}).as('subscribe'); 
      cy.visit('/')
      cy.get('[data-cy="newsletter-email"]').type('test@example.com');
      cy.get('[data-cy="newsletter-submit"]').click();
      cy.wait('@subscribe')
      cy.contains('Thanks for signing up');
  
    });
    it('should display validation errors', ()=>{
      // intercept any HTTP request localhost:3000/newsletter?any
      cy.intercept('POST', '/newsletter*', {message: 'Email exists already.'}).as('subscribe'); 
      cy.visit('/')
      cy.get('[data-cy="newsletter-email"]').type('test@example.com');
      cy.get('[data-cy="newsletter-submit"]').click();
      cy.wait('@subscribe')
      cy.contains('Email exists already.');
    })
    it('should successfully create a new contact', () => {
        cy.request({
            method: 'POST',
            url: '/newsletter',
            body: {email: 'test@example.com'},
            form: true
        }).then(res => {
            expect(res.status).to.equal(201);
        });
    })
  });
/// <reference types="Cypress" />

describe('contact form', ()=>{

    before(() => {
        // run only once, before all tests
    })

    beforeEach(() =>{
        // run before every test case (so it's repeated)
        cy.visit('/about'); // use baseURL here
    })

    afterEach(() => {
        // run after every test case
    })

    after(() => {
        // run after all tests, only once
    })

    it('should submit the form', ()=>{
        
        cy.getById('contact-input-message').type('Hello world')
        cy.getById('contact-input-name').type('John Doe')
        
        cy.task('seedDatabase', 'filename.csv').then(returnValue => {
            // ... use returnValue
        })

        //cy.get('[data-cy="contact-btn-submit"]')
        //    .contains('Send Message')
        //    .and('not.have.attr', 'disabled')
        cy.get('[data-cy="contact-btn-submit"]').then((el) => {
            expect(el.attr('disabled')).to.be.undefined
            expect(el.text()).to.be.equal('Send Message')
        })

        cy.get('[data-cy="contact-input-email"]').type('test@example.com{enter}')

        cy.get('[data-cy="contact-btn-submit"]').as('submitBtn')
        
        //cy.get('@submitBtn').click()
        cy.get('@submitBtn').contains('Sending...')
        cy.get('@submitBtn').should('have.attr', 'disabled')
    })

    it('should validate the form input', ()=>{
        //cy.visit('/about');
        cy.submitForm()
        cy.get('[data-cy="contact-btn-submit"]').then(el => {
            expect(el).to.not.have.attr('disabled')
            expect(el.text()).to.not.equal('Sending...')
        })
        cy.get('[data-cy="contact-btn-submit"]').contains('Send Message')
        
        cy.screenshot()

        cy.get('[data-cy="contact-input-message"]').as('msgInput')
        cy.get('@msgInput').focus().blur()
        cy.get('@msgInput')
            .parent()
            .should('have.attr', 'class')
            .and('match', /invalid/)

        cy.get('[data-cy="contact-input-name"]').focus().blur()
        cy.get('[data-cy="contact-input-name"]')
            .parent()
            .should('have.attr', 'class')
            .and('match', /invalid/)

        cy.get('[data-cy="contact-input-email"]').focus().blur()
        cy.get('[data-cy="contact-input-email"]')
            .parent()
            .should((el) => {
                expect(el.attr('class')).not.to.be.undefined
                expect(el.attr('class')).contains('invalid')
            })

    })
})
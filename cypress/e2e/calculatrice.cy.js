import { faker } from '@faker-js/faker';

describe('Calculatrice – Tests de calcul & validation email', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8080');
    });

    it('additionne 7 et 3', () => {
        cy.get('#input-a').type('7');
        cy.get('#input-b').type('3');
        cy.get('#btn-add').click();
        cy.get('#output').should('have.text', '10');
    });

    it('soustrait 5 de 12', () => {
        cy.get('#input-a').type('12');
        cy.get('#input-b').type('5');
        cy.get('#btn-sub').click();
        cy.get('#output').should('have.text', '7');
    });

    it('divise 12 par 3', () => {
        cy.get('#input-a').type('12');
        cy.get('#input-b').type('3');
        cy.get('#btn-div').click();
        cy.get('#output').should('have.text', '4');
    });

    it('affiche "Erreur" lors d\'une division par zéro', () => {
        cy.get('#input-a').type('12');
        cy.get('#input-b').type('0');
        cy.get('#btn-div').click();
        cy.get('#output').should('have.text', 'Erreur');
    });

    it('email valide → calcul autorisé', () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const fullName = `${firstName} ${lastName}`;

        cy.get('input[placeholder="Nom complet"]').type(fullName);

        const corporateEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`;
        cy.get('input[placeholder^="Email"]').type(corporateEmail);

        cy.get('#email-status').should('contain.text', 'Email valide'); // Correction ici !

        cy.get('#input-a').type('4');
        cy.get('#input-b').type('2');
        cy.get('#btn-mul').click();

        cy.get('#output').should('have.text', '8');
    });

    it('email invalide → blocage du calcul', () => {
        const name = faker.person.fullName();
        cy.get('input[placeholder="Nom complet"]').type(name);

        const invalidEmail = faker.internet.email();
        cy.get('input[placeholder^="Email"]').type(invalidEmail);

        cy.get('#email-status').should('contain.text', 'Doit se terminer par @company.com');

        cy.get('#input-a').type('1');
        cy.get('#input-b').type('1');
        cy.get('#btn-add').click();

        cy.get('#output').should('have.text', 'Erreur: Email invalide');
    });

    it('pas d’email → calcul autorisé', () => {
        cy.get('#input-email').clear();

        cy.get('#input-a').type('100');
        cy.get('#input-b').type('25');
        cy.get('#btn-div').click();

        cy.get('#output').should('have.text', '4');
    });

});
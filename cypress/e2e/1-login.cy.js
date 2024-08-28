/// <reference types="cypress" />

require("cypress-xpath");

describe("Authentication Scenario", () => {
  beforeEach(() => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  });

  it("Failed login without input", () => {
    cy.get('button[type="submit"]').click();
    cy.xpath("//span[contains(@class, 'error-message')]").should(
      "contain.text",
      "required"
    );
  });

  it("Failed login wrong password", () => {
    cy.xpath("//input[@name='username']").type("Admin");
    cy.xpath("//input[@name='password']").type("admin12345");
    cy.get('button[type="submit"]').click();
    cy.xpath("//p[contains(@class, 'oxd-alert-content-text')]")
      .should("exist")
      .and("contain.text", "Invalid Credentials");
  });

  it("Success login with valid credentials", () => {
    cy.xpath("//input[@name='username']").type("Admin");
    cy.xpath("//input[@name='password']").type("admin123");
    cy.get('button[type="submit"]').click();
    cy.xpath(
      "//h6[contains(@class, 'oxd-topbar-header-breadcrumb-module')][text()='Dashboard']"
    )
      .should("exist")
      .and("contain.text", "Dashboard");
    //
  });
});

describe('Test Home Page', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");
    cy.get('[data-cy="orderSubmit"]').as("orderSubmit");
    cy.get('[data-cy="ingredients"]').as("items");
    cy.get('[data-cy="dropContainer"]').as("drop");

    cy.get("@items").children().first().as("bun");
    cy.get("@items").children().last().as("main");
    cy.get("@items").children().eq(2).as("sauce");

    // Устанавливаем токены:
    window.localStorage.setItem(
        "refreshToken",
        JSON.stringify("test-refreshToken")
    );
    cy.setCookie('accessToken', 'test-accessToken')
  });



  it("create order", function () {
    cy.get("@orderSubmit").click();
    cy.intercept("POST", "api/auth/login", { fixture: "loginData.json" }).as(
        "loginData"
    );

    cy.get("[name=email]").type(`test@mail.com`);
    cy.get("[name=password]").type(`123456`);
    cy.contains("Войти").click();
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" }).as("user");

    cy.get("@bun").trigger("dragstart");
    cy.get("@drop").trigger("drop");
    cy.get("@sauce").trigger("dragstart");
    cy.get("@drop").trigger("drop");
    cy.get("@main").trigger("dragstart");
    cy.get("@drop").trigger("drop");

    cy.get("@orderSubmit").click();

    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as(
        "postOrder"
    );
  });

  it('should open ingredient info modal', function () {
    cy.get('@main').click(); // открываем модалку
    cy.get('[data-cy="modal-ingredient-name"').should('be.visible'); // проверяем контент в модалке
    cy.wait(2000); // для просмотра
    cy.get('[data-cy="close-modal-button"]').click(); // закрываем
  });

})
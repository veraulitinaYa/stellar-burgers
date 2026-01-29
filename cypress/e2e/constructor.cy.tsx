// создать моковые данные

//настроить перехват запроса

//тест - добавление ингредиента из списка в конструктор



//тест - модалки

//тест - модалки - открытие модального окна ингредиента

//тест - модалки - закрытие по клику на крестик

//тест - модалки - закрытие по клику на оверлей (желательно)

// тест - заказ

// тест - заказ - cозданы моковые данные ответа на запрос данных пользователя

// тест - заказ - cозданы моковые данные ответа на запрос создания заказа

// тест - заказ - подставляются моковые токены авторизации

// тест - заказ - cобирается бургер

// тест - заказ - вызывается клик по кнопке «Оформить заказ».

// тест - заказ - проверяется, что модальное окно открылось и номер заказа верный.

// тест - заказ - закрывается модальное окно и проверяется успешность закрытия.

// тест - заказ - проверяется, что конструктор пуст.


describe('Конструктор бургера', () => {
  beforeEach(() => {
    // ингредиенты
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    // пользователь авторизован
    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    // создание заказа
    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    //токены
    cy.setCookie('accessToken', 'test-access-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('тест - добавление ингредиента из списка в конструктор', () => {
    cy.contains('Флюоресцентная булка R2-D3')
      .parent()
      .contains('Добавить')
      .click();

    cy.contains('Флюоресцентная булка R2-D3').should('exist');
  });

  it('тест - модалки - открытие модального окна ингредиента', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.contains('Детали ингредиента').should('exist');
  });

  it('тест - модалки - закрытие по клику на крестик', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.get('[data-testid=modal-close]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('тест - модалки - закрытие по клику на оверлей (желательно)', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.get('[data-testid=modal-overlay]').click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('тест - заказ - cобирается бургер', () => {
    cy.contains('Флюоресцентная булка R2-D3').should('exist');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.contains('Флюоресцентная булка R2-D3').should('exist');
  });

  it('тест - заказ - вызывается клик по кнопке «Оформить заказ».', () => {
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');
  });

  it('тест - заказ - проверяется, что модальное окно открылось и номер заказа верный', () => {
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');
    cy.contains('123456').should('exist'); // номер из мокового ответа
  });

  it('тест - заказ - закрывается модальное окно и проверяется успешность закрытия.', () => {
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');
    cy.get('[data-testid=modal-close]').click({ force: true });
    cy.contains('123456').should('not.exist');
  });

  it('тест - заказ - проверяется, что конструктор пуст.', () => {
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');
    cy.get('[data-testid=modal-close]').click({ force: true });

    cy.contains('Выберите булку').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});

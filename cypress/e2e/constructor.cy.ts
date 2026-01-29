// создать моковые данные

import { add, get } from "cypress/types/lodash";
import { addItem, clickItem, testExistItem, testNotExistItem, getItem, getItemForceTrue, testIntercept } from "./functionHelper";
import { testBun, testIngredient, placeOrderButton, ingredientInfoModal, closeIcon, closeOverlay, orderNumber, bunPlaceholder, ingredientPlaceholder } from "./constHelper";



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
    addItem (testBun);
    testExistItem (testBun);
  });

  it('тест - модалки - открытие модального окна ингредиента', () => {
    clickItem(testIngredient);
    testExistItem (ingredientInfoModal);
  });

  it('тест - модалки - закрытие по клику на крестик', () => {
    clickItem(testIngredient);
    getItem(closeIcon);
    testNotExistItem (ingredientInfoModal);
  });

  it('тест - модалки - закрытие по клику на оверлей (желательно)', () => {
    clickItem(testIngredient);
    getItemForceTrue(closeOverlay);
    testNotExistItem (ingredientInfoModal);
  });

  it('тест - заказ - cобирается бургер', () => {
  addItem (testBun);
  testExistItem (testBun);
  addItem (testIngredient);
  testExistItem (testIngredient);
  });

    it('тест - заказ - отправлен заказ', function () {
    addItem (testBun);
    addItem (testIngredient);
    clickItem(placeOrderButton);
    testIntercept('@createOrder');
});

  it('тест - заказ - проверяется, что модальное окно открылось и номер заказа верный', () => {
    addItem (testBun);
    addItem (testIngredient);
    clickItem(placeOrderButton);
    testExistItem(orderNumber);
  });

  it('тест - заказ - закрывается модальное окно и проверяется успешность закрытия.', () => {
    addItem (testBun);
    addItem (testIngredient);
    clickItem(placeOrderButton);
    getItem(closeIcon);
    testNotExistItem(orderNumber);
  });

  it('тест - заказ - проверяется, что конструктор пуст.', () => {
    addItem (testBun);
    addItem (testIngredient);
    clickItem(placeOrderButton);
    getItem(closeIcon);
    testExistItem(bunPlaceholder);
    testExistItem(ingredientPlaceholder);
  });

});

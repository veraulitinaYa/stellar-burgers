// создать моковые данные

import { add, find, get } from "cypress/types/lodash";
import { testBun,testIngredient,placeOrderButton,ingredientInfoModal,selectCloseIconInModal,selectOverlayForModal,orderNumber,bunPlaceholder,ingredientPlaceholder,selectCurrentModal,selectBurgerConstructor,selectIngredients,selectIngredientNameInModal,selectIngredientCalories,selectIngredientProteins,selectIngredientFat,selectIngredientCarbs,testIngredientCalories,testIngredientProteins,testIngredientFat,testIngredientCarbs } from "./constHelper";
import { addItem, clickItem, clickLocation, clickLocationForceTrue, testExistItem, testExistLocation, testIntercept, testNotExistItem, testNotExistLocation } from "./functionHelper";


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

    afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('тест - добавление ингредиента из списка в конструктор', () => {
    addItem (testBun, selectIngredients);
    testExistItem (testBun, selectBurgerConstructor);
  });

  it('тест - модалки - открытие модального окна ингредиента', () => {
    clickItem(testIngredient, selectIngredients);
    testExistLocation (selectCurrentModal);
    testExistItem (ingredientInfoModal, selectCurrentModal);
    testExistItem (testIngredientCalories, selectCurrentModal);
    testExistItem (testIngredientProteins, selectCurrentModal);
    testExistItem (testIngredientFat, selectCurrentModal);
    testExistItem (testIngredientCarbs, selectCurrentModal);


  });

  it('тест - модалки - закрытие по клику на крестик', () => {
    clickItem(testIngredient, selectIngredients);
    clickLocation (selectCloseIconInModal);
    testNotExistLocation (selectCurrentModal);
  });

  it('тест - модалки - закрытие по клику на оверлей (желательно)', () => {
    clickItem(testIngredient, selectIngredients);
    clickLocationForceTrue (selectOverlayForModal);
     testNotExistLocation (selectCurrentModal);
  });

  it('тест - заказ - cобирается бургер', () => {
  addItem (testBun, selectIngredients);
  testExistItem (testBun, selectBurgerConstructor);
  addItem (testIngredient, selectIngredients);
  testExistItem (testIngredient, selectBurgerConstructor);
  });

    it('тест - заказ - отправлен заказ', function () {
    addItem (testBun, selectIngredients);
    addItem (testIngredient, selectIngredients);
    clickItem(placeOrderButton, selectBurgerConstructor);
    testIntercept('@createOrder');
});

  it('тест - заказ - проверяется, что модальное окно открылось и номер заказа верный', () => {
    addItem (testBun, selectIngredients);
    addItem (testIngredient, selectIngredients);
    clickItem(placeOrderButton, selectBurgerConstructor);
    testExistItem(orderNumber, selectCurrentModal);
  });

  it('тест - заказ - закрывается модальное окно и проверяется успешность закрытия.', () => {
    addItem (testBun, selectIngredients);
    addItem (testIngredient, selectIngredients);
    clickItem(placeOrderButton, selectBurgerConstructor);
    clickLocation (selectCloseIconInModal);
    testNotExistLocation (selectCurrentModal);;
  });

  it('тест - заказ - проверяется, что конструктор пуст.', () => {
    addItem (testBun, selectIngredients);
    addItem (testIngredient, selectIngredients);
    clickItem(placeOrderButton, selectBurgerConstructor);
    clickLocation (selectCloseIconInModal);
    testExistItem (bunPlaceholder, selectBurgerConstructor);
    testExistItem (ingredientPlaceholder, selectBurgerConstructor);
  });

});

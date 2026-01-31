import { testBun,testIngredient,placeOrderButton,ingredientInfoModal,selectCloseIconInModal,selectOverlayForModal,orderNumber,bunPlaceholder,ingredientPlaceholder,selectCurrentModal,selectBurgerConstructor,selectIngredients, selectIngredientCalories,selectIngredientProteins,selectIngredientFat,selectIngredientCarbs,testIngredientCalories,testIngredientProteins,testIngredientFat,testIngredientCarbs } from "./constHelper";

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
    cy.addItem(testBun, selectIngredients);  
    cy.testExistItem(testBun, selectBurgerConstructor); 
  });

  it('тест - модалки - открытие модального окна ингредиента', () => {
    cy.clickItem(testIngredient, selectIngredients);  
    cy.testExistLocation(selectCurrentModal); 
    cy.testExistItem(ingredientInfoModal, selectCurrentModal); 


    cy.get(selectCurrentModal).find(selectIngredientCalories).should('contain.text', testIngredientCalories); //  
    cy.get(selectCurrentModal).find(selectIngredientProteins).should('contain.text', testIngredientProteins); //  
    cy.get(selectCurrentModal).find(selectIngredientFat).should('contain.text', testIngredientFat); //  
    cy.get(selectCurrentModal).find(selectIngredientCarbs).should('contain.text', testIngredientCarbs); //  
  });

  it('тест - модалки - закрытие по клику на крестик', () => {
    cy.clickItem(testIngredient, selectIngredients);
    cy.clickLocation(selectCloseIconInModal); 
    cy.testNotExistLocation(selectCurrentModal); 
  });

  it('тест - модалки - закрытие по клику на оверлей', () => {
    cy.clickItem(testIngredient, selectIngredients);
    cy.clickLocationForceTrue(selectOverlayForModal); 
    cy.testNotExistLocation(selectCurrentModal); 
  });

  it('тест - заказ - собирается бургер', () => {
    cy.addItem(testBun, selectIngredients);
    cy.testExistItem(testBun, selectBurgerConstructor);
    cy.addItem(testIngredient, selectIngredients);
    cy.testExistItem(testIngredient, selectBurgerConstructor);
  });

  it('тест - заказ - отправлен заказ', () => {
    cy.addItem(testBun, selectIngredients);
    cy.addItem(testIngredient, selectIngredients);
    cy.clickItem(placeOrderButton, selectBurgerConstructor);
    cy.testIntercept('@createOrder');
  });

  it('тест - заказ - проверяется, что модальное окно открылось и номер заказа верный', () => {
    cy.addItem(testBun, selectIngredients);
    cy.addItem(testIngredient, selectIngredients);
    cy.clickItem(placeOrderButton, selectBurgerConstructor);
    cy.testExistItem(orderNumber, selectCurrentModal);
  });

  it('тест - заказ - закрывается модальное окно', () => {
    cy.addItem(testBun, selectIngredients);
    cy.addItem(testIngredient, selectIngredients);
    cy.clickItem(placeOrderButton, selectBurgerConstructor);
    cy.clickLocation(selectCloseIconInModal);
    cy.testNotExistLocation(selectCurrentModal);
  });

  it('тест - заказ - проверяется, что конструктор пуст', () => {
    cy.addItem(testBun, selectIngredients);
    cy.addItem(testIngredient, selectIngredients);
    cy.clickItem(placeOrderButton, selectBurgerConstructor);
    cy.clickLocation(selectCloseIconInModal);
    cy.testExistItem(bunPlaceholder, selectBurgerConstructor);
    cy.testExistItem(ingredientPlaceholder, selectBurgerConstructor);
  });
});

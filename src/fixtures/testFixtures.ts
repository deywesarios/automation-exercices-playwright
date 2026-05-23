import { test as base, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';
import ProductsPage from '../../pages/ProductsPage';

type Fixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  productsPage: ProductsPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
});

export { expect };

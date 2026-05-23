import { test } from '../fixtures/testFixtures';

test.beforeEach(async ({ homePage }) => {
    await homePage.goToHome();
});

test('Go to Home Page', async ({ homePage }) => {
    await homePage.validateHomePageTitle();
});
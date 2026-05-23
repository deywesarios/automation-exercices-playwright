import { expect } from '@playwright/test';
import BasePage from './BasePage';
import homeLocators from '../src/elements/home/home.locators';
import homeTexts from '../src/data/texts/home/home.texts';

class HomePage extends BasePage {
    private get logo() {
        return this.locator(homeLocators.logo);
    }

    async goToHome() {
        await this.page.goto('/');
    }

    async validateHomePageTitle() {
        await expect(this.page).toHaveTitle(homeTexts.homePageTitle);
    }

    async validateLogoIsPresent() {
        await expect(this.logo).toBeVisible();
    }
}

export default HomePage;
import { expect } from '@playwright/test';
import BasePage from './BasePage';
import { Locator } from '@playwright/test';
import loginLocators from '../src/elements/login/login.locators';
import loginTexts from '../src/data/texts/login/login.texts';

class LoginPage extends BasePage {
    private get newUserTitle() {
        return this.locator(loginLocators.newUserTitle);
    }

    private get nameField() {
        return this.locator(loginLocators.nameField);
    }

    private get emailField() {
        return this.locator(loginLocators.emailField);
    }

    private get signupButton() {
        return this.locator(loginLocators.signupButton);
    }

    private get newsletter() {
        return this.locator(loginLocators.newsletter);
    }

    private genderLocator(gender: 'male' | 'female') {
        return this.locator(loginLocators.gender[gender]);
    }

    private get loginForm() {
        return this.locator(loginLocators.loginForm);
    }

    private get passwordField() {
        return this.locator(loginLocators.passwordField);
    }

    private get firstNameField() {
        return this.locator(loginLocators.firstNameField);
    }

    private get lastNameField() {
        return this.locator(loginLocators.lastNameField);
    }

    private get companyField() {
        return this.locator(loginLocators.companyField);
    }

    private get address1Field() {
        return this.locator(loginLocators.address1Field);
    }

    private get stateField() {
        return this.locator(loginLocators.stateField);
    }

    private get cityField() {
        return this.locator(loginLocators.cityField);
    }

    private get zipcodeField() {
        return this.locator(loginLocators.zipcodeField);
    }

    private get mobileNumberField() {
        return this.locator(loginLocators.mobileNumberField);
    }

    private get createAccountButton() {
        return this.locator(loginLocators.createAccountButton);
    }

    private get nameSignupField() {
        return this.locator(loginLocators.nameSignupField);
    }

    private get emailSignUpField() {
        return this.locator(loginLocators.emailSignUpField);
    }

    private get countryDropdown() {
        return this.locator(loginLocators.countryDropdown);
    }

    private get daysDropdown() {
        return this.locator(loginLocators.daysDropdown);
    }

    private get monthsDropdown() {
        return this.locator(loginLocators.monthsDropdown);
    }

    private get yearsDropdown() {
        return this.locator(loginLocators.yearsDropdown);
    }

    private get accountCreated() {
        return this.locator(loginLocators.accountCreated);
    }

    private get continueButton() {
        return this.locator(loginLocators.continueButton);
    }

    async goToLogin() {
        await this.page.goto('/login');
    }
    
    async validateIsOnLoginPage() {
        await this.goToLogin();
        await expect(this.newUserTitle).toBeVisible();
        await expect(this.newUserTitle).toHaveText(loginTexts.newUserTitleText);
    }

    async fillSignupFirstForm(data: { fullName: string; email: string }) {
        await this.fillInputField(this.nameField, data.fullName);
        await this.fillInputField(this.emailField, data.email);
        await this.signupButton.click();
    }

    async validateIsOnSignupPage() {
        await expect(this.page).toHaveURL('/signup');
        await expect(this.loginForm).toBeVisible();
    }

    async selectGender(gender: 'male' | 'female') {
        await this.genderLocator(gender).check();
    }

    async setNewsletter(value: boolean) {
        if (value) {
            await this.newsletter.check();
        } else {
            if (await this.newsletter.isChecked()) {
                await this.newsletter.uncheck();
            }
        }
    }

    async validateFullNameIsTheSame(expectedFullName: string) {
        const value = await this.nameSignupField.inputValue();
        expect(value).toBe(expectedFullName);
    }

    async validateEmailIsTheSame(expectedEmail: string) {
        const value = await this.emailSignUpField.inputValue();
        expect(value).toBe(expectedEmail);
    }

    async selectCountry(country: string) {
        await this.countryDropdown.selectOption(country);
    }

    async selectDateOfBirth(date: Date) {
        const day = date.getDate().toString();
        const month = (date.getMonth() + 1).toString(); // Janeiro = 0
        const year = date.getFullYear().toString();

        await this.daysDropdown.selectOption(day);
        await this.monthsDropdown.selectOption(month);
        await this.yearsDropdown.selectOption(year);
    }
    

    private async fillInputField(locator: Locator, value: string) {
        await locator.fill(value);
    }

    async fillRegistrationForm(
        password: string,
        dayOfBirth: Date,
        firstName: string, 
        lastName: string, 
        company: string, 
        address: string,
        country: string,
        state: string, 
        city: string, 
        zipcode: string, 
        mobileNumber: string,
    ) {
        await this.fillInputField(this.passwordField, password);
        await this.selectDateOfBirth(dayOfBirth);
        await this.setNewsletter(true);
        await this.fillInputField(this.firstNameField, firstName);
        await this.fillInputField(this.lastNameField, lastName);
        await this.fillInputField(this.companyField, company);
        await this.fillInputField(this.address1Field, address);
        await this.selectCountry(country);
        await this.fillInputField(this.stateField, state);
        await this.fillInputField(this.cityField, city);
        await this.fillInputField(this.zipcodeField, zipcode);
        await this.fillInputField(this.mobileNumberField, mobileNumber);
    }

    async submitRegistration() {
        await this.createAccountButton.click();
    }

    async validateAccountCreated() {
        await expect(this.page).toHaveURL('/account_created');
        await expect(this.page).toHaveTitle(loginTexts.accountCreatedTitle);
        await expect(this.accountCreated).toHaveText(loginTexts.accountCreatedTitleText);
        await expect(this.continueButton).toBeVisible();
    }

    async continueToHome(fullName: string) {
        await this.continueButton.click();
        await expect(this.page).toHaveURL('/');
        await expect(this.page.getByRole('link', { name: 'Logout' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Delete Account' })).toBeVisible();
        const text = await this.page.getByText('Logged in as').textContent();
        expect(text).toContain('Logged in as');
        expect(text).toContain(fullName);
    }
    
}

export default LoginPage;
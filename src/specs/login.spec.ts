import { test } from '../fixtures/testFixtures';
import { generateRandomUser } from '../../src/utils/faker';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.validateIsOnLoginPage();
});

test('Fill signup form and create account', async ({ loginPage }) => {
    const user = generateRandomUser();

    await loginPage.fillSignupFirstForm(user);
    await loginPage.validateIsOnSignupPage();
    await loginPage.selectGender(user.gender);
    await loginPage.validateFullNameIsTheSame(user.fullName);
    await loginPage.validateEmailIsTheSame(user.email);
    await loginPage.fillRegistrationForm(
      user.password,
      user.dateOfBirth,
      user.firstName,
      user.lastName,
      user.company, 
      user.address,
      user.country,
      user.state, 
      user.city, 
      user.zipcode, 
      user.mobileNumber
    );
    await loginPage.submitRegistration();
    await loginPage.validateAccountCreated();
    await loginPage.continueToHome(user.fullName);

});
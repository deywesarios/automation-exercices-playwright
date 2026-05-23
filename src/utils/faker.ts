const { faker } = require('@faker-js/faker');

function generateRandomUser() {
    const gender = faker.helpers.arrayElement(['male', 'female']);
    const firstName = faker.person.firstName(gender);
    const lastName = faker.person.lastName();
    const email = `${firstName}.${lastName}@example.com`.toLowerCase();
    const dateOfBirth = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
    const company = faker.company.name();
    const address = faker.location.streetAddress();
    const allowedCountries = [
        'India',
        'United States',
        'Canada',
        'Australia',
        'Israel',
        'New Zealand',
        'Singapore'
    ];
    const country = faker.helpers.arrayElement(allowedCountries);
    const state = faker.location.state();
    const city = faker.location.city();
    const zipcode = faker.location.zipCode();
    const mobileNumber = faker.phone.number();

    return {
        gender,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        email,
        password: faker.internet.password({ length: 8, numbers: true, symbols: true, uppercase: true, lowercase: true }),
        dateOfBirth,
        company,
        address,
        country,
        state,
        city,
        zipcode,
        mobileNumber
    };
}

export { generateRandomUser };
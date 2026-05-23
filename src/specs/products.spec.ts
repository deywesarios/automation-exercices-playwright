import productsTexts from '../data/texts/products/products.texts';
import { test } from '../fixtures/testFixtures';

test.beforeEach(async ({ productsPage }) => {
    await productsPage.goToProductsPage();
    await productsPage.validateProductsPageTitle();
});

test('Search for valid products', async ({ productsPage }) => {
    const products = [productsTexts.dress, productsTexts.tshirt, productsTexts.jeans];

    for (const product of products) {
        await productsPage.searchProduct(product);
        await productsPage.validateProductsAreVisible();
    }
});

test('Search for invalid product', async ({ productsPage }) => {
        await productsPage.searchProduct(productsTexts.invalidProduct);
        await productsPage.validateNoProductsFound();
});

test('Add product to cart and validate modal', async ({ productsPage }) => {
    await productsPage.searchProduct(productsTexts.dress);
    await productsPage.validateProductsAreVisible();
    await productsPage.addProductToCart(0);
    await productsPage.validateAddedToCartModal();
});

test('Check product on cart page', async ({ productsPage }) => {
    await productsPage.searchProduct(productsTexts.dress);
    await productsPage.validateProductsAreVisible();
    const { productName, productPrice } = await productsPage.storeAddedProductNameAndPrice(0);
    await productsPage.addProductToCart(0);
    await productsPage.goToCartPage();
    await productsPage.validateIsOnCartPage();
    await productsPage.validateProductsInCart(productName, productPrice, 0);
});

test('Add all items related to "Dress" and check cart', async ({ productsPage }) => {
    await productsPage.searchProduct(productsTexts.dress);
    const totalItems = await productsPage.validateProductsAreVisible();
    const cartItems: { productName: string; productPrice: string }[] = [];
    await productsPage.addAllItemsRelatedToProduct(totalItems, cartItems);
    await productsPage.goToCartPage();
    await productsPage.validateIsOnCartPage();
    await productsPage.validateAllItemsInCart(cartItems);
});
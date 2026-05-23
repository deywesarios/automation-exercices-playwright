import { expect } from '@playwright/test';
import BasePage from './BasePage';
import productsTexts from '../src/data/texts/products/products.texts';
import productsLocators from '../src/elements/products/products.locators';

class ProductsPage extends BasePage {
    async goToProductsPage() {
        await this.page.goto('/products');
    }

    async validateHeadingTitle(title: string) {
        await expect(this.locator(productsLocators.title)).toHaveText(title);
    }

    async validateProductsPageTitle() {
        await expect(this.page).toHaveTitle(productsTexts.pageTitle);
        await this.validateHeadingTitle(productsTexts.allProductsTitle);
    }

    async searchProduct(productName: string) {
        await this.locator(productsLocators.searchProductField).fill(productName);
        await this.locator(productsLocators.submitSearchButton).click();
        await this.validateHeadingTitle(productsTexts.searchedProductsTitle);
        await expect(this.page).toHaveURL(`/products?search=${productName}`);
    }

    async validateProductsAreVisible() {
        const products = this.locator(productsLocators.productsList);
        await expect(products.first()).toBeVisible();
        
        const totalItems = await products.count();
        return totalItems;
    }

    async validateNoProductsFound() {
        await expect(this.locator(productsLocators.productsList)).not.toBeVisible();
    }

    async addProductToCart(index: number) {
        await this.page.locator(productsLocators.addToCart).nth(index).click();
    }

    async validateAddedToCartModal() {
        await expect(this.locator(productsLocators.addedModal)).toBeVisible();
        await expect(this.locator(productsLocators.addedTitle)).toHaveText(productsTexts.addedTitle);
        await expect(this.locator(productsLocators.addedBodyText).first()).toHaveText(productsTexts.addedBodyText);
        await expect(this.locator(productsLocators.addedBodyText).last()).toHaveText(productsTexts.viewCart);
        await expect(this.locator(productsLocators.addedCloseModal)).toHaveText(productsTexts.continueShopping);
    }

    async storeAddedProductNameAndPrice(index: number) {
        await this.page.locator(productsLocators.productsList).nth(index).waitFor({ state: 'visible' });
        await this.page.locator(productsLocators.productsList).nth(index).scrollIntoViewIfNeeded();
        await this.page.locator(productsLocators.productsList).nth(index).hover();
        await this.locator(productsLocators.productName).nth(index).waitFor({ state: 'visible' });

        const productName = await this.locator(productsLocators.productName).nth(index).textContent();
        const productPrice = await this.locator(productsLocators.productPrice).nth(index).textContent();
        expect(productName).not.toBeNull();
        expect(productPrice).not.toBeNull();
        return {
            productName: productName!,
            productPrice: productPrice!,
        };
    }

    async continueShopping() {
        await this.locator(productsLocators.addedCloseModal).click();
    }

    async goToCartPage() {
        await this.page.getByText(productsTexts.viewCart).click();
    }

    async validateIsOnCartPage() {
        await expect(this.page).toHaveURL('/view_cart');
        await expect(this.locator(productsLocators.checkout)).toBeVisible();
    }

    async validateProductsInCart(productName: string, productPrice: string, index: number) {
        const cartDescription = this.locator(productsLocators.cartDescription);
        const cartPrice = this.locator(productsLocators.cartPrice);
        await expect(cartDescription.nth(index)).toBeVisible();
        await expect(cartPrice.nth(index)).toBeVisible();
        expect(cartDescription.nth(index)).toHaveText(productName);
        expect(cartPrice.nth(index)).toHaveText(productPrice);
    }

    async addAllItemsRelatedToProduct(totalItems: number, cartItems: { productName: string; productPrice: string }[]) {
        for (let i = 0; i < totalItems; i++) {
            const item = await this.storeAddedProductNameAndPrice(i);
            cartItems.push(item);
            await this.addProductToCart(i);
            if (i < totalItems - 1) {
                await this.continueShopping();
            }
        }
    }

    async validateAllItemsInCart(cartItems: { productName: string; productPrice: string }[]) {
        for (let i = 0; i < cartItems.length; i++) {
            await this.validateProductsInCart(cartItems[i].productName, cartItems[i].productPrice, i);
        }
    }

}

export default ProductsPage;
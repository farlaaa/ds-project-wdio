describe('Add Items to Cart', () => {
    const url = 'https://www.saucedemo.com/';
    const urlCatalog = 'https://www.saucedemo.com/inventory.html';

    // waiting for 5s after running tc
    afterEach(async () => {
        await browser.pause(5000);
    });

    // validation logged in
    before(async () => {
        await browser.url(url);

        const usernameInput = await $('#user-name');
        const passwordInput = await $('#password');
        const loginButton = await $('#login-button');

        await usernameInput.setValue('standard_user');
        await passwordInput.setValue('secret_sauce');
        await loginButton.click();

        // redirection to catalog page when successful login
        await expect(browser).toHaveUrl(urlCatalog);
    });

    it('add item to the cart from catalog page', async () => {
        const CatalogItem = await $$('.inventory_item');

        // click "Add to cart" button on the catalog page
        const firstItemAddToCartButton = await CatalogItem[0].$('.btn_inventory');
        await firstItemAddToCartButton.click();

        await browser.pause(3000);

        // verify the number of products in the cart icon increases
        const cartBadge = await $('.shopping_cart_badge');
        await expect(cartBadge).toBeDisplayed();
        await expect(cartBadge).toHaveText('1');
    });

    it('add item to the cart from product detail page', async () => {
        const inventoryItems = await $$('.inventory_item');
        const secondItem = await inventoryItems[1].$('.inventory_item_img a');
        await secondItem.click();

        await browser.pause(3000);

        // click "Add to cart" button on the product detail page
        const addToCartButton = await $('.btn_inventory');
        await addToCartButton.click();

        await browser.pause(3000);

        // verify the number of products in the cart icon increases
        const cartBadge = await $('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('2');

        // click on cart icon to ensure items are in the cart
        const cartIcon = await $('.shopping_cart_link');
        await cartIcon.click();

        await browser.pause(3000);

        // verify both items available on shopping cart
        const cartItems = await $$('.cart_item');
        await expect(cartItems).toBeElementsArrayOfSize(2);
    });
});

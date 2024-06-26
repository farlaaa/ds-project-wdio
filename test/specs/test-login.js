describe('Login', () => {
    const url = 'https://www.saucedemo.com/';
    const urlCatalog = 'https://www.saucedemo.com/inventory.html';

    // waiting for 5s after running tc
    afterEach(async () => {
        await browser.pause(5000);
    });

    it('login with valid credentials', async () => {
        await browser.url(url);

        const usernameInput = await $('#user-name');
        const passwordInput = await $('#password');
        const loginButton = await $('#login-button');

        await usernameInput.setValue('standard_user');
        await passwordInput.setValue('secret_sauce');
        await loginButton.click();

        // redirection to catalog page when successful login
        await expect(browser).toHaveUrl(urlCatalog);

        // verify the elements on the catalog page are displayed
        const inventoryContainer = await $('#inventory_container');
        await expect(inventoryContainer).toBeDisplayed();
    });

    it('login with invalid credentials', async () => {
        await browser.url(url);

        const usernameInput = await $('#user-name');
        const passwordInput = await $('#password');
        const loginButton = await $('#login-button');

        await usernameInput.setValue('randompeople');
        await passwordInput.setValue('7276kali');
        await loginButton.click();

        // verify URL still on the login page
        await expect(browser).toHaveUrl(url);

        // verify an error message is displayed
        const errorMessage = await $('.error-message-container');
        await expect(errorMessage).toBeDisplayed();
        await expect(errorMessage).toHaveTextContaining('Epic sadface: Username and password do not match any user in this service');
    });

    it('login with locked account', async () => {
        await browser.url(url);

        const usernameInput = await $('#user-name');
        const passwordInput = await $('#password');
        const loginButton = await $('#login-button');

        // verify URL still on the login page
        await expect(browser).toHaveUrl(url);

        await usernameInput.setValue('locked_out_user');
        await passwordInput.setValue('secret_sauce');
        await loginButton.click();

        // verify an error message is displayed
        const errorMessage = await $('.error-message-container');
        await expect(errorMessage).toBeDisplayed();
        await expect(errorMessage).toHaveTextContaining('Epic sadface: Sorry, this user has been locked out.');
    });

    it('login with empty username', async () => {
        await browser.url(url);

        const usernameInput = await $('#user-name');
        const passwordInput = await $('#password');
        const loginButton = await $('#login-button');

        await usernameInput.setValue('');
        await passwordInput.setValue('secret_sauce');
        await loginButton.click();

        // verify an error message is displayed for empty username
        const errorMessage = await $('.error-message-container');
        await expect(errorMessage).toBeDisplayed();
        await expect(errorMessage).toHaveTextContaining('Epic sadface: Username is required');

        // verify URL still on the login page
        await expect(browser).toHaveUrl(url);
    });

    it('login with empty password', async () => {
        await browser.url(url);

        const usernameInput = await $('#user-name');
        const passwordInput = await $('#password');
        const loginButton = await $('#login-button');


        await usernameInput.setValue('standard_user');
        await passwordInput.setValue(''); 
        await loginButton.click();

        // verify an error message is displayed for empty password
        const errorMessage = await $('.error-message-container');
        await expect(errorMessage).toBeDisplayed();
        await expect(errorMessage).toHaveTextContaining('Epic sadface: Password is required');

        // verify URL still on the login page
        await expect(browser).toHaveUrl(url);
    });
});

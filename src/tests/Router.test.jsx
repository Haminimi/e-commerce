import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import Header from '../components/Header/Header';
import Router from '../Router';

describe('Router', () => {
	it('should open the shop page on a click', async () => {
		const user = userEvent.setup();

		render(
			<Router>
				<Header path="/" numberOfItems={0} />
			</Router>
		);

		const shopLink = await screen.findByTestId('shop-link');
		await user.click(shopLink);
		expect(shopLink).toHaveClass('_activeLink_63c2ea');

		const shop = await screen.findByTestId('shop');
		expect(shop).toBeInTheDocument();
	});

	it('should open the cart page on a click', async () => {
		const user = userEvent.setup();

		render(
			<Router>
				<Header path="/" numberOfItems={0} />
			</Router>
		);

		const cartLink = screen.getByTestId('cart-link');
		await user.click(cartLink);

		const cart = screen.getByRole('heading', {
			name: 'Your cart is empty. Add some items in the shop. 🛒',
		});
		expect(cart).toBeInTheDocument();
	});
});

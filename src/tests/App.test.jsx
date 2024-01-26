import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from '../components/Cart/Cart';
import Home from '../components/Home/Home';
import Header from '../components/Header/Header';
import { expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Router from '../Router';
import { act } from 'react-dom/test-utils';

describe('Cart component', () => {
	it('should render a heading for the empty cart', () => {
		render(<Cart cart={[]} />);

		const heading = screen.getByRole('heading', {
			name: 'Your cart is empty. Add some items in the shop. 🛒',
		});

		expect(heading).toBeInTheDocument();
	});

	const cart = [
		{
			id: 1,
			number: 3,
			product: {
				title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
				price: 109.95,
			},
		},
	];

	it('should render a table when the cart is not empty', () => {
		render(<Cart cart={cart} />);

		const table = screen.getByRole('table');

		expect(table).toBeInTheDocument();
	});

	it('should render a correct total amount', () => {
		render(<Cart cart={cart} />);

		const total = screen.getByTestId('total');

		expect(total).toHaveTextContent(`${109.95 * 3}`);
	});

	describe('Buy button', () => {
		it('should render a modal when clicked', async () => {
			HTMLDialogElement.prototype.showModal = vi.fn(function mock() {
				this.open = true;
			});

			const user = userEvent.setup();

			render(<Cart cart={cart} />);

			const button = screen.getByRole('button', { name: 'Buy' });

			await user.click(button);

			expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();

			const modal = screen.getByRole('dialog');
			expect(modal).toBeVisible();

			const modalHeading = screen.getByRole('heading', {
				name: 'Thank You for Shopping with Us! ❤️',
			});
			expect(modalHeading).toBeVisible();
		});
	});

	describe('Close button', () => {
		it('should close a modal when clicked', async () => {
			HTMLDialogElement.prototype.close = vi.fn(function mock() {
				this.open = false;
			});

			const user = userEvent.setup();

			render(<Cart cart={cart} />);

			const button = screen.getByRole('button', { name: 'Buy' });

			await user.click(button);

			const closeButton = screen.getByLabelText('Close');
			expect(closeButton).toBeVisible();

			await user.click(closeButton);
			expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
		});
	});
});

describe('Home component', () => {
	it('should render a welcome heading', () => {
		render(<Home />);
		const welcomeHeading = screen.getByRole('heading', { name: 'Welcome' });
		expect(welcomeHeading).toBeInTheDocument();
	});

	it('should render a welcome message', () => {
		render(<Home />);
		const welcomeMessage = screen.getByText(
			/Discover a world of virtual shopping/
		);
		expect(welcomeMessage).toBeInTheDocument();
	});

	it('should render a credit link', () => {
		render(<Home />);
		const link = screen.getByRole('link', { name: 'Artem Gavrysh' });
		expect(link).toBeInTheDocument();
	});
});

describe.only('Header component', () => {
	it('should render the store name', () => {
		render(
			<Router>
				<Header path="/" numberOfItems={0} />
			</Router>
		);
		const header = screen.getByRole('heading', { name: 'AwesomeShop' });
		expect(header).toBeInTheDocument();
	});

	describe('Navbar', () => {
		it('should render the navbar', () => {
			render(
				<Router>
					<Header path="/" numberOfItems={0} />
				</Router>
			);
			const navbar = screen.getByRole('navigation');
			expect(navbar).toBeInTheDocument();
		});

		it('should open the shop page on a click', async () => {
			const user = userEvent.setup();

			render(
				<Router>
					<Header path="/" numberOfItems={0} />
				</Router>
			);

			const shopLink = screen.getByTestId('shop-link');

			await user.click(shopLink);

			expect(shopLink).toHaveClass('_activeLink_63c2ea');
		});

		it('should render the right number of items', () => {
			render(
				<BrowserRouter>
					<Header path="/" numberOfItems={1} />
				</BrowserRouter>
			);

			const numberOfItems = screen.getByTestId('number-of-items');
			expect(numberOfItems).toHaveTextContent('1');
		});
	});
});

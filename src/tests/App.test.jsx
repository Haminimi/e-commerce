import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from '../components/Cart/Cart';
import { expect, vi } from 'vitest';

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

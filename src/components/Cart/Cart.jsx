import PropTypes from 'prop-types';
import { useRef } from 'react';
import styles from './Cart.module.css';

const Cart = ({ cart }) => {
	const gitHubLink = useRef();
	const modalRef = useRef();

	const total = cart.reduce(
		(accumulator, product) =>
			accumulator +
			Number(product.number) * Number(product.product.price),
		0
	);

	function openModal() {
		gitHubLink.current.focus();
		modalRef.current.showModal();
	}

	function closeModal() {
		modalRef.current.close();
	}

	function closeModalWithKeyboard(event) {
		if (
			event.key === 'Enter' ||
			event.key === ' ' ||
			event.key === 'Spacebar'
		) {
			closeModal();
		}
	}

	if (cart.length === 0) {
		return (
			<div className={styles.cartContainer}>
				<h1>Your cart is empty. Add some items in the shop. 🛒</h1>

				<a
					aria-label="GitHub"
					href="https://github.com/Haminimi"
					className={styles.link}
					ref={gitHubLink}
				>
					<i
						aria-hidden="true"
						className={`devicon-github-original ${styles.gitHubIcon}`}
					></i>
				</a>
			</div>
		);
	}

	return (
		<div className={styles.cartContainer}>
			<table>
				<caption className={styles.caption}>
					<h2>Shopping Cart</h2>
				</caption>
				<thead>
					<tr>
						<th scope="col">Item</th>
						<th scope="col">Price</th>
						<th scope="col">Quantity</th>
						<th scope="col">Per item</th>
					</tr>
				</thead>
				<tbody>
					{cart.map((product) => {
						return (
							<tr key={product.id}>
								<td>{product.product.title}</td>
								<td>{product.product.price}$</td>
								<td>{product.number}</td>
								<td>
									{Number(product.number) *
										Number(product.product.price)}
									$
								</td>
							</tr>
						);
					})}
					<tr>
						<th colSpan={3} scope="row">
							Total
						</th>
						<td data-testid="total" className={styles.total}>
							<b>{Number(total.toFixed(2))}$</b>
						</td>
					</tr>
				</tbody>
			</table>

			<div className={styles.iconAndButton}>
				<a
					aria-label="GitHub"
					href="https://github.com/Haminimi"
					className={styles.link}
					ref={gitHubLink}
				>
					<i
						aria-hidden="true"
						className={`devicon-github-original ${styles.gitHubIcon}`}
					></i>
				</a>
				<button onClick={openModal} className={styles.button}>
					Buy
				</button>
			</div>

			<dialog ref={modalRef} className={styles.modal}>
				<div className={styles.modalContent}>
					<h2>Thank You for Shopping with Us! ❤️</h2>
					<p>
						We express our sincere gratitude for choosing
						AwesomeShop for your recent shopping spree! Your support
						means the world to us, and we hope you found everything
						you were looking for.
					</p>
					<span
						role="button"
						aria-label="Close"
						onClick={closeModal}
						onKeyDown={closeModalWithKeyboard}
						tabIndex={0}
						className={`material-symbols-outlined ${styles.closeIcon}`}
					>
						close
					</span>
				</div>
			</dialog>
		</div>
	);
};

Cart.propTypes = {
	cart: PropTypes.array.isRequired,
};

export default Cart;

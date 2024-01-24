import styles from './Cart.module.css';

const Cart = ({ cart }) => {
	const total = cart.reduce(
		(accumulator, product) =>
			accumulator +
			Number(product.number) * Number(product.product.price),
		0
	);

	if (cart.length === 0) {
		return (
			<div className={styles.cartContainer}>
				<h1>Your cart is empty. Add some items in the shop. 🛒</h1>
			</div>
		);
	}

	return (
		<div className={styles.cartContainer}>
			<table>
				{/* <caption>Cart</caption> */}
				<thead>
					<tr>
						<th colSpan="1">Item</th>
						<th colSpan="1">Price</th>
						<th colSpan="1">Quantity</th>
						<th colSpan="1">Total</th>
					</tr>
				</thead>
				<tbody>
					{cart.map((product) => {
						return (
							<tr key={product.id}>
								<td>{product.product.title}</td>
								<td>{product.product.price} $</td>
								<td>{product.number}</td>
								<td>
									{Number(product.number) *
										Number(product.product.price)}{' '}
									$
								</td>
							</tr>
						);
					})}
					<tr>
						<th colSpan={3}>Total to pay</th>
						<td className={styles.total}>
							<b>{Math.floor(total)} $</b>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Cart;

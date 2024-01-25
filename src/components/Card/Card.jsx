import { useState } from 'react';
import styles from './Card.module.css';

const Card = ({ product, addItem }) => {
	const [numberOfItems, setNumberOfItems] = useState(0);

	function handleClick() {
		addItem(Number(numberOfItems), product);
		setNumberOfItems(0);
	}

	return (
		<div key={product.id} className={styles.product}>
			<div className={styles.imageAndPrice}>
				<div className={styles.imageContainer}>
					<img
						src={product.image}
						alt=""
						className={styles.shopImage}
					/>
				</div>

				<div className={styles.priceContainer}>
					<h1 className={styles.price}>
						<b>{product.price} $</b>
					</h1>
				</div>
			</div>

			<div className={styles.descriptionAndButton}>
				<div className={styles.detailsContainer}>
					<p className={styles.productTitle}>
						<h2 className={styles.productTitle}>
							<b>{product.title}</b>
						</h2>
					</p>
					<br />
					<p className={styles.description}>{product.description}</p>
				</div>

				<div className={styles.inputAndButton}>
					<input
						value={numberOfItems}
						className={styles.input}
						onChange={(e) => setNumberOfItems(e.target.value)}
						type="number"
					/>
					<button className={styles.buyButton} onClick={handleClick}>
						Add{' '}
						<span
							className={`material-symbols-outlined ${styles.addIcon}`}
						>
							add
						</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card;

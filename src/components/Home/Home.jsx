import styles from './Home.module.css';

const Home = () => {
	return (
		<>
			<div className={styles.homeContainer}>
				<div className={styles.welcomeContainer}>
					<h1 className={styles.welcomeMessage}>Welcome</h1>
					<p className={styles.p}>
						Discover a world of virtual shopping where imagination
						meets innovation. Browse through our extensive
						collection of carefully crafted products designed just
						for you. At AwesomeShop, we believe in delivering a
						unique and delightful online shopping experience.
					</p>
				</div>
				<div className={styles.credit}>
					Photo by{' '}
					<a
						className={styles.link}
						href="https://unsplash.com/@tmwd?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
					>
						Artem Gavrysh
					</a>{' '}
					on{' '}
					<a
						className={styles.link}
						href="https://unsplash.com/photos/black-trike-parked-near-soter-F6-U5fGAOik?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
					>
						Unsplash
					</a>
				</div>
			</div>
		</>
	);
};

export default Home;

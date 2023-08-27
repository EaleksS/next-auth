import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
	return (
		<main className={styles.main}>
			<Link href="/auth/signin">SignIn</Link>
			<Link href="/auth/signup">SignUp</Link>
			<Link href="/admin">Admin Page</Link>
		</main>
	);
}

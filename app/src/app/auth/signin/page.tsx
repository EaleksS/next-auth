import { Illustration, SignInForm } from "@/widgets";
import styles from "./page.module.scss";

export default function SignIn() {
	return (
		<main className={styles.main}>
			<SignInForm />
			<Illustration />
		</main>
	);
}

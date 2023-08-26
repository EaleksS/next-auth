import { Illustration, SignUpForm } from "@/widgets";
import styles from "./page.module.scss";

export default function SignUp() {
	return (
		<main className={styles.main}>
			<SignUpForm />
			<Illustration />
		</main>
	);
}

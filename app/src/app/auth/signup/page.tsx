import { Illustration, SignUpForm } from "@/widgets";
import styles from "./page.module.scss";

export default function SignUp() {
	return (
		<main className={styles.main}>
			<SignUpForm />
			<Illustration url="https://i.imgur.com/YPQc9ad.gif" />
		</main>
	);
}

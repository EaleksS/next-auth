import { Illustration, SignInForm } from "@/widgets";
import styles from "./page.module.scss";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function SignIn() {
	const session = await getServerSession(options);

	if (session?.user) {
		redirect("/admin");
	}

	return (
		<main className={styles.main}>
			<SignInForm />
			<Illustration />
		</main>
	);
}

import { Text } from "@/shared";
import styles from "./page.module.scss";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Card, SignOut } from "@/entities";

export default async function Admin() {
	const session = await getServerSession(options);

	return (
		<main className={styles.admin}>
			<SignOut />
			<Card
				username={
					session?.user.username ? session?.user.username : session?.user.name
				}
				email={session?.user.email}
				url={session?.user.image}
			/>
		</main>
	);
}

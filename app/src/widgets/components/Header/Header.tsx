import { SignOut } from "@/entities";
import { FC } from "react";
import styles from "./Header.module.scss";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Text } from "@/shared";
import Image from "next/image";

export const Header: FC = async () => {
	const session = await getServerSession(options);

	return (
		<header className={styles.header}>
			<div className={styles.title}>
				<div className={styles.user}>
					<Image
						src={
							session?.user.image
								? session?.user.image
								: "https://i.pinimg.com/originals/7d/bb/57/7dbb57c2b6e25bd2c2cec4de77fbd81c.jpg"
						}
						alt={session?.user.username ? session?.user.username : ""}
						width={50}
						height={50}
					/>
					<Text typeText="p">
						{session?.user.username
							? session?.user.username
							: session?.user.name}
					</Text>
				</div>
				<SignOut />
			</div>
		</header>
	);
};

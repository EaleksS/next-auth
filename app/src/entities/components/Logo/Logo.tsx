import Image from "next/image";
import { FC } from "react";
import styles from "./Logo.module.scss";
import Link from "next/link";

export const Logo: FC = () => {
	return (
		<Link href="/">
			<Image
				src="/assets/img/Logo.svg"
				alt="logo"
				width={32}
				height={32}
				className={styles.logo}
			/>
		</Link>
	);
};

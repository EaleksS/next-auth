import { FC } from "react";
import styles from "./Illustration.module.scss";
import Image from "next/image";

export const Illustration: FC = () => {
	return (
		<Image
			src="/assets/img/illustration.png"
			alt="illustration"
			width={720}
			height={1024}
			priority
			className={styles.illustration}
		/>
	);
};

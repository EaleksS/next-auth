import { FC } from "react";
import styles from "./Illustration.module.scss";
import Image from "next/image";

interface Props {
	url?: string;
}

export const Illustration: FC<Props> = ({
	url = "https://i.imgur.com/YPQc9ad.gif",
}) => {
	return (
		<Image
			src={url}
			alt="illustration"
			width={720}
			height={1024}
			priority
			className={styles.illustration}
		/>
	);
};

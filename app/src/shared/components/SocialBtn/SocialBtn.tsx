"use client";

import { FC } from "react";
import styles from "./SocialBtn.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Text } from "../Text/Text";

interface Props {
	logo_url?: string;
	description?: string;
	onClick?: () => void;
}

export const SocialBtn: FC<Props> = ({
	logo_url = "/assets/img/google.svg",
	description = "description",
	onClick,
}) => {
	return (
		<div className={styles.social} onClick={() => onClick && onClick()}>
			<Image src={logo_url} alt="logo" width={30} height={30} />
			<Text typeText="p" style={{ fontSize: 16, opacity: 0.7 }}>
				{description}
			</Text>
		</div>
	);
};

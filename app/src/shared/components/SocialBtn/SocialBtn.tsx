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
	width?: number;
	height?: number;
}

export const SocialBtn: FC<Props> = ({
	logo_url = "/assets/img/google.svg",
	description = "description",
	onClick,
	width = 30,
	height = 30,
}) => {
	return (
		<div className={styles.social} onClick={() => onClick && onClick()}>
			<Image src={logo_url} alt="logo" width={width} height={height} />
			<Text typeText="p" style={{ fontSize: 16, opacity: 0.7 }}>
				{description}
			</Text>
		</div>
	);
};

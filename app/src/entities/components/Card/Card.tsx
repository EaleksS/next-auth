import { FC } from "react";
import styles from "./Card.module.scss";
import Image from "next/image";
import { Text } from "@/shared";

interface ImageProps {
	url: string | null;
}

const ImageComponent: FC<ImageProps> = ({ url }) => {
	if (!url) return;

	return (
		<Image
			className={styles.user_img}
			src={url}
			alt="user"
			width={100}
			height={100}
		/>
	);
};

interface Props {
	email?: string | null;
	username?: string | null;
	url?: string | null;
}

export const Card: FC<Props> = ({
	username = "username",
	email = "email",
	url = "https://i.pinimg.com/originals/7d/bb/57/7dbb57c2b6e25bd2c2cec4de77fbd81c.jpg",
}) => {
	return (
		<div className={styles.card}>
			<ImageComponent url={url} />
			<div className={styles.title}>
				<Text typeText="h4">Имя: {username}</Text>
				<Text typeText="p" opacity={0.7}>
					Почта: {email}
				</Text>
			</div>
		</div>
	);
};

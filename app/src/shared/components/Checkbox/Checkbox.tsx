"use client";

import { FC, ReactNode, useState } from "react";
import styles from "./Checkbox.module.scss";
import { Text } from "../Text/Text";
import { BsCheckLg } from "react-icons/bs";

interface Props {
	children?: ReactNode;
}

export const Checkbox: FC<Props> = ({ children }) => {
	const [isChecked, setIsChecked] = useState<boolean>(false);

	return (
		<label
			className={styles.label}
			onClick={() => setIsChecked((prev) => !prev)}
		>
			<div className={`${styles.checkbox} ${isChecked && styles.active}`}>
				{isChecked && <BsCheckLg />}
			</div>
			<Text typeText="p">{children}</Text>
		</label>
	);
};

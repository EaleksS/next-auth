"use client";

import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import styles from "./Checkbox.module.scss";
import { Text } from "../Text/Text";
import { BsCheckLg } from "react-icons/bs";

interface Props {
	children?: ReactNode;
	isChecked: boolean;
	setIsChecked: Dispatch<SetStateAction<boolean>>;
}

export const Checkbox: FC<Props> = ({ children, isChecked, setIsChecked }) => {
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

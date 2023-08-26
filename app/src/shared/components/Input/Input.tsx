import { FC, InputHTMLAttributes, DetailedHTMLProps } from "react";
import styles from "./Input.module.scss";

interface Props
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	icon?: JSX.Element;
}

export const Input: FC<Props> = (props) => {
	return (
		<label className={styles.label}>
			{props.icon && props.icon}
			<input {...props} />
		</label>
	);
};

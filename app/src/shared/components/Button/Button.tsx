import { FC, DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface Props
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	typeBtn?: "small" | "medium" | "big";
	shade?: 400 | 300;
}

export const Button: FC<Props> = (props) => {
	switch (props.typeBtn) {
		case "small":
			return (
				<button
					className={`${styles.btn} ${styles.small}  ${
						props.shade === 400 && styles.c_400
					} ${props.shade === 300 && styles.c_300}`}
					{...props}
				>
					{props.children ? props.children : "button"}
				</button>
			);

		case "medium":
			return (
				<button
					className={`${styles.btn} ${styles.medium} ${
						props.shade === 400 && styles.c_400
					} ${props.shade === 300 && styles.c_300}`}
					{...props}
				>
					{props.children ? props.children : "button"}
				</button>
			);

		default:
			return (
				<button
					className={`${styles.btn}  ${props.shade === 300 && styles.c_400} ${
						props.shade === 300 && styles.c_300
					}`}
					{...props}
				>
					{props.children ? props.children : "button"}
				</button>
			);
	}
};

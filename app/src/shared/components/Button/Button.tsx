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

export const Button: FC<Props> = ({ typeBtn, shade, ...props }) => {
	switch (typeBtn) {
		case "small":
			return (
				<button
					className={` ${styles.btn} ${styles.small}  ${
						shade === 400 && styles.c_400
					} ${shade === 300 && styles.c_300} `}
					{...props}
				>
					{props.children ? props.children : "button"}
				</button>
			);

		case "medium":
			return (
				<button
					className={`${styles.btn} ${styles.medium} ${
						shade === 400 && styles.c_400
					} ${shade === 300 && styles.c_300}`}
					{...props}
				>
					{props.children ? props.children : "button"}
				</button>
			);

		default:
			return (
				<button
					className={`${styles.btn}  ${shade === 300 && styles.c_400} ${
						shade === 300 && styles.c_300
					}`}
					{...props}
				>
					{props.children ? props.children : "button"}
				</button>
			);
	}
};

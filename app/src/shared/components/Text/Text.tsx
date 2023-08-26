import { FC, DetailedHTMLProps, HTMLAttributes, CSSProperties } from "react";
import styles from "./Text.module.scss";

interface Props
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLHeadingElement>,
		HTMLHeadingElement
	> {
	typeText?: "h2" | "h3" | "h4" | "p";
	fw?: "400" | "500" | "600" | "700";
	color?: string;
	opacity?: number;
	mt?: string;
}

export const Text: FC<Props> = (props) => {
	const styleProps: CSSProperties = {
		fontWeight: props.fw ? props.fw : "400",
		color: props.color ? props.color : undefined,
		opacity: props.opacity ? props.opacity : 1,
		marginTop: props.mt ? props.mt : 0,
	};

	switch (props.typeText) {
		case "h2":
			return (
				<h2
					className={`${styles.text} ${styles.h2}`}
					style={styleProps}
					{...props}
				>
					{props.children ? props.children : "text"}
				</h2>
			);

		case "h3":
			return (
				<h3
					className={`${styles.text} ${styles.h3}`}
					style={styleProps}
					{...props}
				>
					{props.children ? props.children : "text"}
				</h3>
			);

		case "h4":
			return (
				<h4
					className={`${styles.text} ${styles.h4}`}
					style={styleProps}
					{...props}
				>
					{props.children ? props.children : "text"}
				</h4>
			);

		case "p":
			return (
				<p
					className={`${styles.text} ${styles.p}`}
					style={styleProps}
					{...props}
				>
					{props.children ? props.children : "text"}
				</p>
			);

		default:
			return (
				<h1 className={`${styles.text}`} style={styleProps} {...props}>
					{props.children ? props.children : "text"}
				</h1>
			);
	}
};

import { FC, InputHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";
import styles from "./Input.module.scss";
import { FieldError } from "react-hook-form";

interface Props
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	icon?: JSX.Element;
	error?: FieldError;
}

const Input = forwardRef<HTMLInputElement, Props>(
	({ icon, error, ...props }, ref) => {
		return (
			<>
				<label className={`${styles.label} ${error && styles.error}`}>
					{icon && icon}
					<input {...props} ref={ref} />
				</label>
				{error?.type === "required" && (
					<span className={styles.error}>Поле на заполнено</span>
				)}
				{error?.type === "pattern" && (
					<span className={styles.error}>Почта введена не корректно</span>
				)}
				{error?.type === "minLength" && (
					<span className={styles.error}>{error.message}</span>
				)}
				{error?.type === "validate" && (
					<span className={styles.error}>{error.message}</span>
				)}
			</>
		);
	}
);

Input.displayName = "Input";

export { Input };

import { Button, Checkbox, Input, Text } from "@/shared";
import { FC } from "react";
import styles from "./SignUpForm.module.scss";
import { HiOutlineMail } from "react-icons/hi";
import { PiLockKeyBold } from "react-icons/pi";
import Link from "next/link";
import { Form } from "./Form";

export const SignUpForm: FC = () => {
	return (
		<div className={styles.signup}>
			<Text>
				Ждём тебя здесь,<span> брат!</span>
			</Text>
			<Text typeText="p" opacity={0.7} mt="24px">
				Зарегистрироваться на сайте, чтобы начать творить магию.
			</Text>
			<Form />
			<Text
				typeText="p"
				style={{ textAlign: "center", marginTop: "24px", color: "#686B6E" }}
			>
				Уже есть учетная запись?
				<Link href="/auth/signin">
					<span> Войти</span>
				</Link>
			</Text>
		</div>
	);
};

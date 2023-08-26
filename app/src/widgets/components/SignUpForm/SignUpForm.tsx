import { Button, Checkbox, Input, Text } from "@/shared";
import { FC } from "react";
import styles from "./SignUpForm.module.scss";
import { HiOutlineMail } from "react-icons/hi";
import { PiLockKeyBold } from "react-icons/pi";
import Link from "next/link";

export const SignUpForm: FC = () => {
	return (
		<div className={styles.signup}>
			<Text>
				Ждём тебя здесь,<span> брат!</span>
			</Text>
			<Text typeText="p" opacity={0.7} mt="24px">
				Зарегистрироваться на сайте, чтобы начать творить магию.
			</Text>
			<form>
				<Input
					type="email"
					placeholder="Почта"
					icon={<HiOutlineMail size={20} color="#686B6E" />}
				/>
				<Input
					type="password"
					placeholder="Пароль"
					icon={<PiLockKeyBold size={20} color="#686B6E" />}
				/>
				<Input
					type="password"
					placeholder="Повторите пароль"
					icon={<PiLockKeyBold size={20} color="#686B6E" />}
				/>
				<div className={styles.rules}>
					<Checkbox>
						Я согласен с
						<Link href="#">
							<span> правилами и условиями</span>
						</Link>
					</Checkbox>
				</div>
				<Button>Зарегистрироваться</Button>
			</form>
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

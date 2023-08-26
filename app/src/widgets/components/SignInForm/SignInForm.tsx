import { Button, Checkbox, Input, SocialBtn, Text } from "@/shared";
import { FC } from "react";
import styles from "./SignInForm.module.scss";
import { HiOutlineMail } from "react-icons/hi";
import { PiLockKeyBold } from "react-icons/pi";
import Link from "next/link";

export const SignInForm: FC = () => {
	return (
		<div className={styles.signin}>
			<Text>
				Привет, <span>Творец!</span>
			</Text>
			<Text typeText="p" opacity={0.7} mt="24px">
				Войдите в сайт, чтобы начать творить магию.
			</Text>
			<div className={styles.socials}>
				<SocialBtn description="Sign In with Google" />
				<SocialBtn
					logo_url="/assets/img/apple.svg"
					description="Sign In with Apple"
				/>
			</div>
			<div className={styles.line}></div>
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
				<div className={styles.remember}>
					<Checkbox>Не выходить</Checkbox>
					<Link href="#">
						<Text typeText="p">
							<span>Забыли пароль?</span>
						</Text>
					</Link>
				</div>
				<Button>Войти</Button>
			</form>
			<Text
				typeText="p"
				style={{ textAlign: "center", marginTop: "24px", color: "#686B6E" }}
			>
				У вас нет учетной записи?
				<Link href="/auth/signup">
					<span> Зарегистрироваться</span>
				</Link>
			</Text>
		</div>
	);
};

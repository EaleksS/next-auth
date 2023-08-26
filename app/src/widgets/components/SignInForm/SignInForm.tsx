import { SocialBtn, Text } from "@/shared";
import { FC } from "react";
import styles from "./SignInForm.module.scss";
import Link from "next/link";
import { Form } from "./Form";

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
			<Form />
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

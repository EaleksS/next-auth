"use client";

import { SocialBtn } from "@/shared";
import React from "react";
import styles from "./SignInForm.module.scss";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const SocialSignIn = () => {
	const router = useRouter();

	const onSubmit = async (provider: string) => {
		const res = await signIn(provider);

		if (res?.error) {
			console.log("Получена ошибка", res.error);
		} else {
			console.log("Вы вошли");

			router.push("/admin");
		}
	};

	return (
		<div className={styles.socials}>
			<SocialBtn
				logo_url="/assets/img/discord.png"
				description="Discord"
				onClick={() => onSubmit("discord")}
			/>
			<SocialBtn
				logo_url="/assets/img/github.png"
				description="GitHub"
				onClick={() => onSubmit("github")}
				width={40}
				height={40}
			/>
		</div>
	);
};

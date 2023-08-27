"use client";

import { Button, Checkbox, Input, Loader, Text } from "@/shared";
import Link from "next/link";
import { FC, useEffect, useState, useTransition } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { PiLockKeyBold } from "react-icons/pi";
import styles from "./SignInForm.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface IFormInput {
	email: string;
	password: string;
}

export const Form: FC = () => {
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		setIsLoading(true);

		const res = await signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: false,
		});

		if (res?.error) {
			console.log("Получена ошибка", res.error);
			reset();
			setIsLoading(false);
		} else {
			console.log("Вы вошли");

			startTransition(() => router.push("/admin"));
			if (!isPending) {
				setIsLoading(false);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				type="email"
				placeholder="Почта"
				icon={<HiOutlineMail size={20} color="#686B6E" />}
				{...register("email", {
					required: "Почта не введена",
					pattern: {
						value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
						message: "Почта введена не корректно",
					},
				})}
				error={errors.email}
			/>
			<Input
				type="password"
				placeholder="Пароль"
				icon={<PiLockKeyBold size={20} color="#686B6E" />}
				{...register("password", {
					required: "Пароль не введен",
				})}
				error={errors.password}
			/>
			<div className={styles.remember}>
				<Checkbox isChecked={isChecked} setIsChecked={setIsChecked}>
					Не выходить
				</Checkbox>
				<Link href="#">
					<Text typeText="p">
						<span>Забыли пароль?</span>
					</Text>
				</Link>
			</div>
			<Button type="submit" disabled={isLoading}>
				{isLoading ? <Loader /> : "Войти"}
			</Button>
		</form>
	);
};

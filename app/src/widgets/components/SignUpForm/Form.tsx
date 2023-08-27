"use client";

import { Button, Checkbox, Input, Loader, Text } from "@/shared";
import Link from "next/link";
import { FC, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { PiLockKeyBold, PiUserBold } from "react-icons/pi";
import styles from "./SignUpForm.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { getAuth } from "@/services/auth.service";
import { toast } from "react-toastify";

interface IFormInput {
	email: string;
	username: string;
	password: string;
	password_repeat: string;
}

export const Form: FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<IFormInput>();
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [isCheckedRules, setIsCheckedRules] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		if (!isChecked) return setIsCheckedRules(true);
		setIsLoading(true);

		await getAuth
			.addUser({
				email: data.email,
				username: data.username,
				password: data.password,
			})
			.then((res) => {
				setIsLoading(false);
				toast.success("Вы успешно зарегистри́ровались на сайте.");
			})
			.catch((err) => {
				setIsLoading(false);
				toast.error(`Произошла ошибка: ${err.message}`);
			});

		setIsCheckedRules(!isChecked);
		reset();
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
				type="text"
				placeholder="Имя"
				icon={<PiUserBold size={20} color="#686B6E" />}
				{...register("username", {
					required: "Имя не введен",
				})}
				error={errors.username}
			/>
			<Input
				type="password"
				placeholder="Пароль"
				icon={<PiLockKeyBold size={20} color="#686B6E" />}
				{...register("password", {
					required: "Пароль не введен",
					minLength: {
						value: 8,
						message: "Слишком короткий пароль",
					},
				})}
				error={errors.password}
			/>
			<Input
				type="password"
				placeholder="Повторите пароль"
				icon={<PiLockKeyBold size={20} color="#686B6E" />}
				{...register("password_repeat", {
					required: "Пароль не введен",
					validate: (value) =>
						value === watch("password") || "Пароли не совпадают",
					minLength: {
						value: 8,
						message: "Слишком короткий пароль",
					},
				})}
				error={errors.password_repeat}
			/>
			<div className={styles.rules}>
				<Checkbox isChecked={isChecked} setIsChecked={setIsChecked}>
					Я согласен с
					<Link href="#">
						<span> правилами и условиями *</span>
					</Link>
				</Checkbox>
			</div>
			{isCheckedRules && (
				<span style={{ color: "red" }}>Вы не поставили галочку</span>
			)}
			<Button type="submit" disabled={isLoading}>
				{isLoading ? <Loader /> : "Зарегистрироваться"}
			</Button>
		</form>
	);
};

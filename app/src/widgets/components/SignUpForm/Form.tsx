"use client";

import { Button, Checkbox, Input, Text } from "@/shared";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { PiLockKeyBold } from "react-icons/pi";
import styles from "./SignUpForm.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
	email: string;
	password: string | number;
	password_repeat: string | number;
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

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		if (!isChecked) return setIsCheckedRules(true);

		setIsCheckedRules(!isChecked);
		console.log(data);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				type="email"
				placeholder="Почта"
				icon={<HiOutlineMail size={20} color="#686B6E" />}
				{...register("email", {
					required: "Формат не правильный",
					pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
				})}
				error={errors.email}
			/>
			<Input
				type="password"
				placeholder="Пароль"
				icon={<PiLockKeyBold size={20} color="#686B6E" />}
				{...register("password", {
					required: true,
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
					required: true,
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
			<Button type="submit">Зарегистрироваться</Button>
		</form>
	);
};

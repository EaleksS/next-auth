"use client";

import { Button, Checkbox, Input, Text } from "@/shared";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { PiLockKeyBold } from "react-icons/pi";
import styles from "./SignInForm.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
	email: string;
	password: string | number;
}

export const Form: FC = () => {
	const [isChecked, setIsChecked] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
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
			<Button type="submit">Войти</Button>
		</form>
	);
};

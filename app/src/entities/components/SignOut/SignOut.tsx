"use client";

import React, { FC, useState } from "react";
import { Button, Loader } from "@/shared";
import { signOut } from "next-auth/react";

export const SignOut: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<Button
			onClick={() => {
				setIsLoading(true);
				signOut({
					redirect: true,
					callbackUrl: `${window.location.origin}/auth/signin`,
				});
			}}
			typeBtn="medium"
		>
			{isLoading ? <Loader /> : "Выйти"}
		</Button>
	);
};

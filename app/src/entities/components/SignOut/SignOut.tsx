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
				signOut();
			}}
			style={{ position: "absolute", right: 20, top: 20, zIndex: 2 }}
		>
			{isLoading ? <Loader /> : "Выйти"}
		</Button>
	);
};

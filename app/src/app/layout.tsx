import { Logo } from "@/entities";
import "../styles/globals.css";
import "../styles/reset.min.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	subsets: ["vietnamese", "latin"],
});

export const metadata: Metadata = {
	title: "Auth Next.js",
	description: "auth next",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={plusJakartaSans.className}>
				<Logo />
				{children}
			</body>
		</html>
	);
}

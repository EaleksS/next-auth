"use client";

import { LayoutProvider } from "@/layout/context/layoutcontext";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../../styles/layout/layout.scss";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<PrimeReactProvider>
			<LayoutProvider>{children}</LayoutProvider>
		</PrimeReactProvider>
	);
}

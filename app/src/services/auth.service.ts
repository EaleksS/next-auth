import { IAddUser } from "@/interface/auth.interface";
import axios from "axios";

export const getAuth = {
	async addUser(user: IAddUser) {
		const { data } = await axios.post(
			`${window.location.origin}/api/user`,
			user,
			{
				headers: { "Content-Type": "application/json" },
			}
		);

		return data;
	},
};

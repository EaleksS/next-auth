import { IAddUser } from "@/interface/auth.interface";
import axios from "axios";

export const getAuth = {
	async addUser(user: IAddUser) {
		const { data } = await axios.post(`http://localhost:3000/api/user`, user, {
			headers: { "Content-Type": "application/json" },
		});

		return data;
	},
};

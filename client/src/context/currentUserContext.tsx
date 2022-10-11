import { createContext, ReactNode, useContext, useState } from "react";
import { UserInfoObj } from "../types";

interface ContextInterface {
	currentUser: string | UserInfoObj;
	defineCurrentUser: (data: UserInfoObj) => void;
	logout: () => void;
}

export const CurrentUserContext = createContext<ContextInterface | null>(null);

export function CurrentUserProvider({ children }: { children: ReactNode }) {
	const LS = localStorage.getItem("deadline-currentUser");
	const [currentUser, setCurrentUser] = useState<string | UserInfoObj>(LS ? JSON.parse(LS) : "");

	const defineCurrentUser = (data: UserInfoObj) => {
		setCurrentUser(data);
		localStorage.setItem("deadline-currentUser", JSON.stringify(data));
	};

	const logout = () => {
		setCurrentUser("");
		localStorage.removeItem("deadline-currentUser");
	};

	return (
		<CurrentUserContext.Provider value={{ currentUser, defineCurrentUser, logout }}>
			{children}
		</CurrentUserContext.Provider>
	);
}

export const useCurrentUser = () => useContext(CurrentUserContext);

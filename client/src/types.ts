export interface UserInfoObj {
	_id: string;
	pseudo: string;
	lastname: string;
	firstname: string;
	address: string;
	email: string;
	phone: string;
	createdAt: string;
	token: string;
}

export interface RegisterUserCredentials {
	pseudo: string;
	lastname: string;
	firstname: string;
	address: string;
	email: string;
	phone: string;
	password: string;
}

export interface LoginUserCredentials {
	email: string;
	password: string;
}

export interface EditUserCredentials {
	address: string;
	email: string;
}

export interface APIResponseType {
	success: boolean;
	results: UserInfoObj;
	msg: string;
}

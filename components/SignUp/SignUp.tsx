import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { register } from "../../fetchers/auth";
import Form from "../Form/Form";

interface Props {
	close: () => void;
}

export default function SignUp({ close }: Props) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { mutate } = useMutation(register);

	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (!username || !email || !password) return;

		mutate(
			{ username, email, password },
			{
				onSuccess: () => {
					close();
				},
				onError: () => console.log("error"),
			}
		);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Title>Register</Form.Title>
			<Form.Input
				type="text"
				error=""
				placeholder="Username"
				value={username}
				onChange={(e: any) => setUsername(e.target.value)}
			/>
			<Form.Input
				type="email"
				error=""
				placeholder="Email"
				value={email}
				onChange={(e: any) => setEmail(e.target.value)}
			/>
			<Form.Input
				type="password"
				error=""
				placeholder="Password"
				value={password}
				onChange={(e: any) => setPassword(e.target.value)}
			/>
			<Form.Button>Register</Form.Button>
		</Form>
	);
}

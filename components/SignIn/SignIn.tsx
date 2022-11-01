import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { login } from "../../fetchers/auth";
import Form from "../Form/Form";

interface Props {
	close: () => void;
}

export default function SignIn({ close }: Props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { mutate } = useMutation(login);

	const queryClient = useQueryClient();

	const { reload } = useRouter();

	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (!username || !password) return;

		mutate(
			{ username, password },
			{
				onSuccess: ({ access_token }: { access_token: string }) => {
					localStorage.setItem("token", access_token);
					// queryClient.invalidateQueries(["logged-user"]);
					reload();
					close();
				},
				onError: (err) => {
					console.log(err);
				},
			}
		);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Title>Login</Form.Title>
			<Form.Input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e: any) => setUsername(e.target.value)}
			/>
			<Form.Input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e: any) => setPassword(e.target.value)}
			/>
			<Form.Button>Login</Form.Button>
		</Form>
	);
}

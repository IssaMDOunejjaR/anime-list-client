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
	const [error, setError] = useState<{
		type: "USERNAME" | "PASSWORD" | null;
		message: string;
	}>({ type: null, message: "" });
	const [serverError, setServerError] = useState("");

	const { mutate } = useMutation(login);

	const { reload } = useRouter();

	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (!username) {
			setError({ type: "USERNAME", message: "Username can't be empty" });
		} else if (!password) {
			setError({ type: "PASSWORD", message: "Password can't be empty" });
		} else {
			mutate(
				{ username, password },
				{
					onSuccess: ({ access_token }: { access_token: string }) => {
						localStorage.setItem("token", access_token);
						setError({
							type: null,
							message: "=",
						});
						reload();
						close();
					},
					onError: (err) => {
						const error = err as any;

						setError({
							type: null,
							message: "=",
						});
						if (error.response.status === 404) {
							setServerError("Invalid Credentials");
						} else if (error.response.status === 500) {
							setServerError("Server Error");
						}
					},
				}
			);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Title>Login</Form.Title>
			{serverError && <Form.Error message={serverError} />}
			<Form.Input
				type="text"
				placeholder="Username"
				isError={error.type === "USERNAME"}
				errorMsg={error.message}
				value={username}
				onChange={(e: any) => setUsername(e.target.value)}
			/>
			<Form.Input
				type="password"
				placeholder="Password"
				isError={error.type === "PASSWORD"}
				errorMsg={error.message}
				value={password}
				onChange={(e: any) => setPassword(e.target.value)}
			/>
			<Form.Button>Login</Form.Button>
		</Form>
	);
}

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { register } from "../../fetchers/auth";
import Form from "../Form/Form";
import * as EmailValidator from "email-validator";

interface Props {
	close: () => void;
}

export default function SignUp({ close }: Props) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<{
		type: "USERNAME" | "EMAIL" | "PASSWORD" | null;
		message: string;
	}>({ type: null, message: "" });
	const [serverError, setServerError] = useState("");

	const { mutate } = useMutation(register);

	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (!username) {
			setError({ type: "USERNAME", message: "Username can't be empty" });
		} else if (!email) {
			setError({ type: "EMAIL", message: "Email can't be empty" });
		} else if (!EmailValidator.validate(email)) {
			setError({ type: "EMAIL", message: "Invalid email" });
		} else if (!password) {
			setError({ type: "PASSWORD", message: "Password can't be empty" });
		} else {
			mutate(
				{ username, email, password },
				{
					onSuccess: () => {
						setError({
							type: null,
							message: "=",
						});
						close();
					},
					onError: (err) => {
						const error = err as any;

						setError({
							type: null,
							message: "=",
						});
						if (error.response.status === 400) {
							setServerError("Username or Email already exist");
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
			<Form.Title>Register</Form.Title>
			{serverError && <Form.Error message={serverError} />}
			<Form.Input
				type="text"
				isError={error.type === "USERNAME"}
				errorMsg={error.message}
				placeholder="Username"
				value={username}
				onChange={(e: any) => setUsername(e.target.value)}
			/>
			<Form.Input
				type="text"
				isError={error.type === "EMAIL"}
				errorMsg={error.message}
				placeholder="Email"
				value={email}
				onChange={(e: any) => setEmail(e.target.value)}
			/>
			<Form.Input
				type="password"
				isError={error.type === "PASSWORD"}
				errorMsg={error.message}
				placeholder="Password"
				value={password}
				onChange={(e: any) => setPassword(e.target.value)}
			/>
			<Form.Button>Register</Form.Button>
		</Form>
	);
}

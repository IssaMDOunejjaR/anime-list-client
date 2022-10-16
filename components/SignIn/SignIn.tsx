import Form from "../Form/Form";

export default function SignIn() {
	return (
		<Form>
			<Form.Title>Login</Form.Title>
			<Form.Input type="text" placeholder="Username" />
			<Form.Input type="password" placeholder="Password" />
			<Form.Button>Login</Form.Button>
		</Form>
	);
}

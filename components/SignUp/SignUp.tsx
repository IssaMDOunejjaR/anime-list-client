import Form from "../Form/Form";

export default function SignUp() {
	return (
		<Form>
			<Form.Title>Register</Form.Title>
			<Form.Input type="text" placeholder="Username" />
			<Form.Input type="email" placeholder="Email" />
			<Form.Input type="password" placeholder="Password" />
			<Form.Button>Register</Form.Button>
		</Form>
	);
}

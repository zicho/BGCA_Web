<script lang="typescript">
	export let title: string = "Hello TypeScript";

	import { authentication } from '../stores/auth.js';

	let isAuthed;

	const unsubscribe = authentication.subscribe(value => {
		isAuthed = value;
	});

	import * as signalR from "@microsoft/signalr";
	import { fade } from "svelte/transition";
	import { quintInOut } from "svelte/easing";

	import {
		Button,
		Spinner,
		Row,
		Container,
		CustomInput,
		Form,
		FormGroup,
		Label,
		Input,
	} from "sveltestrap/src";

	let loggedIn: boolean = false;
	let loading: boolean = false;

	let username: string = "test";
	let password: string = "test";
	let token: string;

	let nameOfGame: string = "Adrenaline";
	let recipient: string = "test2";

	let errorMessage: string;

	async function login(e) {
		e.preventDefault();

		loading = true;

		const response: any = await fetch(
			"https://localhost:44361/api/user/login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			}
		)
			.catch(() => displayError("Could not reach server"))
			.finally(() => {
				loading = false;
			});

		const result = await response.json();

		if (!result.success) {
			displayError(result.message);
		} else {
			authentication.update(() => true);
			token = result.data.jwt;
			connect(result.data.jwt);
		}
	}

	function displayError(msg) {
		errorMessage = msg;
		setTimeout(() => (errorMessage = null), 5000);
	}

	async function invite() {
		await fetch("https://localhost:44361/api/session/invite", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				sender: username,
				recipient: recipient,
				nameOfGame: nameOfGame,
			}),
		});
	}

	function connect(token) {
		console.dir(token);
		const connection = new signalR.HubConnectionBuilder()
			.withUrl("https://localhost:44361/notifications", {
				accessTokenFactory: () => token,
			})
			.build();

		connection.on("SendNotice", (to: string, content) => {
			alert("message for " + to + ": " + content);
		});

		connection
			.start()
			.finally(() =>
				console.log(
					connection.state == signalR.HubConnectionState.Connected
				)
			);
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{#if !isAuthed}
	<Container class="clear-defaults col-md-4 mx-auto">
		<Row>
			<h1 class="text-center">BGCA</h1>
		</Row>
		<Row>
			<Form>
				<FormGroup>
					<Label for="input_username" class="dm-xs-b">
						<strong>Email</strong>
					</Label>
					<Input
						bind:value={username}
						type="text"
						name="email"
						id="input_username"
						placeholder="Username" />
				</FormGroup>
				<FormGroup class="dm-sm-t">
					<Label for="input_password" class="dm-xs-b">
						<strong>Password</strong>
					</Label>
					<a
						href="/"
						class="float-right text-primary no-underline">Forgot
						password?</a>
					<Input
						bind:value={password}
						type="password"
						name="password"
						id="input_password"
						placeholder="Password" />
				</FormGroup>
				<FormGroup>
					<Button
						style="width: 100%"
						color="primary"
						class="dm-md-t"
						on:click={login}>
						{#if !loading}
							<!-- <Icon icon={faCircle} /> -->
							Login
						{:else}
							<Spinner size="sm" color="light" />
						{/if}
					</Button>
				</FormGroup>
			</Form>
		</Row>
		<Row class="dm-sm-t">
			<span class="text-center">Want to join?
				<a href="#" class="text-primary no-underline">Register here!</a></span>
		</Row>
		<Row class="dm-lg-t" style="min-height: 50px;">
			{#if errorMessage != null}
				<h5
					class="color-error text-center"
					transition:fade={{ delay: 250, duration: 300, easing: quintInOut }}>
					{errorMessage}
				</h5>
			{/if}
		</Row>
	</Container>
{:else}
	<h3>User panel</h3>

	<input type="text" placeholder="name of game" bind:value={nameOfGame} />
	<input type="text" placeholder="recipient" bind:value={recipient} />

	<button on:click={invite}>SEND INVITE</button>
{/if}

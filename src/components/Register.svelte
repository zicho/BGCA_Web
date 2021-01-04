<script lang="ts">

    import { fade } from "svelte/transition";
    import { quintInOut } from "svelte/easing";

    import {
        Button,
        Spinner,
        Row,
        Container,
        Form,
        FormGroup,
        Label,
        Input,
    } from "sveltestrap/src";

    let loading: boolean = false;

    let username: string;
    let password: string;
    
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
			})
			.catch(() => displayError("Could not reach server"))

		const result = await response.json();

		if (!result.success) {
			displayError(result.message);
		} else {
		}
	}

	function displayError(msg) {
		errorMessage = msg;
		setTimeout(() => (errorMessage = null), 5000);
	}

	// async function invite() {
	// 	await fetch("https://localhost:44361/api/session/invite", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Accept: "application/json",
	// 			Authorization: `Bearer ${$jwt}`,
	// 		},
	// 		body: JSON.stringify({
	// 			sender: username,
	// 			recipient: recipient,
	// 			nameOfGame: nameOfGame,
	// 		}),
	// 	});
	// }
</script>

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
                <a href="/" class="float-right text-primary no-underline">Forgot
                    password?</a>
                <Input
                    bind:value={password}
                    type="password"
                    name="password"
                    id="input_password"
                    placeholder="Password" />
            </FormGroup>
            <FormGroup class="dm-sm-t">
                <Label for="input_confirm_password" class="dm-xs-b">
                    <strong>Confirm password</strong>
                </Label>
                <Input
                    bind:value={password}
                    type="password"
                    name="password"
                    id="input_confirm_password"
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
                        Register
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

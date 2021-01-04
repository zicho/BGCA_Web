<script lang="ts">
    import { isAuthed, user, login } from "../stores/user.js";

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
    let register: boolean = false;

    let username: string;
    let password: string;
    let confirm_password: string;

    let errorMessage: string;

    async function confirm(e) {
        e.preventDefault();
        loading = true;

        if (register) {
            if (password != confirm_password) {
                displayError("Passwords do not match.");
                loading = false;
                return;
            }
        }

        var result: any = login(username, password, register).catch(() => displayError("Could not reach server."));

        if (!result) {
            $isAuthed = false;
            displayError(result.message);
        } else if (register) {
            register = false;
            loading = false;
        }
    }

    function displayError(msg) 
    {
        loading = false;
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
                    <strong>Username</strong>
                </Label>
                <Input
                    bind:value={username}
                    type="text"
                    name="username"
                    id="input_username"
                    placeholder="Username" />
            </FormGroup>
            <FormGroup class="dm-sm-t">
                <Label for="input_password" class="dm-xs-b">
                    <strong>Password</strong>
                </Label>
                {#if !register}
                    <a
                        href="/"
                        class="float-right text-primary no-underline">Forgot
                        password?</a>
                {/if}
                <Input
                    bind:value={password}
                    type="password"
                    name="password"
                    id="input_password"
                    placeholder="Password" />
            </FormGroup>
            {#if register}
                <div transition:fade={{ duration: 300, easing: quintInOut }}>
                    <FormGroup class="dm-sm-t">
                        <Label for="input_confirm_password" class="dm-xs-b">
                            <strong>Confirm password</strong>
                        </Label>
                        <Input
                            bind:value={confirm_password}
                            type="password"
                            name="confirm_password"
                            id="input_confirm_password"
                            placeholder="Password" />
                    </FormGroup>
                </div>
            {/if}
            <FormGroup>
                <div transition:fade={{ duration: 300, easing: quintInOut }}>
                    <Button
                        style="width: 100%"
                        color="primary"
                        class="dm-md-t"
                        on:click={confirm}>
                        {#if !loading}
                            <!-- <Icon icon={faCircle} /> -->
                            {register ? 'Register' : 'Login'}
                        {:else}
                            <Spinner size="sm" color="light" />
                        {/if}
                    </Button>
                </div>
            </FormGroup>
        </Form>
    </Row>
    <Row class="dm-sm-t">
        {#if !register}
            <span class="text-center">
                Want to join?
                <a
                    href="#"
                    on:click={() => (register = !register)}
                    class="text-primary no-underline">Register here!</a>
            </span>
        {:else}
            <span class="text-center">
                Already a member?
                <a
                    href="#"
                    on:click={() => (register = !register)}
                    class="text-primary no-underline">Login.</a>
            </span>
        {/if}
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

<script lang="typescript">
	export let title: string = "Hello TypeScript";

	import { isAuthed, user } from "../stores/user.js";
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h3>User panel</h3>
<!-- 
<input type="text" placeholder="name of game" bind:value={nameOfGame} />
<input type="text" placeholder="recipient" bind:value={recipient} />

<button on:click={invite}>SEND INVITE</button> -->

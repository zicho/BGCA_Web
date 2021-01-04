<script>
	import * as Toastr from "toastr";

	Toastr.options = {
		// closeButton: true,
		// debug: false,
		// newestOnTop: false,
		// progressBar: false,
		positionClass: "toast-bottom-right",
		// preventDuplicates: false,
		// onclick: null,
		// showDuration: "300",
		// hideDuration: "1000",
		// timeOut: "5000",
		// extendedTimeOut: "1000",
		// showEasing: "swing",
		// hideEasing: "linear",
		// showMethod: "fadeIn",
		// hideMethod: "fadeOut",
	};

	import Nav from "../components/Nav.svelte";
	import About from "./about.svelte";

	import Login from "../components/Login.svelte";
	import Register from "../components/Register.svelte";

	import { isAuthed } from "../stores/user.js";

	export let segment;
</script>

<Nav {segment} />

<svelte:head>
	<!-- SIGNAL R -->
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/3.1.7/signalr.min.js">
	</script>
	<!-- BOOTSTRAP -->
	<script
		src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
		integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs="
		crossorigin="anonymous">
	</script>
	<script
		src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
		integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
		crossorigin="anonymous">
	</script>
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
		crossorigin="anonymous" />

	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
		integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
		crossorigin="anonymous" />

	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap"
		rel="stylesheet" />

	<link
		href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css"
		rel="stylesheet" />
</svelte:head>

<html lang="en" xml:lang="en">
	<body>
		{#if $isAuthed}
			<main>
				<slot />
			</main>
		{:else}
			<Login />
		{/if}
	</body>
</html>

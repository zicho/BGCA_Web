<script>
	export let segment;

	import { 
		Navbar,
		NavbarBrand, 
		NavbarToggler, 
		Collapse, 
		Nav, 
		NavItem, 
		NavLink, 
		UncontrolledDropdown, 
		DropdownToggle, 
		DropdownItem, 
		DropdownMenu } 
	from "sveltestrap/src";

	let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }

</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255, 62, 0, 0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: "";
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: "";
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255, 62, 0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>
<Navbar color="dark" dark expand="md">
	<NavbarBrand class="dm-l" href="/">BGCA</NavbarBrand>
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
	<!-- <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
	  <Nav class="ml-auto" navbar>
		<NavItem>
		  <NavLink href="#components/">Components</NavLink>
		</NavItem>
		<NavItem>
		  <NavLink href="https://github.com/bestguy/sveltestrap">GitHub</NavLink>
		</NavItem>
		<UncontrolledDropdown nav inNavbar>
		  <DropdownToggle nav caret>Options</DropdownToggle>
		  <DropdownMenu right>
			<DropdownItem>Option 1</DropdownItem>
			<DropdownItem>Option 2</DropdownItem>
			<DropdownItem divider />
			<DropdownItem>Reset</DropdownItem>
		  </DropdownMenu>
		</UncontrolledDropdown>
	  </Nav>
	</Collapse> -->
  </Navbar>

<!-- <nav>
	<ul>
		<li>
			<a
				aria-current={segment === undefined ? 'page' : undefined}
				href=".">home</a>
		</li>
		<li>
			<a
				aria-current={segment === 'about' ? 'page' : undefined}
				href="about">about</a>
		</li>

		<li>
			<a
				rel="prefetch"
				aria-current={segment === 'blog' ? 'page' : undefined}
				href="blog">blog</a>
		</li>
	</ul>
</nav> -->

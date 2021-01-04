<script>
	export let segment;

	import { isAuthed, jwt } from "../stores/auth.js";
	import Icon from "fa-svelte";
	import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
	import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
	import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
	import { faDice } from "@fortawesome/free-solid-svg-icons/faDice";
	import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
	import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";

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
		DropdownMenu,
	} from "sveltestrap/src";

	import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";

	let isOpen = false;

	function handleUpdate(event) {
		isOpen = event.detail.isOpen;
	}

	let active = false;

	function test() {
		active = !active;
		console.log(segment);
	}
</script>

<Navbar color="dark" dark expand="md">
	<NavbarBrand class="dm-lg-l" href="/">BGCA</NavbarBrand>
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
	<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav class="ml-auto justify-content-end dm-lg-r" navbar>
			{#if $isAuthed}
				<NavItem>
					<NavLink class="active nav-item-wide" href="/">
						<Icon class="navbar-icon" icon={faUser} />Profile
					</NavLink>
				</NavItem>
				<NavItem class="nav-item-wide">
					<NavLink href="/games" aria-current="true">
						<Icon class="navbar-icon" icon={faDice} />Games
					</NavLink>
				</NavItem>
				<NavItem class="nav-item-wide">
					<NavLink on:click={test}>
						<Icon
							class="navbar-icon"
							icon={faCalendarAlt} />Sessions
					</NavLink>
				</NavItem>
				<!-- <NavItem class="nav-item-narrow clear-defaults">
					<NavLink on:click={test}>
						<span
							class="fa-stack clear-defaults"
							class:active={active === true}>
							{#if active}
								<Icon
									icon={faCircle}
									class="fas fa-stack-2x notify clear-defaults" />
							{/if}
							<Icon
								icon={faEnvelope}
								class="navbar-icon fas fa-stack-2x fa-inverse clear-defaults" />
						</span>
					</NavLink>
				</NavItem>
				<NavItem class="nav-item-narrow clear-defaults">
					<NavLink on:click={test}>
						<span
							class="fa-stack clear-defaults"
							class:active={active === true}>
							{#if active}
								<Icon
									icon={faCircle}
									class="fas fa-stack-2x notify clear-defaults" />
							{/if}
							<Icon
								icon={faBell}
								class="navbar-icon fas fa-stack-2x fa-inverse clear-defaults" />
						</span>
					</NavLink>
				</NavItem> -->
				<UncontrolledDropdown nav inNavbar class="nav-item-narrow">
					<DropdownToggle nav>
						<NavLink on:click={test}>
							<span
								class="fa-stack" style="width: 30px"
								class:active={active === true}>
								{#if active}
									<Icon
										icon={faCircle}
										class="fas fa-stack-2x notify" />
								{/if}
								<Icon
									icon={faEnvelope}
									class="navbar-icon fas fa-stack-2x fa-inverse" />
							</span>
							<span>9</span>
						</NavLink>
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem>Option 1</DropdownItem>
						<DropdownItem>Option 2</DropdownItem>
						<DropdownItem divider />
						<DropdownItem>Reset</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
				<UncontrolledDropdown nav inNavbar class="nav-item-narrow">
					<DropdownToggle nav>
						<NavLink on:click={test}>
							<span
								class="fa-stack" style="width: 30px"
								class:active={active === true}>
								{#if active}
									<Icon
										icon={faCircle}
										class="fas fa-stack-2x notify" />
								{/if}
								<Icon
									icon={faBell}
									class="navbar-icon fas fa-stack-2x fa-inverse" />
							</span>
							<span>9</span>
						</NavLink>
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem>Option 1</DropdownItem>
						<DropdownItem>Option 2</DropdownItem>
						<DropdownItem divider />
						<DropdownItem>Reset</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
				<NavItem>
					<NavLink
						on:click={() => ($isAuthed = false)}
						class="nav-item-wide"
						href="#components/">
						<Icon class="navbar-icon" icon={faSignOutAlt} />Log out
					</NavLink>
				</NavItem>
				<!-- {:else}
				<NavItem>
					<NavLink class="nav-item-wide" href="#components/">
						<Icon class="navbar-icon" icon={faUser} />Login
					</NavLink>
				</NavItem>
				<NavItem class="nav-item-wide">
					<NavLink href="#components/">
						<Icon class="navbar-icon" icon={faDice} />Register
					</NavLink>
				</NavItem> -->
			{/if}
		</Nav>
	</Collapse>
</Navbar>

<!-- <Navbar color="dark" dark expand="md" class="clear-defaults">
	<NavbarBrand class="dm-lg-l" href="/">BGCA</NavbarBrand>
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
	<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav class="nav justify-content-end dm-lg-r" navbar>
			<NavItem>
				<NavLink class="active nav-item-wide" href="#components/">
					<Icon icon={faUser} />Profile
				</NavLink>
			</NavItem>
			<NavItem class="nav-item-wide">
				<NavLink href="#components/">
					<Icon icon={faDice} />Games
				</NavLink>
			</NavItem>
			<NavItem class="nav-item-wide">
				<NavLink href="#components/">
					<Icon icon={faCalendarAlt} />Sessions
				</NavLink>
			</NavItem>
			<NavItem class="nav-item-narrow">
				<NavLink href="#components/">
					<Icon icon={faEnvelope} />
					4
				</NavLink>
			</NavItem>
			<UncontrolledDropdown nav inNavbar class="nav-item-narrow"> 
				<DropdownToggle nav caret><Icon icon={faBell} />
					3</DropdownToggle>
				<DropdownMenu right>
				  <DropdownItem>Option 1</DropdownItem>
				  <DropdownItem>Option 2</DropdownItem>
				  <DropdownItem divider />
				  <DropdownItem>Reset</DropdownItem>
				</DropdownMenu>
			  </UncontrolledDropdown> -->

<!-- Uncontrol
			<NavItem>
				<NavLink href="#components/">
					<Icon icon={faBell} />
					<Badge color="danger">4</Badge>
				</NavLink>
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
	</Collapse>
</Navbar>


<nav>
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

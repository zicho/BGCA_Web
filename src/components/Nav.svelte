<script>
	export let segment;

	import Icon from "fa-svelte";
	import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
	import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
	import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
	import { faDice } from "@fortawesome/free-solid-svg-icons/faDice";
	import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
	import { faSquare } from "@fortawesome/free-solid-svg-icons/faSquare";

	import {
		Navbar,
		NavbarBrand,
		NavbarToggler,
		Collapse,
		Nav,
		NavItem,
		NavLink,
		Badge,
		UncontrolledDropdown,
		DropdownToggle,
		DropdownItem,
		DropdownMenu,
		Row,
	} from "sveltestrap/src";

	let isOpen = false;

	function handleUpdate(event) {
		isOpen = event.detail.isOpen;
	}

	let active = false;

	function test() {
		active = !active
	}
</script>

<Navbar color="dark" dark expand="md">
	<NavbarBrand class="dm-lg-l" href="/">BGCA</NavbarBrand>
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
	<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav class="ml-auto justify-content-end dm-lg-r" navbar>
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
				<NavLink on:click={test}>
					<Icon icon={faCalendarAlt} />Sessions
				</NavLink>
			</NavItem>
			<UncontrolledDropdown nav inNavbar class="nav-item-narrow">
				<DropdownToggle nav caret class="clear-defaults">
					<span class="fa-stack">
						{#if active}<i class="navbar-icon fas fa-circle fa-stack-2x notify"></i>{/if}
						<i class:active="{active === true}" class="navbar-icon fas fa-envelope fa-stack-1x fa-inverse"></i>
					</span>
					<span>3</span>
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem>
						TestUser: Aliquam sagittis risus ligula, id tincidunt arcu ul...
					</DropdownItem>
					<DropdownItem>
						TestUser2: Vestibulum justo neque, dignissim in risus sit amet...
					</DropdownItem>
					<DropdownItem divider />
					<DropdownItem>Go to inbox</DropdownItem>
					<DropdownItem on:click={() => active = false}>Mark all as read</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>
			<UncontrolledDropdown nav inNavbar class="nav-item-narrow">
				<DropdownToggle nav caret class="clear-defaults">

					<span class="fa-stack">
						{#if active}<i class="navbar-icon fas fa-circle fa-stack-2x notify"></i>{/if}
						<i class:active="{active === true}" class="navbar-icon fas fa-bell fa-stack-1x fa-inverse"></i>
					</span>
					<span>3</span>
					<!-- <div class="parent">
						<Icon class="active image1" icon={faSquare} />
						<Icon class="image2"  icon={faBell} /> 3
					</div> -->
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem>
						You have been invited to play Scythe
					</DropdownItem>
					<DropdownItem>
						There is an opening to play Kingdomino in your area
					</DropdownItem>
					<DropdownItem>
						TestUser has joined your session of 7 Wonders
					</DropdownItem>
					<DropdownItem divider />
					<DropdownItem>Go to notifications</DropdownItem>
					<DropdownItem>Mark all as read</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>
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

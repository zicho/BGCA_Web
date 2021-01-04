<script>
	export let segment;
	import "../../node_modules/toastr/build/toastr.css";
	import * as Toastr from "toastr";

	import {
		isAuthed,
		messageCount,
		notificationCount,
		clearMessages,
		logout,
		getLatestUnreadMessages,
		messages,
	} from "../stores/user.js";
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
		Row,
	} from "sveltestrap/src";

	import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";

	let isOpen = false;

	function handleUpdate(event) {
		isOpen = event.detail.isOpen;
	}

	$: unreadMessages = $messageCount != 0;
	$: unreadNotifications = $notificationCount != 0;

	function test() {
		// Toastr.success('Are you the 6 fingered man?')
		// active = !active;
		// console.log(segment);
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
				<UncontrolledDropdown nav inNavbar class="nav-item-narrow">
					<DropdownToggle nav>
						<NavLink on:click={getLatestUnreadMessages}>
							<span
								class="fa-stack"
								class:active={unreadMessages === true}>
								{#if unreadMessages}
									<Icon
										icon={faCircle}
										class="fas fa-stack-2x notify" />
								{/if}
								<Icon
									icon={faEnvelope}
									class="navbar-icon fas fa-stack-2x fa-inverse" />
							</span>
							<span>{$messageCount}</span>
						</NavLink>
					</DropdownToggle>
					<DropdownMenu right>
						{#if $messages.length > 0}
							{#each $messages as m, i}
								<DropdownItem>
									<Row>
										<span
											class="dropdown-message"><strong>{m.subject}</strong></span>
									</Row>
									<Row>
										<span
											class="dropdown-message">{m.content}</span>
									</Row>
									<Row
										class="justify-content-end float-right">
										<span
											class="dropdown-message dm-xs-t color-dropdown-sender">Sent
											by:
											{m.sender}</span>
									</Row>
								</DropdownItem>
								{#if i + 1 != $messages.length}
									<DropdownItem divider />
								{/if}
							{/each}
						{:else}
							<DropdownItem>
								<Row>
									<span class="dropdown-message">No unread
										messages</span>
								</Row>
							</DropdownItem>
						{/if}
						{#if $messages.length > 0}
							<DropdownItem divider />
							<DropdownItem on:click={clearMessages}>
								<span class="dropdown-message">Mark all as read</span>
							</DropdownItem>
						{/if}
					</DropdownMenu>
				</UncontrolledDropdown>
				<UncontrolledDropdown nav inNavbar class="nav-item-narrow">
					<DropdownToggle nav>
						<NavLink on:click={test}>
							<span
								class="fas fa-stack fa-fw clear-defaults"
								class:active={unreadNotifications === true}>
								{#if unreadNotifications}
									<Icon
										icon={faCircle}
										class="fas fa-stack-2x notify" />
								{/if}
								<Icon
									icon={faBell}
									class="navbar-icon fas fa-stack-2x fa-inverse" />
							</span>
							<span>{$notificationCount}</span>
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
						on:click={logout}
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

<script lang="ts">
	import AvatarIcon from '$lib/assets/icons/AvatarIcon.svelte';
	import CalendarIcon from '$lib/assets/icons/CalendarIcon.svelte';
	import CartIcon from '$lib/assets/icons/CartIcon.svelte';
	import ChartIcon from '$lib/assets/icons/ChartIcon.svelte';
	import DocumentIcon from '$lib/assets/icons/DocumentIcon.svelte';
	import House from '$lib/assets/icons/HouseIcon.svelte';
	import Trophy from '$lib/assets/icons/TrophyIcon.svelte';
	import WebsiteIcon from '$lib/assets/icons/WebsiteIcon.svelte';
	import WidgetIcon from '$lib/assets/icons/WidgetIcon.svelte';
	import Sidebar from './(navigation)/(Sidebar)/Sidebar.svelte';
	import SidebarParent from './(navigation)/(Sidebar)/SidebarParent.svelte';
	import AdminNavigation from './(navigation)/Navigation.svelte';
</script>

<div class="flex flex-col text-white w-full items-center isolate z-50">
	<AdminNavigation />
	<div class="w-full h-full isolate">
		<Sidebar class="z-10">
			<SidebarParent>
				<House slot="icon" />
				Dashboard
				<p slot="children">Dashboard preset 1</p>
			</SidebarParent>
			<SidebarParent>
				<CalendarIcon slot="icon" />
				Calendar
			</SidebarParent>
			<SidebarParent>
				<Trophy slot="icon" />
				Sales
				<p slot="children">Dashboard preset 1</p>
			</SidebarParent>
			<SidebarParent>
				<ChartIcon slot="icon" />
				Statistics
			</SidebarParent>
			<SidebarParent>
				<AvatarIcon slot="icon" />
				Users
			</SidebarParent>
			<SidebarParent>
				<DocumentIcon slot="icon" />
				Invoices
			</SidebarParent>
			<SidebarParent>
				<WebsiteIcon slot="icon" />
				Pages
			</SidebarParent>
			<SidebarParent>
				<WidgetIcon slot="icon" />
				Widgets
			</SidebarParent>
			<SidebarParent>
				<CartIcon slot="icon" />
				Orders
			</SidebarParent>
		</Sidebar>
		<slot />
	</div>
</div>

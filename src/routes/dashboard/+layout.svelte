<script lang="ts">
	import Sidebar from './(navigation)/(Sidebar)/Sidebar.svelte';
	import SidebarParent from './(navigation)/(Sidebar)/SidebarParent.svelte';
	import AdminNavigation from './(navigation)/Navigation.svelte';
</script>

<div class="flex flex-col text-white w-full items-center">
	<AdminNavigation />
	<div class="w-full h-full">
		<Sidebar>
			<SidebarParent icon="ic:baseline-home"
				>Dashboard
				<p slot="children">Dashboard preset 1</p>
			</SidebarParent>
			<SidebarParent icon="ion:calendar-sharp">Calendar</SidebarParent>
			<SidebarParent icon="material-symbols:trophy"
				>Sales

				<p slot="children">Dashboard preset 1</p>
			</SidebarParent>
			<SidebarParent icon="ooui:chart">Statistics</SidebarParent>
			<SidebarParent icon="mdi:user">Users</SidebarParent>
			<SidebarParent icon="ion:document">Invoices</SidebarParent>
			<SidebarParent icon="fluent-mdl2:website">Pages</SidebarParent>
			<SidebarParent icon="solar:widget-bold">Widgets</SidebarParent>
			<SidebarParent icon="mdi:cart">Orders</SidebarParent>
		</Sidebar>
		<slot />
	</div>
</div>

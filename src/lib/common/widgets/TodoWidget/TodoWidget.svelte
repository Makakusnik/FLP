<script lang="ts">
	import BinIcon from '$lib/assets/icons/BinIcon.svelte';
	import DotsIcon from '$lib/assets/icons/DotsIcon.svelte';
	import ListIcon from '$lib/assets/icons/ListIcon.svelte';
	import PencilIcon from '$lib/assets/icons/PencilIcon.svelte';
	import SettingsIcon from '$lib/assets/icons/SettingsIcon.svelte';
	import Dropdown from '$lib/common/dropdown/Dropdown.svelte';
	import DropdownItem from '$lib/common/dropdown/DropdownItem.svelte';
	import WidgetContainer from '../WidgetContainer.svelte';
	import TodoItem from './TodoItem.svelte';
	import ChevronDownIcon from '$lib/assets/icons/ChevronDownIcon.svelte';
	import { fly } from 'svelte/transition';
	import type { TodoData, TodoLabel } from './types';

	export let data: TodoData[];

	let closedContent = false;

	const labels: TodoLabel[] = [
		{ text: 'Yes', color: 'lime', textColor: 'black' },
		{ text: 'Feature', color: 'yellow', textColor: 'black' },
		{ text: 'Bugfix', color: 'magenta', textColor: 'black' },
		{ text: 'Long task', color: 'purple', textColor: 'white' },
		{ text: 'easy', color: 'rgb(0,125,0)', textColor: 'white' },
		{ text: 'hard', color: 'rgba(100,100,0)', textColor: 'white' }
	];

	const list = [
		{ title: 'nieco', subtitle: 'daco ine', labels },
		{ title: 'Task 1 asdasd ', subtitle: 'asx ine', labels },
		{ title: 'Task 2', subtitle: 'xds ine', labels },
		{ title: 'Task 4', subtitle: 'ffff ff' }
	];
</script>

<WidgetContainer title="Todo" className="sm:col-span-2 row-span-2 isolate">
	<Dropdown slot="dropdown" title="Settings">
		<SettingsIcon slot="titleIcon" />
		<DropdownItem>
			<DotsIcon slot="icon" />
			I dont know
		</DropdownItem>
		<DropdownItem>
			<PencilIcon slot="icon" />
			Edit
		</DropdownItem>
		<DropdownItem>
			<ListIcon slot="icon" />
			Details
		</DropdownItem>
		<DropdownItem>
			<BinIcon slot="icon" />
			Remove
		</DropdownItem>
	</Dropdown>
	<div class="flex flex-col justify-between w-full h-full bg-neutral-800 overflow-hidden">
		<div class="content">
			<div class="h-fit">
				{#each data as { children, title }}
					<button
						class="flex items-center m-2 cursor-pointer w-fit px-2 py-1 rounded-md hover:bg-neutral-100/10 transition-colors"
						on:click={() => {
							closedContent = !closedContent;
						}}>
						<p class="text-xs mr-2">{list.length - 2} / {list.length}</p>
						<p>{title}</p>
						<ChevronDownIcon class="ml-2 transition-transform {closedContent ? 'rotate-90' : ''}" />
					</button>
					<div class="overflow-hidden">
						{#if !closedContent}
							<div class="flex flex-col gap-y-1" transition:fly={{ y: -150, duration: 500 }}>
								{#each children as { labels, subtitle, title }}
									<TodoItem {title} {subtitle} {labels} />
								{/each}
							</div>
						{/if}
					</div>
				{/each}
				<button
					class="flex items-center m-2 cursor-pointer w-fit px-2 py-1 rounded-md hover:bg-neutral-100/10 transition-colors"
					on:click={() => {
						closedContent = !closedContent;
					}}>
					<p class="text-xs mr-2">{list.length - 2} / {list.length}</p>
					<p>Create something</p>
					<ChevronDownIcon class="ml-2 transition-transform {closedContent ? 'rotate-90' : ''}" />
				</button>
				<div class="overflow-hidden">
					{#if !closedContent}
						<div class="flex flex-col gap-y-1" transition:fly={{ y: -150, duration: 500 }}>
							{#each list as item}
								<TodoItem title={item.title} subtitle={item.subtitle} labels={item.labels} />
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
		<div class="actions w-full p-2 bg-neutral-100/5">
			<button class="rounded-lg bg-neutral-100/10 w-8 h-8">+</button>
			<button class="rounded-lg bg-neutral-100/10 px-2 w-fit h-8">+Folder</button>
		</div>
	</div>
</WidgetContainer>

<style lang="postcss">
</style>

<script lang="ts">
	import CancelIcon from '$lib/assets/icons/CancelIcon.svelte';
	import TickIcon from '$lib/assets/icons/TickIcon.svelte';
	import { fly } from 'svelte/transition';

	export let handleConfirm: (id: string, name: string) => () => void;
	export let handleCancel: () => void;
	export let introEndCallback: (() => void) | undefined = undefined;

	let handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		if (formData.get('taskName')?.toString().trim() === '') {
			return;
		}
		const value = formData.get('taskName') as string;
		handleConfirm(`${new Date().toISOString()}`, value)();
	};

	let name: string;
</script>

<form on:submit={handleSubmit}>
	<div
		class="task-container"
		on:introend={introEndCallback}
		in:fly|local={{ x: -150 }}
		out:fly|local={{ x: -150 }}>
		<input
			class="name-input"
			autofocus
			name="taskName"
			pattern="^\S+(\S+[^\S\r\n]*)*$"
			required
			bind:value={name} />
		<div class="task-actions">
			<button class="confirm-task-button" type="submit"><TickIcon class="w-4 h-4" /></button>
			<button class="cancel-task-button" type="button" on:click={handleCancel}
				><CancelIcon class="w-4 h-4" /></button>
		</div>
	</div>
</form>

<style lang="postcss">
	.task-container {
		@apply flex w-full bg-neutral-400/30 mb-1 transition-colors rounded-md h-8 px-2 shadow-md items-center outline outline-1 hover:outline-2 outline-indigo-300;
	}

	.name-input {
		@apply w-24 bg-transparent border border-neutral-900/20 mr-auto rounded-sm h-6 px-1;
	}

	.cancel-task-button {
		@apply bg-rose-500/40 p-1 hover:bg-rose-600/40 transition-colors;
	}
	.confirm-task-button {
		@apply bg-green-500/40 p-1 hover:bg-green-600/40 transition-colors;
	}
</style>

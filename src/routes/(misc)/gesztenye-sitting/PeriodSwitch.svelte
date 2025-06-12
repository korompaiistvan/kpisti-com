<script lang="ts" module>
	const options = [
		{ label: 'Less than a day', value: 'hours' },
		{ label: 'A day or two', value: 'day' },
		{ label: 'Multiple days', value: 'days' }
	] as const;
	export type PeriodOption = (typeof options)[number]['value'];
</script>

<script lang="ts">
	let { value = $bindable() }: { value: PeriodOption } = $props();
</script>

<label for="period-switch" class="period-switch__label"> I'm looking after Gesztenye for: </label>
<div role="radiogroup" class="period-switch" id="period-switch">
	{#each options as option}
		<button
			class:active={value === option.value}
			onclick={() => (value = option.value)}
			aria-checked={value === option.value}
			role="radio"
			tabindex={value === option.value ? 0 : -1}
		>
			{option.label}
		</button>
	{/each}
</div>

<style>
	.period-switch {
		display: flex;
		--border-radius: 1rem;
		border-radius: var(--border-radius);
		border: 2px solid var(--primary-color);
		width: fit-content;
		margin-top: 1rem;
	}

	.period-switch :first-child {
		border-radius: var(--border-radius) 0 0 var(--border-radius);
	}

	.period-switch :last-child {
		border-radius: 0 var(--border-radius) var(--border-radius) 0;
	}

	.period-switch__label {
		display: block;
		margin-top: 0.5rem;
	}

	.period-switch > button {
		padding: 0.5rem 1rem;
		border: 2px solid transparent;
		background-color: transparent;
		cursor: pointer;
		font-size: 1rem;
		margin: -2px;
		transition:
			background-color 0.2s ease-in-out,
			border-color 0.2s ease-in-out,
			color 0.2s ease-in-out;
	}

	button.active {
		border: 2px solid var(--primary-color);
		background-color: color-mix(in oklch, var(--primary-color) 12%, transparent);
	}

	button:hover:not(.active) {
		background-color: var(--color-secondary);
	}
	button:focus {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}
	button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
</style>

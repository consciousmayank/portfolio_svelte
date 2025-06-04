<script lang="ts">
	import { onMount } from 'svelte';
	import Typewriter from 'svelte-typewriter';
	import type { PersonalDataItem } from '$lib/model/personal';
	import { imageurl } from '$lib';
	export let personal: PersonalDataItem;

	let visible = false;

	onMount(() => {
		visible = true;
	});
</script>

<section
	class="animate-section relative mx-auto flex items-center justify-center overflow-hidden px-4 py-20"
>
	<div class="z-10 px-4 text-center">
		<div class="mb-4">
			<img
				src={imageurl(personal.collectionId, personal.id, personal.avatar)}
				alt="Profile"
				aria-label="Profile Image"
				class="mx-auto h-62 w-62 rounded-full object-cover shadow-2xl shadow-black"
				loading="lazy"
			/>
		</div>

		<h1 class="mt-10 mb-4">
			<span class="block text-4xl font-bold md:text-5xl lg:text-6xl heading-glass text-outline">"Hello World"</span>
			<span class="my-3.5 text-2xl md:text-3xl lg:text-4xl flex flex-row justify-center text-glass-primary"><div>My name is</div><div class="ml-2 text-purple-glass font-bold">{personal.name}</div></span>
			<span class="block text-purple-glass text-2xl md:text-3xl lg:text-4xl my-10">
				<Typewriter mode="loop" interval={150}>
					{#each personal.typewrite_options as option}
						<span>{option}</span>
					{/each}
				</Typewriter>
			</span>
		</h1>

		<p class="mx-auto mb-8 max-w-2xl text-xl md:text-2xl text-glass-secondary">
			{personal?.one_liner || 'NA'}
		</p>
		
	</div>

	<div class="absolute bottom-10 left-1/2 -translate-x-1/2 transform animate-bounce">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-chevron-down text-glass-primary text-outline"><polyline points="6 9 12 15 18 9"></polyline></svg
		>
	</div>
</section>

<script lang="ts">
	import TechStack from '$lib/components/TechStack.svelte';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import type { PersonalDataItem } from '$lib/model/personal';
	import type { ExperienceRecordItem } from '$lib/model/experience';
	import type { GroupedSkills } from '$lib/model/skills';
	import type { EducationDataItem } from '$lib/model/education';
	import GlassContainer from './GlassContainer.svelte';
	export let personal: PersonalDataItem;
	export let experience: ExperienceRecordItem[];
	export let education: EducationDataItem[];

	onMount(() => {
		// Animation for sections
		gsap.utils.toArray<Element>('.animate-section').forEach((section) => {
			gsap.fromTo(
				section,
				{ y: 50, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: section,
						start: 'top 80%'
					}
				}
			);
		});
	});
</script>

<div class="pt-0">
	<section class="animate-section container mx-auto max-w-6xl px-4 py-20">
		<h1 class="heading-glass mb-6 text-center text-4xl font-bold">About Me</h1>

		<div class="mt-12 flex flex-col gap-12 lg:flex-row">
			<!-- About Me Section -->
			<div class="lg:w-1/2">
				{#each personal.about_me as aboutMe}
					<p class="text-glass-primary mb-4 text-xl text-shadow-2xs">
						{aboutMe}
					</p>
				{/each}

				<!-- <div class="flex gap-4 mt-6">
					<a
						href="/contact"
						class="rounded-md bg-purple-600 px-6 py-3 text-white transition-all duration-300 hover:bg-purple-700"
					>
						Contact Me
					</a>
					<a
						href="/projects"
						class="rounded-md border border-purple-600 px-6 py-3 text-purple-600 transition-all duration-300 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/30"
					>
						View Projects
					</a>
				</div> -->
			</div>

			<!-- Education Section -->
			<div class="lg:w-1/2">
				<h2 class="text-glass-primary mb-6 text-2xl font-bold">Education</h2>

				<div class="space-y-6">
					{#each education as edu}
						<GlassContainer blur="95px" opacity={0.0009} borderRadius="10px" class="custom-glass">
							<div class="flex items-start justify-between">
								<h3 class="text-glass-primary text-lg font-bold">{edu.title}</h3>
								<span class="text-glass-muted text-sm"
									>{new Date(edu.from).getFullYear()} - {edu.to
										? new Date(edu.to).getFullYear()
										: 'Present'}</span
								>
							</div>
							<h4 class="text-purple-glass text-base text-shadow-2xs">{edu.institute}</h4>
						</GlassContainer>
					{/each}
				</div>

				<!-- Experience Section -->
				<div class="mt-12">
					<h2 class="text-glass-primary mb-6 text-2xl font-bold">Experience</h2>
					<div class="space-y-6">
						{#each experience as exp}
							<GlassContainer blur="95px" opacity={0.0009} borderRadius="10px" class="custom-glass">
									<div class="flex items-start justify-between">
										<h3 class="text-glass-primary text-lg font-bold">{exp.position}</h3>
										<span class="text-glass-muted text-sm">
											{new Date(exp.from).getFullYear()} - {exp.to
												? new Date(exp.to).getFullYear()
												: 'Present'}
										</span>
									</div>
									<h4 class="text-purple-glass text-base">{exp.company}</h4>
									<p class="text-glass-primary mt-3 text-sm">{exp.description}</p>
									<div class="mt-4 flex flex-wrap gap-2">
										{#each exp.skills_developed as skill}
											
										<span
												class="text-glass-primary rounded-full border border-gray-300 px-2 py-1 text-xs dark:border-gray-600"
												>{skill}</span
											>
										{/each}
									</div>
							</GlassContainer>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- <section class="animate-section mx-auto w-full bg-gray-100 px-4 py-20 dark:bg-gray-800">
		<div class="container mx-auto">
			<h2 class="mb-10 text-center text-3xl font-bold">My Skills</h2>

			<div class="mb-6 text-center">
				<p class="mx-auto max-w-3xl text-lg text-gray-700 dark:text-gray-300">
					My expertise spans across multiple technologies and platforms, allowing me to build
					comprehensive solutions.
				</p>
			</div>

			<TechStack {skills} />
		</div>
	</section> -->

	<!-- <section class="animate-section mx-auto max-w-6xl px-4 py-20">
		<h2 class="mb-10 text-center text-3xl font-bold">Experience</h2>
		<div class="space-y-8">
			{#each experiences as exp}
				<div
					class="rounded-lg border border-gray-200 p-6 transition duration-300 hover:shadow-lg dark:border-gray-700"
				>
					<div class="flex items-start justify-between">
						<h3 class="text-xl font-bold">{exp.position}</h3>
						<span class="text-sm text-gray-500 dark:text-gray-400">{exp.period}</span>
					</div>
					<h4 class="text-lg text-purple-600 dark:text-purple-400">{exp.company}</h4>
					<p class="mt-3 text-gray-700 dark:text-gray-300">{exp.description}</p>
					<div class="mt-4 flex flex-wrap gap-2">
						{#each exp.skills as skill}
							<span class="rounded-full bg-gray-200 px-3 py-1 text-sm dark:bg-gray-700"
								>{skill}</span
							>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section> -->
</div>

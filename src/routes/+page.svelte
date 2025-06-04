<script lang="ts">
	import { imageurl } from '$lib';
	import About from '$lib/components/About.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import TechStack from '$lib/components/TechStack.svelte';
	import type { ExperienceRecordItem } from '$lib/model/experience';
	import type { PersonalDataItem } from '$lib/model/personal';
	import type { GroupedSkills } from '$lib/model/skills';
	import { pb, POCKETBASE_URL } from '$lib/api-client';
	import { onMount } from 'svelte';
	import GlassContainer from '$lib/components/GlassContainer.svelte';
	import type { EducationDataItem } from '$lib/model/education';
	import ContactMe from '$lib/components/ContactMe.svelte';

	export let data: {
		personal: PersonalDataItem;
		skills: GroupedSkills;
		experience: ExperienceRecordItem[];
		education: EducationDataItem[];
	};

	let loading = false;
	let error = '';

</script>

	<GlassContainer
		marginTop="4rem"
		marginLeft="4rem"
		marginRight="4rem"
		marginBottom="0"
		blur="95px"
		opacity={0.1}
		borderRadius="30px"
		class="custom-glass"
	>
		<Hero personal={data.personal} />
	</GlassContainer>
	<GlassContainer
		marginTop="2rem"
		marginLeft="4rem"
		marginRight="4rem"
		marginBottom="0"
		blur="95px"
		opacity={0.1}
		borderRadius="30px"
		class="custom-glass"
	>
		<div id="about">
			<About personal={data.personal} experience={data.experience} education={data.education} />
		</div>
	</GlassContainer>
	<GlassContainer
		marginTop="2rem"
		marginLeft="4rem"
		marginRight="4rem"
		marginBottom="0"
		blur="95px"
		opacity={0.1}
		borderRadius="30px"
		class="custom-glass"
	>
		<div id="skills"><TechStack skills={data.skills} /></div>
	</GlassContainer>
	<GlassContainer
		marginTop="2rem"
		marginLeft="4rem"
		marginRight="4rem"
		marginBottom="0"
		blur="95px"
		opacity={0.1}
		borderRadius="30px"
		class="custom-glass"
	>
		<div id="contactMe"><ContactMe	personal={data.personal}></ContactMe></div>
	</GlassContainer>




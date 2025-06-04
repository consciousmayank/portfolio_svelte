import type { LayoutServerLoad } from './$types';
import { pb } from '$lib/api-client';
import type { PersonalDataItem } from '$lib/model/personal';
import type { GroupedSkills, SingleSkillItem } from '$lib/model/skills';
import type { ExperienceRecordItem } from '$lib/model/experience';
import type { EducationDataItem } from '$lib/model/education';

function transformSkillsToGrouped(skillsData: SingleSkillItem[]): GroupedSkills {
	// Group skills by category
	const skillsByCategory = new Map<string, Array<{ name: string; icon: string }>>();

	skillsData.forEach((skill) => {
		const categoryName = skill.expand?.category?.name || skill.category || 'Other';

		if (!skillsByCategory.has(categoryName)) {
			skillsByCategory.set(categoryName, []);
		}

		skillsByCategory.get(categoryName)!.push({
			name: skill.skill_name,
			icon: skill.skill_icon
		});
	});

	// Convert map to array format
	const groupedSkills: GroupedSkills = [];
	skillsByCategory.forEach((items, category) => {
		groupedSkills.push({
			category,
			items
		});
	});

	return groupedSkills;
}

export const load: LayoutServerLoad = async () => {
	try {
		// Try to authenticate
		// await pb.autoLogin();
		

		// Fetch data from PocketBase
		let personalData: PersonalDataItem[] = [];
		let skillsData: SingleSkillItem[] = [];
		let experienceData: ExperienceRecordItem[] = [];
		let educationData: EducationDataItem[] =[];

		try {
			console.log('Attempting to fetch data...');
			// personalData = (await pb.getFullList('personal_details', 'soceial_media,userid')) as unknown as PersonalItem[];
			personalData = await pb.getPersonalData() as unknown as PersonalDataItem[];
			educationData = await pb.getEducationData() as unknown as EducationDataItem[];


			skillsData = (await pb.getFullList('skills', {
				sort: '-created',
				expand: 'category'
			})) as unknown as SingleSkillItem[];
			experienceData = (await pb.getFullList('experience', {
				sort: '-created'
			})) as unknown as ExperienceRecordItem[];
		} catch (err) {
			console.warn('Could not fetch data:', err);
		}

		// Transform skillsData into grouped structure using the function
		const groupedSkills = transformSkillsToGrouped(skillsData);

		// Return an object instead of a string
		return {
			personal: personalData[0] || null,
			skills: groupedSkills,
			experience: experienceData,
			education: educationData
		};
	} catch (error) {
		console.error('Error in data loading process:', error);
		return {
			personal: null,
			skills: [],
			experience: [],
			education: [],
			error: String(error)
		};
	}
}; 
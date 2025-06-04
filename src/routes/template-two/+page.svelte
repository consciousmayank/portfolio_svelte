<script lang="ts">
	import { imageurl } from '$lib';
    import type { PageData } from './$types';
    import type { PersonalDataItem } from '$lib/model/personal';
    import type { GroupedSkills } from '$lib/model/skills';
    import type { ExperienceRecordItem } from '$lib/model/experience';
    import type { EducationDataItem } from '$lib/model/education';
    import { Github, Linkedin, Twitter, Mail, Phone, MapPin, ExternalLink } from 'lucide-svelte';
    function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  }

  export let data: {
		personal: PersonalDataItem;
		skills: GroupedSkills;
		experience: ExperienceRecordItem[];
		education: EducationDataItem[];
	};

</script>

<div class="min-h-screen bg-grey text-gray-900 font-mono">
  <!-- Header -->
  <header class="border-b border-gray-200 py-8">
    <div class="max-w-4xl mx-auto px-6">
      <div class="flex items-center gap-8">
        <img src={imageurl(data.personal!.collectionId, data.personal!.id, data.personal!.avatar)}
             alt={data.personal!.name}
             class="w-24 h-24 rounded-full object-cover border-2 border-gray-200" />
        
        <div class="flex-1">
          <h1 class="text-3xl font-bold mb-2">{data.personal!.name}</h1>
          <p class="text-lg text-gray-600 mb-4">{data.personal!.one_liner}</p>
          
          <div class="flex gap-6 text-sm">
            <a href="mailto:{data.personal!.email_id}" class="flex items-center gap-2 hover:text-blue-600">
              <Mail class="w-4 h-4" />
              {data.personal!.email_id}
            </a>
            <a href="tel:{data.personal!.phone_number}" class="flex items-center gap-2 hover:text-blue-600">
              <Phone class="w-4 h-4" />
              {data.personal!.phone_number}
            </a>
            <span class="flex items-center gap-2">
              <MapPin class="w-4 h-4" />
              {data.personal!.address}
            </span>
          </div>
        </div>

        <div class="flex gap-3">
          {#each data.personal!.expand.soceial_media as social}
            <a href={social.name} class="p-2 hover:bg-gray-100 rounded">
              {#if social.name === 'GitHub'}
                <Github class="w-5 h-5" />
              {:else if social.name === 'LinkedIn'}
                <Linkedin class="w-5 h-5" />
              {:else if social.name === 'Twitter'}
                <Twitter class="w-5 h-5" />
              {/if}
            </a>
          {/each}
        </div>
      </div>
    </div>
  </header>

  <div class="max-w-4xl mx-auto px-6 py-12 space-y-16">
    <!-- About -->
    <section>
      <h2 class="text-xl font-bold mb-6 border-b border-gray-200 pb-2">About</h2>
      <div class="space-y-4 text-gray-700 leading-relaxed">
        {#each data.personal!.about_me as paragraph}
          <p>{paragraph}</p>
        {/each}
      </div>
    </section>

    <!-- Experience -->
    <section>
      <h2 class="text-xl font-bold mb-6 border-b border-gray-200 pb-2">Experience</h2>
      <div class="space-y-8">
        {#each data.experience as exp}
          <div class="grid grid-cols-4 gap-6">
            <div class="text-sm text-gray-600">
              {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Present'}
            </div>
            <div class="col-span-3">
              <h3 class="font-bold">{exp.position}</h3>
              <p class="text-gray-600 mb-2">{exp.company}</p>
              <p class="text-sm text-gray-700 mb-3">{exp.description}</p>
              <div class="flex flex-wrap gap-2">
                {#each exp.skills_developed as skill}
                  <span class="text-xs px-2 py-1 bg-gray-100 rounded">{skill}</span>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Projects -->
    <section>
      <h2 class="text-xl font-bold mb-6 border-b border-gray-200 pb-2">Projects</h2>
      <div class="space-y-6">
        {#each data.experience as project}
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <h3 class="font-bold">{project.position}</h3>
                <p class="text-xl text-pink-300">{project.company}</p>
                <div class="flex items-center gap-2 text-gray-300 mt-2 lg:mt-0">
                    <span>{formatDate(project.from)} - {project.to ? formatDate(project.to) : 'Present'}</span>
                  </div>
              </div>
              <p class="text-sm text-gray-700 mb-2">{project.description}</p>
              <div class="flex items-center gap-4 text-xs text-gray-500">
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded">{project.skills_developed}</span>
                <span>{formatDate(project.created)}</span>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Skills -->
    <section>
      <h2 class="text-xl font-bold mb-6 border-b border-gray-200 pb-2">Skills</h2>
      <div class="grid grid-cols-3 gap-8">
        {#each data.skills as skillGroup}
          <div>
            <h3 class="font-bold mb-3">{skillGroup.category}</h3>
            <div class="space-y-2">
              {#each skillGroup.items as skill}
                <div class="text-sm text-gray-700">{skill.name}</div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Education -->
    <section>
      <h2 class="text-xl font-bold mb-6 border-b border-gray-200 pb-2">Education</h2>
      <div class="space-y-6">
        {#each data.education as edu}
          <div class="grid grid-cols-4 gap-6">
            <div class="text-sm text-gray-600">
              {formatDate(edu.from)} - {formatDate(edu.to)}
            </div>
            <div class="col-span-3">
              <h3 class="font-bold">{edu.title}</h3>
              <p class="text-gray-600">{edu.institute}</p>
              <p class="text-sm text-gray-500">{edu.city}</p>
            </div>
          </div>
        {/each}
      </div>
    </section>
  </div>
</div>

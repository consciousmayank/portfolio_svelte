<script lang="ts">
    import type { PageData } from './$types';
    import type { PersonalDataItem } from '$lib/model/personal';
    import type { GroupedSkills } from '$lib/model/skills';
    import type { ExperienceRecordItem } from '$lib/model/experience';
    import type { EducationDataItem } from '$lib/model/education';
	import { imageurl } from '$lib';

    export let data: {
		personal: PersonalDataItem;
		skills: GroupedSkills;
		experience: ExperienceRecordItem[];
		education: EducationDataItem[];
	};

function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
  <!-- Hero Section -->
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
    <div class="relative max-w-6xl mx-auto px-6 py-20">
      <div class="text-center space-y-8">
        <div class="relative inline-block">
          <div class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl opacity-30 scale-110"></div>
          <img src={imageurl(data.personal.collectionId, data.personal.id, data.personal.avatar)}
               alt={data.personal.name}
               class="relative w-48 h-48 rounded-full object-cover border-4 border-white/20 shadow-2xl mx-auto" />
        </div>
        
        <div class="space-y-4">
          <h1 class="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {data.personal.name}
          </h1>
          <p class="text-2xl text-purple-200 font-light">
            {data.personal.one_liner}
          </p>
        </div>

        <div class="max-w-3xl mx-auto space-y-4 text-lg text-gray-300">
          {#each data.personal.about_me as paragraph}
            <p>{paragraph}</p>
          {/each}
        </div>

        <div class="flex justify-center gap-6">
          {#each data.personal.expand.soceial_media as social}
            <button type="button" class="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all hover:scale-110">
              {social.name}
            </button>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- Skills Section -->
  <section class="py-20 bg-black/20 backdrop-blur-sm">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Skills & Expertise
      </h2>

      <div class="grid md:grid-cols-3 gap-8">
        {#each data.skills as skillGroup}
          <div class="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all">
            <h3 class="text-2xl font-bold mb-6 text-purple-300">{skillGroup.category}</h3>
            <div class="space-y-4">
              {#each skillGroup.items as skill}
                <div class="flex items-center gap-3">
                  <span class="text-3xl">{skill.icon}</span>
                  <span class="text-lg">{skill.name}</span>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Experience Section -->
  <section class="py-20">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Experience Journey
      </h2>

      <div class="space-y-8">
        {#each data.experience as exp, index}
          <div class="relative">
            <div class="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-400 to-pink-400"></div>
            <div class="flex items-start gap-8">
              <div class="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-black font-bold text-xl">
                {index + 1}
              </div>
              <div class="flex-1 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 class="text-2xl font-bold text-purple-300">{exp.position}</h3>
                    <p class="text-xl text-pink-300">{exp.company}</p>
                  </div>
                  <div class="flex items-center gap-2 text-gray-300 mt-2 lg:mt-0">
                    <span>{formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Present'}</span>
                  </div>
                </div>
                
                <p class="text-gray-300 mb-6">{exp.description}</p>
                
                <div class="flex flex-wrap gap-2">
                  {#each exp.skills_developed as skill}
                    <span class="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm border border-purple-400/30">
                      {skill}
                    </span>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section class="py-20 bg-black/20 backdrop-blur-sm">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Featured Projects
      </h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each data.experience as project}
          <div class="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all hover:scale-105">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-purple-300">{project.position}</h3>
              <p class="text-xl text-pink-300">{project.company}</p>
            <div class="flex items-center gap-2 text-gray-300 mt-2 lg:mt-0">
                    <span>{formatDate(project.from)} - {project.to ? formatDate(project.to) : 'Present'}</span>
                  </div>
            </div>
            
            <p class="text-gray-300 mb-4">{project.description}</p>
            
            <div class="flex items-center justify-between">
              <span class="px-3 py-1 bg-green-500/30 text-green-200 rounded-full text-sm border border-green-400/30">
                {project.skills_developed}
              </span>
              <span class="text-sm text-gray-400">
                {formatDate(project.created)}
              </span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Education Section -->
  <section class="py-20">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Education
      </h2>

      <div class="grid md:grid-cols-2 gap-8">
        {#each data.education as edu}
          <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all">
            <h3 class="text-2xl font-bold text-purple-300 mb-2">{edu.title}</h3>
            <p class="text-xl text-pink-300 mb-4">{edu.institute}</p>
            <div class="space-y-2 text-gray-300">
              <div class="flex items-center gap-2">
                <!-- <MapPin class="w-4 h-4" /> -->
                <span>{edu.city}</span>
              </div>
              <div class="flex items-center gap-2">
                <!-- <Calendar class="w-4 h-4" /> -->
                <span>{formatDate(edu.from)} - {formatDate(edu.to)}</span>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="py-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm">
    <div class="max-w-6xl mx-auto px-6 text-center">
      <h2 class="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Let's Create Something Amazing
      </h2>
      
      <div class="flex flex-col sm:flex-row gap-8 justify-center items-center">
        <a href="mailto:{data.personal.email_id}" class="flex items-center gap-3 text-lg hover:text-purple-300 transition-colors">
          {data.personal.email_id}
        </a>
        <a href="tel:{data.personal.phone_number}" class="flex items-center gap-3 text-lg hover:text-purple-300 transition-colors">
          {data.personal.phone_number}
        </a>
        <div class="flex items-center gap-3 text-lg">
          {data.personal.address}
        </div>
      </div>
    </div>
  </section>
</div>
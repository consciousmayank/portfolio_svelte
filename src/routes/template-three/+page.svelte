<script lang="ts">
    import type { PageData } from './$types';
    import type { PersonalDataItem } from '$lib/model/personal';
    import type { GroupedSkills } from '$lib/model/skills';
    import type { ExperienceRecordItem } from '$lib/model/experience';
    import type { EducationDataItem } from '$lib/model/education';
    import { imageurl } from '$lib';
    import { Github, Linkedin, Twitter, Mail, Phone, MapPin, ExternalLink, Calendar } from 'lucide-svelte';
    
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

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
  <!-- Hero Section -->
  <section class="relative overflow-hidden bg-gray-500">
    <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-8">
          <div class="space-y-4">
            <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {data.personal.name}
            </h1>
            <p class="text-xl text-blue-600 font-medium">
              {data.personal.one_liner}
            </p>
          </div>
          
          <div class="prose prose-lg text-gray-600 max-w-none">
            {#each data.personal.about_me as paragraph}
              <p>{paragraph}</p>
            {/each}
          </div>

          <div class="flex flex-wrap gap-4">
            <a href="mailto:{data.personal.email_id}" 
               class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Mail class="w-4 h-4" />
              Get In Touch
            </a>
            <a href="tel:{data.personal.phone_number}" 
               class="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Phone class="w-4 h-4" />
              Call Me
            </a>
          </div>

          <div class="flex gap-4">
            {#each data.personal.expand.soceial_media as social}
              <a href={social.name} class="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                {#if social.name === 'GitHub'}
                  <Github class="w-5 h-5 text-gray-700" />
                {:else if social.name === 'LinkedIn'}
                  <Linkedin class="w-5 h-5 text-gray-700" />
                {:else if social.name === 'Twitter'}
                  <Twitter class="w-5 h-5 text-gray-700" />
                {/if}
              </a>
            {/each}
          </div>
        </div>

        <div class="flex justify-center lg:justify-end">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-20 scale-110"></div>
            <img src={imageurl(data.personal.collectionId, data.personal.id, data.personal.avatar)}
                 alt={data.personal.name}
                 class="relative w-80 h-80 rounded-full object-cover border-8 border-white shadow-2xl" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Skills Section -->
  <section class="py-20 bg-gray-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
        <p class="text-xl text-gray-600">Technologies and tools I work with</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        {#each data.skills as skillGroup}
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">{skillGroup.category}</h3>
            <div class="space-y-4">
              {#each skillGroup.items as skill}
                <div class="flex items-center gap-3">
                  <span class="text-2xl">{skill.icon}</span>
                  <span class="text-lg text-gray-700">{skill.name}</span>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Experience Section -->
  <section class="py-20 bg-gray-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Work Experience</h2>
        <p class="text-xl text-gray-600">My professional journey</p>
      </div>

      <div class="space-y-8">
        {#each data.experience as exp}
          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div>
                <h3 class="text-2xl font-bold text-gray-900">{exp.position}</h3>
                <p class="text-xl text-blue-600 font-medium">{exp.company}</p>
              </div>
              <div class="flex items-center gap-2 text-gray-600 mt-2 lg:mt-0">
                <Calendar class="w-4 h-4" />
                <span>{formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Present'}</span>
              </div>
            </div>
            
            <p class="text-gray-700 mb-6">{exp.description}</p>
            
            <div class="flex flex-wrap gap-2">
              {#each exp.skills_developed as skill}
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {skill}
                </span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section class="py-20 bg-gray-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
        <p class="text-xl text-gray-600">Some of my recent work</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each data.experience as project}
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-gray-900">{project.position}</h3>
              <ExternalLink class="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
            </div>
            
            <p class="text-gray-700 mb-4">{project.description}</p>
            
            <div class="flex items-center justify-between">
              <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {project.skills_developed}
              </span>
              <span class="text-sm text-gray-500">
                {formatDate(project.created)}
              </span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Education Section -->
  <section class="py-20 bg-gray-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Education</h2>
        <p class="text-xl text-gray-600">My academic background</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        {#each data.education as edu}
          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{edu.title}</h3>
            <p class="text-xl text-blue-600 font-medium mb-2">{edu.institute}</p>
            <div class="flex items-center gap-2 text-gray-600 mb-2">
              <MapPin class="w-4 h-4" />
              <span>{edu.city}</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600">
              <Calendar class="w-4 h-4" />
              <span>{formatDate(edu.from)} - {formatDate(edu.to)}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-4xl font-bold text-white mb-4">Let's Work Together</h2>
      <p class="text-xl text-blue-100 mb-8">Ready to bring your ideas to life?</p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <div class="flex items-center gap-2 text-white">
          <Mail class="w-5 h-5" />
          <span>{data.personal.email_id}</span>
        </div>
        <div class="flex items-center gap-2 text-white">
          <Phone class="w-5 h-5" />
          <span>{data.personal.phone_number}</span>
        </div>
        <div class="flex items-center gap-2 text-white">
          <MapPin class="w-5 h-5" />
          <span>{data.personal.address}</span>
        </div>
      </div>
    </div>
  </section>
</div>

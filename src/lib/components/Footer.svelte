<script lang="ts">
	import type { PersonalDataItem } from '$lib/model/personal';

	let { personal }: { personal: PersonalDataItem | null } = $props();
	const currentYear = new Date().getFullYear();
</script>

<footer class="py-12">
	<div class="container mx-auto px-4">
		<div class="max-w-6xl mx-auto px-6 text-center">
			<h2 class="text-4xl font-bold mb-8 text-glass-primary">
			  Let's Create Something Amazing
			</h2>
			
			<div class="flex flex-col sm:flex-row gap-8 justify-center items-center">
			  <a href="mailto:{personal?.email_id}" class="flex items-center gap-3 text-lg hover:text-purple-300 transition-colors">
				{personal?.email_id}
			  </a>
			  <a href="tel:{personal?.phone_number}" class="flex items-center gap-3 text-lg hover:text-purple-300 transition-colors">
				{personal?.phone_number}
			  </a>
			  <div class="flex items-center gap-3 text-lg">
				{personal?.address}
			  </div>
			</div>
		  </div>
	</div>

	<div class="mt-8 border-t border-gray-200 pt-8 text-center dark:border-gray-700">
		<p class="text-glass-secondary">
			&copy; {currentYear}
			{personal?.name || 'Portfolio'}. All rights reserved.
		</p>
		<p class="mt-2 text-sm text-glass-muted">Built with SvelteKit</p>
	</div>
</footer>

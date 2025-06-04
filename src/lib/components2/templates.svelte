<script>
	const templates = [
		{
			id: 1,
			name: "Modern Developer",
			category: "Full Stack",
			image: "/placeholder.svg?height=300&width=400",
			features: ["Responsive Design", "Dark Mode", "Project Showcase"]
		},
		{
			id: 2,
			name: "Creative Designer",
			category: "UI/UX",
			image: "/placeholder.svg?height=300&width=400",
			features: ["Portfolio Gallery", "Animation Effects", "Contact Form"]
		},
		{
			id: 3,
			name: "Data Scientist",
			category: "Analytics",
			image: "/placeholder.svg?height=300&width=400",
			features: ["Chart Integration", "Research Papers", "Data Visualization"]
		},
		{
			id: 4,
			name: "Mobile Developer",
			category: "Mobile Apps",
			image: "/placeholder.svg?height=300&width=400",
			features: ["App Screenshots", "Download Links", "Feature Highlights"]
		}
	];
</script>

<section class="py-16 lg:py-24 bg-gray-50">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
				Choose Your Perfect <span class="text-[#F47216]">Template</span>
			</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Professional, responsive templates designed specifically for developers. Each template is fully customizable and optimized for performance.
			</p>
		</div>
		
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each templates as template}
				<div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
					<div class="relative overflow-hidden">
						<img 
							src={template.image || "/placeholder.svg"} 
							alt={template.name}
							class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
						/>
						<div class="absolute top-4 right-4 bg-[#F47216] text-white px-3 py-1 rounded-full text-sm font-medium">
							{template.category}
						</div>
					</div>
					
					<div class="p-6">
						<h3 class="text-xl font-bold text-gray-900 mb-3">{template.name}</h3>
						<ul class="space-y-2 mb-4">
							{#each template.features as feature}
								<li class="flex items-center text-gray-600">
									<span class="w-2 h-2 bg-[#F47216] rounded-full mr-3"></span>
									{feature}
								</li>
							{/each}
						</ul>
						<button class="w-full bg-[#F47216] hover:bg-[#E5650C] text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
							Preview Template
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

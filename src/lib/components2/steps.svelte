<script>
	const steps = [
		{
			number: 1,
			title: "Download & Register",
			description: "Download our mobile app and create your account to get started",
			icon: "📱"
		},
		{
			number: 2,
			title: "Verify & Fill Details",
			description: "Verify via OTP and fill in your personal details, skills, education, and projects",
			icon: "✍️"
		},
		{
			number: 3,
			title: "Choose Website Type",
			description: "Select between dynamic or static website based on your needs",
			icon: "🎯"
		},
		{
			number: 4,
			title: "Select Hosting Option",
			description: "Choose whether you want hosting included or prefer to handle it yourself",
			icon: "🌐"
		},
		{
			number: 5,
			title: "Pick Your Template",
			description: "Browse and select from our collection of professional templates",
			icon: "🎨"
		},
		{
			number: 6,
			title: "Submit & Receive",
			description: "Submit your order and receive your portfolio URL via email confirmation",
			icon: "🚀"
		}
	];
</script>

<section class="py-16 lg:py-24">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
				How It <span class="text-[#F47216]">Works</span>
			</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Get your professional portfolio up and running in just 6 simple steps. No technical knowledge required.
			</p>
		</div>
		
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each steps as step, index}
				<div class="relative">
					<!-- Connector Line -->
					{#if index < steps.length - 1}
						<div class="hidden lg:block absolute top-16 left-full w-8 h-0.5 bg-[#F47216] opacity-30 z-0"></div>
					{/if}
					
					<div class="custom-glass p-6 rounded-4xl shadow-2xl hover:shadow-2xl transition-shadow duration-300 relative z-10">
						<div class="flex items-center mb-4">
							<div class="w-12 h-12 bg-[#F47216] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
								{step.number}
							</div>
							<div class="text-3xl">{step.icon}</div>
						</div>
						
						<h3 class="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
						<p class="text-gray-600 leading-relaxed">{step.description}</p>
					</div>
				</div>
			{/each}
		</div>
		
		<div class="text-center mt-12">
			<button class="bg-[#F47216] hover:bg-[#E5650C] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg">
				Start Building Your Portfolio
			</button>
		</div>
	</div>
</section>

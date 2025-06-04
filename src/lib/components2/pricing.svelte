<script>
	import GlassContainer from "$lib/components/GlassContainer.svelte";

	const pricingPlans = [
		{
			type: "Static Website",
			price: "$29",
			period: "one-time",
			description: "Perfect for showcasing your work with a fast, secure static site",
			features: [
				"Lightning fast loading",
				"SEO optimized",
				"Mobile responsive",
				"Custom domain support",
				"SSL certificate included"
			],
			hosting: {
				withHosting: "$39",
				withoutHosting: "$29"
			},
			popular: false
		},
		{
			type: "Dynamic Website",
			price: "$79",
			period: "one-time",
			description: "Interactive portfolio with advanced features and CMS integration",
			features: [
				"Content management system",
				"Contact form integration",
				"Blog functionality",
				"Analytics dashboard",
				"Regular updates",
				"Priority support"
			],
			hosting: {
				withHosting: "$99",
				withoutHosting: "$79"
			},
			popular: true
		}
	];
</script>

<section class="py-16 lg:py-24 ">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
				Simple, Transparent <span class="text-[#F47216]">Pricing</span>
			</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Choose the perfect plan for your needs. No hidden fees, no monthly subscriptions. Pay once, own forever.
			</p>
		</div>
		
		<GlassContainer
			blur="95px" opacity={0.0009} borderRadius="10px" class="custom-glass" 
		>
			<div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
				{#each pricingPlans as plan}
					<div class="relative  border-2 {plan.popular ? 'border-[#F47216]' : 'border-gray-200'} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
						{#if plan.popular}
							<div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
								<span class="bg-[#F47216] text-white px-6 py-2 rounded-full text-sm font-bold">
									Most Popular
								</span>
							</div>
						{/if}
						
						<div class="text-center mb-8">
							<h3 class="text-2xl font-bold text-gray-900 mb-2">{plan.type}</h3>
							<p class="text-gray-600 mb-6">{plan.description}</p>
						</div>
						
						<!-- Pricing Options -->
						<div class="space-y-4 mb-8">
							<div class="bg-gray-50 p-4 rounded-lg">
								<div class="flex justify-between items-center mb-2">
									<span class="font-medium text-gray-700">Without Hosting</span>
									<span class="text-2xl font-bold text-[#F47216]">{plan.hosting.withoutHosting}</span>
								</div>
								<p class="text-sm text-gray-500">You handle your own hosting</p>
							</div>
							
							<div class="bg-[#F47216] bg-opacity-10 p-4 rounded-lg border border-[#F47216]">
								<div class="flex justify-between items-center mb-2">
									<span class="font-medium text-gray-700">With Hosting Included</span>
									<span class="text-2xl font-bold text-[#F47216]">{plan.hosting.withHosting}</span>
								</div>
								<p class="text-sm text-gray-600">1 year hosting + domain included</p>
							</div>
						</div>
						
						<!-- Features -->
						<ul class="space-y-3 mb-8">
							{#each plan.features as feature}
								<li class="flex items-center">
									<span class="w-5 h-5 bg-[#F47216] rounded-full flex items-center justify-center mr-3">
										<span class="text-white text-xs">✓</span>
									</span>
									<span class="text-gray-700">{feature}</span>
								</li>
							{/each}
						</ul>
						
						<button class="w-full {plan.popular ? 'bg-[#F47216] hover:bg-[#E5650C] text-white' : 'border-2 border-[#F47216] text-[#F47216] hover:bg-[#F47216] hover:text-white'} py-3 px-6 rounded-lg font-semibold transition-all duration-200">
							Choose {plan.type}
						</button>
					</div>
				{/each}
			</div>
		</GlassContainer>
	</div>
</section>

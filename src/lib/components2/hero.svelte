<script>
	import { onMount } from 'svelte';
	
	let currentSlide = $state(0);
	
	const slides = [
		"Stand out in a competitive job market with a professional portfolio",
		"Showcase your projects and skills to potential employers",
		"Build credibility and trust with clients and recruiters",
		"Demonstrate your technical expertise beyond just a resume",
		"Create a lasting first impression that gets you hired"
	];
	
	onMount(() => {
		const interval = setInterval(() => {
			currentSlide = (currentSlide + 1) % slides.length;
		}, 3000);
		
		return () => clearInterval(interval);
	});
</script>

<section class="relative overflow-hidden bg-gradient-to-br from-orange-50 to-white">
	<div class="container mx-auto px-4 py-16 lg:py-24">
		<div class="grid lg:grid-cols-2 gap-12 items-center">
			<!-- Left Content -->
			<div class="space-y-8">
				<div class="space-y-4">
					<h1 class="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
						Build Your Perfect
						<span class="text-[#F47216]">Developer Portfolio</span>
					</h1>
					<p class="text-xl text-gray-600 leading-relaxed">
						Create stunning, professional portfolios that showcase your skills and land you your dream job. No coding required.
					</p>
				</div>
				
				<!-- Slideshow -->
				<div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#F47216]">
					<div class="flex items-center space-x-3">
						<div class="w-3 h-3 bg-[#F47216] rounded-full animate-pulse"></div>
						<p class="text-lg font-medium text-gray-800 transition-all duration-500">
							{slides[currentSlide]}
						</p>
					</div>
				</div>
				
				<!-- CTA Buttons -->
				<div class="flex flex-col sm:flex-row gap-4">
					<button class="bg-[#F47216] hover:bg-[#E5650C] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg">
						Get Started Now
					</button>
					<button class="border-2 border-[#F47216] text-[#F47216] hover:bg-[#F47216] hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
						View Templates
					</button>
				</div>
			</div>
			
			<!-- Right Image -->
			<div class="relative">
				<div class="bg-gradient-to-br from-[#F47216] to-[#E5650C] p-8 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
					<img 
						src="/placeholder.svg?height=400&width=600" 
						alt="Portfolio Preview" 
						class="w-full h-auto rounded-lg shadow-lg"
					/>
				</div>
				<!-- Floating elements -->
				<div class="absolute -top-4 -right-4 bg-white p-4 rounded-full shadow-lg">
					<div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
						<span class="text-white font-bold">✓</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<script lang="ts">
	import type { PersonalDataItem } from '$lib/model/personal';
	import { Mail, Phone, MapPin, Send, User, MessageSquare, Github, Linkedin, Twitter, ExternalLink, Globe, Instagram, Facebook, Youtube, Dribbble, Shield, ShieldQuestion } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { MASTER_EMAIL, pb } from '$lib/api-client';

	export let personal: PersonalDataItem;

	// Form state
	let formData = {
		fullName: '',
		email: '',
		subject: '',
		message: ''
	};

	let isSubmitting = false;
	let submitMessage = '';

	// Handle form submission
	async function handleSubmit(event: Event) {
		event.preventDefault();
		isSubmitting = true;
		submitMessage = '';

		try {

			// Prepare data for API
			const contactData = {
				sender_name: formData.fullName,
				sender_email_id: formData.email,
				subject: formData.subject,
				content: formData.message,
				created_for: MASTER_EMAIL,
			};

			// Send data using the API client
			await pb.saveContactMeDetails(contactData);
			
			// Reset form
			formData = {
				fullName: '',
				email: '',
				subject: '',
				message: ''
			};
			
			submitMessage = 'Message sent successfully! I\'ll get back to you soon.';
		} catch (error) {
			console.error('Error sending contact form:', error);
			submitMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}

	// Get appropriate icon for social media platform
	function    getSocialIcon(url: string) {
		const lowerUrl = url.toLowerCase();
		if (lowerUrl.includes('github')) return Github;
		if (lowerUrl.includes('linkedin')) return Linkedin;
		if (lowerUrl.includes('twitter') || lowerUrl.includes('x.com')) return Twitter;
		if (lowerUrl.includes('instagram')) return Instagram;
		if (lowerUrl.includes('facebook')) return Facebook;
		if (lowerUrl.includes('youtube')) return Youtube;
		if (lowerUrl.includes('dribbble')) return Dribbble;
		return ShieldQuestion; // Default icon for other platforms
	}

	// Get platform name from URL
	function getPlatformName(url: string) {
		const lowerUrl = url.toLowerCase();
		if (lowerUrl.includes('github')) return 'GitHub';
		if (lowerUrl.includes('linkedin')) return 'LinkedIn';
		if (lowerUrl.includes('twitter') || lowerUrl.includes('x.com')) return 'Twitter';
		if (lowerUrl.includes('instagram')) return 'Instagram';
		if (lowerUrl.includes('facebook')) return 'Facebook';
		if (lowerUrl.includes('youtube')) return 'YouTube';
		if (lowerUrl.includes('dribbble')) return 'Dribbble';
		
		// Extract domain name as fallback
		try {
			const domain = new URL(url).hostname.replace('www.', '');
			return domain.charAt(0).toUpperCase() + domain.slice(1);
		} catch {
			return url;
		}
	}

	onMount(() => {
		// Animation for form elements
		gsap.fromTo('.contact-form', 
			{ x: -50, opacity: 0 },
			{ x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
		);

		// Animation for social links
		gsap.fromTo('.social-links', 
			{ x: 50, opacity: 0 },
			{ x: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
		);

		// Stagger animation for form fields
		gsap.fromTo('.form-field', 
			{ y: 20, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.4 }
		);

		// Stagger animation for social items
		gsap.fromTo('.social-item', 
			{ scale: 0, opacity: 0 },
			{ scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.6 }
		);
	});
</script>

<section class="contact-section mx-auto max-w-7xl px-4 py-20">
	<h1 class="heading-glass mb-6 text-center text-4xl font-bold">Get In Touch Or Hire Me</h1>
	<p class="text-glass-secondary mb-12 text-center text-xl">
		Let's discuss your next project.
	</p>

	<div class="grid gap-12 lg:grid-cols-2">
		<!-- Contact Form -->
		<div class="contact-form">
			<h2 class="text-glass-primary mb-6 text-2xl font-bold">Send me a message</h2>
			
			<form on:submit={handleSubmit} class="space-y-6">
				<div class="form-field">
					<input
						type="text"
						id="fullName"
						bind:value={formData.fullName}
						required
						class="glass-input w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-glass-primary placeholder-white/60 backdrop-blur-sm transition-all focus:border-purple-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
						placeholder="Your full name"
					/>
				</div>

				<div class="form-field">
					
					<input
						type="email"
						id="email"
						bind:value={formData.email}
						required
						class="glass-input w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-glass-primary placeholder-white/60 backdrop-blur-sm transition-all focus:border-purple-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
						placeholder="your.email@example.com"
					/>
				</div>

				<div class="form-field">
					
					<input
						type="text"
						id="subject"
						bind:value={formData.subject}
						required
						class="glass-input w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-glass-primary placeholder-white/60 backdrop-blur-sm transition-all focus:border-purple-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
						placeholder="What's this about?"
					/>
				</div>

				<div class="form-field">
					
					<textarea
						id="message"
						bind:value={formData.message}
						required
						rows="6"
						class="glass-input w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-glass-primary placeholder-white/60 backdrop-blur-sm transition-all focus:border-purple-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-purple-400/50 resize-none"
						placeholder="Tell me about your project, ideas, or just say hello..."
					></textarea>
				</div>

				<div class="form-field">
					<button
						type="submit"
						disabled={isSubmitting}
						class="glass-button w-full hover:scale-101 cursor-pointer transition-all duration-300 rounded-lg text-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
					>
						{#if isSubmitting}
							<div class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
							Sending...
						{:else}
							<Send class="h-4 w-4 text-black" />
							Send Message
						{/if}
					</button>
				</div>

				{#if submitMessage}
					<div class="form-field">
						<p class="text-center text-sm {submitMessage.includes('success') ? 'text-green-400' : 'text-red-400'}">
							{submitMessage}
						</p>
					</div>
				{/if}
			</form>
		</div>

		<!-- Contact Info & Social Links -->
		<div class="social-links">
			<h2 class="text-glass-primary mb-6 text-2xl font-bold">Let's connect</h2>
			
			<!-- Contact Information -->
			<div class="mb-8 space-y-4">
				<div class="flex items-center gap-4 text-glass-primary">
					<div class="flex h-12 w-12 items-center justify-center rounded-full glass-button backdrop-blur-sm">
						<Mail class="h-5 w-5 text-purple-400" />
					</div>
					<div>
						<p class="text-sm text-glass-secondary">Email</p>
						<a href="mailto:{personal.email_id}" class="text-lg hover:text-black transition-colors">
							{personal.email_id}
						</a>
					</div>
				</div>

				<div class="flex items-center gap-4 text-glass-primary">
					<div class="flex h-12 w-12 items-center justify-center rounded-full glass-button backdrop-blur-sm">
						<Phone class="h-5 w-5 text-purple-400" />
					</div>
					<div>
						<p class="text-sm text-glass-secondary">Phone</p>
						<a href="tel:{personal.phone_number}" class="text-lg hover:text-black transition-colors">
							{personal.phone_number}
						</a>
					</div>
				</div>

				<div class="flex items-center gap-4 text-glass-primary">
					<div class="flex h-12 w-12 items-center justify-center rounded-full glass-button backdrop-blur-sm">
						<MapPin class="h-5 w-5 text-purple-400" />
					</div>
					<div>
						<p class="text-sm text-glass-secondary">Location</p>
						<p class="text-lg">{personal.address}</p>
					</div>
				</div>
			</div>

			<!-- Social Media Links -->
			<div>
				<h3 class="text-glass-primary mb-4 text-xl font-semibold">Follow me on</h3>
				<div class="grid gap-3 sm:grid-cols-2">
					{#each personal.expand.soceial_media as social}
						<a
							href={social.link}
							target="_blank"
							rel="noopener noreferrer"
							class="social-item group flex items-center gap-4 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all hover:border-purple-400/50 hover:bg-white/15 hover:shadow-lg hover:shadow-purple-500/10"
						>
							<div class="flex h-12 w-12 items-center justify-center rounded-full glass-button backdrop-blur-sm">
								<svelte:component this={getSocialIcon(social.name)} class="h-5 w-5 text-purple-400" />
							</div>
							<div class="flex-1">
								<p class="text-glass-primary font-medium text-purple-400">{getPlatformName(social.name)}</p>
							</div>
							<ExternalLink class="h-4 w-4 text-glass-secondary transition-colors group-hover:text-purple-400" />
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.glass-input:focus {
		box-shadow: 0 0 0 1px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.1);
	}

	.glass-button {
        background-color: rgba(255, 255, 255, 0.55);
        height: 3rem;
		box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);
	}

	.glass-button:active {
		transform: translateY(0);
	}

	/* Custom scrollbar for textarea */
	.glass-input::-webkit-scrollbar {
		width: 6px;
	}

	.glass-input::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
	}

	.glass-input::-webkit-scrollbar-thumb {
		background: rgba(168, 85, 247, 0.5);
		border-radius: 3px;
	}

	.glass-input::-webkit-scrollbar-thumb:hover {
		background: rgba(168, 85, 247, 0.7);
	}
</style>

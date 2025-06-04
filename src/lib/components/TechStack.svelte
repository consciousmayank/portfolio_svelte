<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    // Import the Devicon CSS
    import 'devicon/devicon.min.css';

    export let skills: Array<{
        category: string;
        items: Array<{
            name: string;
            icon: string;
        }>;
    }> = [];

    
    // Track selected category (All is default)
    let selectedCategory = 'All';
    
    // Create a new array with All category and isSelected property
    $: categoriesWithItems = [
        {
            category: 'All',
            isSelected: true,
            items: skills.flatMap(category => category.items)
        },
        ...skills.map(category => ({
            ...category,
            isSelected: false
        }))
    ];
    
    // Function to handle category selection
    function selectCategory(categoryName: string) {
        selectedCategory = categoryName;
        categoriesWithItems = categoriesWithItems.map(cat => ({
            ...cat,
            isSelected: cat.category === categoryName
        }));
    }
    
    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate skill items
        gsap.from('.skill-item', {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.5)",
            scrollTrigger: {
                trigger: '.skill-item',
                start: "top 85%",
            }
        });
        
        // Animate skill icons
        gsap.from('.skill-icon', {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
                trigger: '.skill-icon',
                start: "top 85%",
            }
        });
        
        // Animate skill names
        gsap.from('.skill-text', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.skill-text',
                start: "top 85%",
            }
        });
    });
</script>

<section class="tech-stack mx-auto items-center justify-center overflow-hidden px-4 py-20">
    <h1 class="mb-6 text-center text-4xl font-bold heading-glass">Skills</h1>
    <div class="categories-tabs">
        {#each categoriesWithItems as category}
            <button 
                class="category-tab {category.isSelected ? 'active' : ''}" 
                on:click={() => selectCategory(category.category)}
            >
                {category.category}
            </button>
        {/each}
    </div>

    <div class="skills-container">
        {#each categoriesWithItems.find(cat => cat.isSelected)?.items || [] as skill}
            <div class="skill-item">
                <div class="skill-icon">
                    <i class="devicon-{skill.icon}"></i>
                </div>
                <div class="skill-text text-glass-primary">{skill.name}</div>
            </div>
        {/each}
    </div>
</section>

<style>
    .tech-stack {
        padding: 2rem 0;
    }

    .categories-tabs {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 2rem;
    }

    .category-tab {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.2) 0%, 
            rgba(255, 255, 255, 0.1) 100%);
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .category-tab.active {
        background: linear-gradient(135deg, 
            rgba(168, 85, 247, 0.8) 0%, 
            rgba(147, 51, 234, 0.8) 100%);
        color: rgba(255, 255, 255, 0.98);
        font-weight: bold;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(168, 85, 247, 0.5);
    }

    .category-tab:hover {
        background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.3) 0%, 
            rgba(255, 255, 255, 0.2) 100%);
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .skills-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
    }

    .skill-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100px;
        text-align: center;
    }

    .skill-icon {
        font-size: 6.5rem;
        margin-bottom: 0.5rem;
        color: #4a86e8;
    }

    .skill-text {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.95);
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        font-weight: 500;
    }
</style>


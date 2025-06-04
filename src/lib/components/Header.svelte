<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    
    let scrollY;
    let headerClass = '';
    export let name: string;
    
    onMount(() => {
      // Add scroll event listener for header styling
      const updateHeaderClass = () => {
        headerClass = window.scrollY > 50 ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md' : 'bg-transparent';
      };
      
      window.addEventListener('scroll', updateHeaderClass);
      updateHeaderClass(); // Initial check
      
      return () => {
        window.removeEventListener('scroll', updateHeaderClass);
      };
    });
    
    const navItems = [
      { href: '/', label: 'Home' },
      { href: '#about', label: 'About' },
      { href: '#skills', label: 'Skills' },
      { href: '#projects', label: 'Projects' },
      // { href: '/blog', label: 'Blog' },
      // { href: '/contact', label: 'Contact' },
    ];
    
    let isMenuOpen = false;
    
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
    }
  </script>
  
  <header class="fixed top-0 left-0 w-full z-50 transition-all duration-300 {headerClass}">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <a href="/" class="text-2xl font-bold text-purple-glass">{name}</a>
      
      <!-- Desktop menu -->
      <nav class="hidden md:flex items-center space-x-8">
        {#each navItems as item}
          <a 
            href={item.href} 
            class="text-glass-secondary hover:text-purple-glass transition-colors duration-200 {$page.url.pathname === item.href ? 'font-semibold text-purple-glass' : ''}"
          >
            {item.label}
          </a>
        {/each}
        <!-- <ThemeToggle /> -->
      </nav>
      
      <!-- Mobile menu button -->
      <div class="flex items-center md:hidden">
        <!-- <ThemeToggle /> -->
        <button 
          class="ml-4 text-glass-secondary hover:text-purple-glass" 
          on:click={toggleMenu}
          aria-label="Toggle menu"
        >
          {#if isMenuOpen}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          {/if}
        </button>
      </div>
    </div>
    
    <!-- Mobile menu -->
    {#if isMenuOpen}
      <nav class="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg">
        <div class="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {#each navItems as item}
            <a 
              href={item.href} 
              class="text-glass-secondary hover:text-purple-glass transition-colors duration-200 {$page.url.pathname === item.href ? 'font-semibold text-purple-glass' : ''}"
              on:click={() => isMenuOpen = false}
            >
              {item.label}
            </a>
          {/each}
        </div>
      </nav>
    {/if}
  </header>
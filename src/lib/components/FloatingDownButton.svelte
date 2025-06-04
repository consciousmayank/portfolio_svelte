<script>
  import { onMount, onDestroy } from 'svelte';
  import { tick } from 'svelte';
  let isVisible = true;
  let browser = false;

  function checkScroll() {
    if (!browser) return;
    // Hide if at the bottom of the page
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    isVisible = scrollY + windowHeight < docHeight - 10; // 10px tolerance
  }

  onMount(() => {
    browser = true;
    checkScroll();
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    }
  });
</script>

{#if browser && isVisible}
  <button
    class="fixed bottom-6 right-6 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-300 dark:border-gray-700 shadow-lg rounded-full p-3 flex items-center justify-center hover:bg-purple-100/50 dark:hover:bg-purple-900/30 transition-colors"
    aria-label="Scroll Down"
    on:click={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down text-purple-600 dark:text-purple-400">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </button>
{/if}

<style>
  button {
    box-shadow: 0 4px 16px rgba(80, 0, 120, 0.08);
  }
</style> 
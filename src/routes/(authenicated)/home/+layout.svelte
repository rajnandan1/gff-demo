<script>
	import Aside from "$lib/components/Aside.svelte";
</script>

<div class="app">
	<div class="flex h-screen bg-white">
		<!-- Sidebar -->
		<aside class="w-64 border border-l bg-gradient-to-tl from-blue-50 via-violet-50 to-white">
			<Aside />
		</aside>

		<div class="flex flex-1 flex-col bg-white">
			<!-- Navbar -->

			<!-- Main Content -->
			<main class="flex-1 overflow-y-auto p-0 pt-0">
				<slot></slot>
				<!-- Add more content components here -->
			</main>
		</div>
	</div>
</div>

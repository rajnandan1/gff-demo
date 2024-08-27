<script>
	import { CircleCheck } from "lucide-svelte";
	import { base } from "$app/paths";
</script>

<svelte:head>
	<title>UPI Switch Demo</title>
</svelte:head>
<div
	class="upi-grid mx-auto min-h-screen w-svw bg-gradient-to-br from-violet-600 via-indigo-600 to-violet-800 md:w-[475px]"
>
	<!-- ========== HEADER ========== -->
	<header class="z-50 flex w-full flex-wrap py-4 md:flex-nowrap md:justify-start">
		<nav
			class="relative mx-auto flex w-full max-w-7xl basis-full flex-wrap items-center px-4 md:grid md:grid-cols-12 md:px-6"
		>
			<div class="md:col-span-3">
				<!-- Logo -->
				<a
					class="inline-block flex-none rounded-xl text-xl font-semibold focus:opacity-80 focus:outline-none"
					href="https://www.cashfree.com"
					aria-label="Preline"
				>
					<img
						src="https://cashfreelogo.cashfree.com/cashfreepayments/logosvgs/Cashfree_Payments_Logo-1.svg"
						alt=""
						srcset=""
					/>
				</a>
				<!-- End Logo -->
			</div>

			<!-- Button Group -->
			<div
				class="  ms-auto flex items-center gap-x-1 py-1 md:order-3 md:col-span-3 md:gap-x-2 md:ps-6"
			>
				<a
					href="https://www.cashfree.com/contact-sales/?source-action=upi%20qr%20code&action=Contact%20Sales&button-id=ContactSales_Hero"
					class="inline-flex items-center gap-x-2 rounded-sm border border-white bg-transparent px-3 py-2 text-sm font-medium text-white transition focus:outline-none disabled:pointer-events-none disabled:opacity-50"
				>
					Learn More
				</a>
			</div>
			<!-- End Button Group -->

			<!-- Collapse -->
			<!-- End Collapse -->
		</nav>
		<div class="mx-auto max-w-7xl pt-14 text-center">
			<p class="mb-2 text-xs font-medium uppercase text-white">
				<span class="inline-block h-2 w-2 bg-lime-400"></span>
				UPI Switch demo
			</p>
			<h2 class="mb-8 text-white">
				<span class="text-xl font-semibold">We are live with</span> <br />
				<span class="text-4xl font-semibold">Contextual UPI <br /> Payments</span>
			</h2>
			<p class="mb-2">
				<CircleCheck class="mr-1 inline-block h-5 w-5 text-indigo-400" />
				<span class="text-white">Powered by our very own Switch</span>
			</p>
			<p class="mb-8">
				<CircleCheck class="mr-1 inline-block h-5 w-5 text-indigo-400" />
				<span class="text-white">Launched alongside NPCI today!</span>
			</p>
			<p class="px-8 text-white">
				Experience personalized, on-the-go payments with just a tap. Click the link below,
				complete your payment, and bring the screenshot to booth M27 to grab your free
				goodie!
			</p>

			<div class="mt-8 px-6">
				<a
					href="intent://pay?pa=contextualtest@cashfreensdlpb&pn=Business%20Name&tr=3005424651&am=1.00&cu=INR&mode=00&purpose=00&mc=5262&tn=ab#Intent;scheme=upi;package=in.org.npci.upiapp;end"
					class="button-41 font-medium"
					role="button">TRY IT NOW</a
				>
			</div>

			<div class="mt-14 border-t border-[rgba(0,0,0,.1)] py-6">
				<p class="mb-4 text-xs text-indigo-300">Developed in partnership with</p>
				<img class="mr-2 inline" src="{base}/NPCI.svg" alt="" srcset="" />
				<img class="inline" src="{base}/NSDL.svg" alt="" srcset="" />
			</div>
		</div>
	</header>
	<!-- ========== END HEADER ========== -->
</div>

<style>
	/* CSS */
	.button-41 {
		background-color: initial;
		background-image: linear-gradient(-180deg, #00d775, #00bd68);
		border-radius: 5px;
		box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
		color: #ffffff;
		cursor: pointer;
		display: inline-block;
		font-family:
			Inter,
			-apple-system,
			system-ui,
			Roboto,
			"Helvetica Neue",
			Arial,
			sans-serif;
		height: 44px;
		line-height: 44px;
		outline: 0;
		overflow: hidden;
		padding: 0 20px;
		pointer-events: auto;
		position: relative;
		text-align: center;
		touch-action: manipulation;
		user-select: none;
		-webkit-user-select: none;
		vertical-align: top;
		white-space: nowrap;
		width: 100%;
		z-index: 9;
		border: 0;
	}

	.button-41:hover {
		background: #00bd68;
	}
</style>

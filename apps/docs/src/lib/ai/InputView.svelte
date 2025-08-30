<script lang="ts">
	import { aiResultStore } from '$lib/ai/AIStore';
	import { onMount } from 'svelte';
	let currentMessage = 'Please generate me a personal website';
	let model = 'gpt-4o';
	let apiKey = '';
	let url = 'https://api.openai.com/v1/chat/completions';
	const example = `{"rows":[{"component":"TextBox","props":{"text":"My Website!","type":"h1"},"posX":"middle"},{"layoutClass":"md:my-12","cols":[{"component":"TextBox","props":{"text":"Hi! This is AI generated!","type":"h1"},"posX":"middle","posY":"middle"},{"component":"CodeBlock","props":{"language":"ts","code":"console.log(123)"},"posX":"middle","posY":"middle"},{"component":"ImageBox","props":{"url":"https://placedog.net/200/200"},"posX":"middle","posY":"middle"}]}]}`;
	let prompt = `You are a AI chatbot that only response JSON object, not markdown. You are required to generate a json based on this example:\`${example}\` You have 3 components you can use: TextBox,CodeBlock,ImageBox.`;

	async function getChatGPTResponse() {
		const data = {
			messages: [
				{
					role: 'system',
					content: prompt
				},
				{
					role: 'user',
					content: currentMessage
				}
			],
			model,
			temperature: 1,
			presence_penalty: 0,
			top_p: 1,
			frequency_penalty: 0
		};

		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify(data)
		});

		const j = await res.json();
		const result = j.choices[0].message.content;
		aiResultStore.set(JSON.parse(result));
	}
	aiResultStore.subscribe((x) => {
		if (x) {
			sessionStorage.setItem('aiStore', JSON.stringify(x));
		}
	});

	const handleKeyChange = () => {
		sessionStorage.setItem('keyStore', apiKey);
	};

	onMount(() => {
		apiKey = sessionStorage.getItem('keyStore') ?? '';
	});
</script>

<form
	class="
   mx-auto max-w-2xl rounded-lg bg-white p-6 shadow
   dark:bg-gray-800
 "
>
	<div class="mb-5">
		<label
			for="endpoint"
			class="
     mb-2 block text-sm font-medium text-gray-900
     dark:text-white
   ">Endpoint</label
		>
		<input
			id="endpoint"
			type="text"
			class="
     block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900
     focus:border-blue-500 focus:ring-blue-500
     dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
     dark:focus:border-blue-500 dark:focus:ring-blue-500
   "
			placeholder="https://api.openai.com/v1/chat/completions"
			bind:value={url}
		/>
	</div>
	<div class="mb-5">
		<label
			for="model"
			class="
     mb-2 block text-sm font-medium text-gray-900
     dark:text-white
   ">Model</label
		>
		<input
			id="model"
			type="text"
			class="
     block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900
     focus:border-blue-500 focus:ring-blue-500
     dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
     dark:focus:border-blue-500 dark:focus:ring-blue-500
   "
			placeholder="gpt-4o"
			bind:value={model}
		/>
	</div>
	<div class="mb-5">
		<label
			for="apiKey"
			class="
     mb-2 block text-sm font-medium text-gray-900
     dark:text-white
   ">API key (stored in browser)</label
		>
		<input
			id="apiKey"
			type="password"
			class="
     block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900
     focus:border-blue-500 focus:ring-blue-500
     dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
     dark:focus:border-blue-500 dark:focus:ring-blue-500
   "
			placeholder="sk-..."
			bind:value={apiKey}
			on:change={handleKeyChange}
		/>
	</div>
	<div class="mb-5">
		<label
			for="prompt"
			class="
     mb-2 block text-sm font-medium text-gray-900
     dark:text-white
   ">Prompt</label
		>
		<textarea
			id="prompt"
			rows="4"
			class="
     block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900
     focus:border-blue-500 focus:ring-blue-500
     dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
     dark:focus:border-blue-500 dark:focus:ring-blue-500
   "
			placeholder="You are an AI assistant."
			bind:value={prompt}
		></textarea>
	</div>
	<div class="mb-5">
		<label
			for="currentMessage"
			class="
     mb-2 block text-sm font-medium text-gray-900
     dark:text-white
   ">Message</label
		>
		<textarea
			id="currentMessage"
			rows="2"
			class="
     block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900
     focus:border-blue-500 focus:ring-blue-500
     dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
     dark:focus:border-blue-500 dark:focus:ring-blue-500
   "
			placeholder="Write a message..."
			bind:value={currentMessage}
		></textarea>
	</div>
	<div class="flex justify-end">
		<button
			type="button"
			class="
     rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white
     hover:bg-blue-800
     focus:ring-4 focus:ring-blue-300 focus:outline-none
     dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
   "
			on:click={() => getChatGPTResponse()}
		>
			Send
		</button>
	</div>
</form>

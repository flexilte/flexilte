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
			model: 'gpt-3.5-turbo',
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

<div class="input-group-divider rounded-container-token">
	<div class="m-4"></div>
	<label class="label">
		<span>Endpoint</span>
		<input
			class="input rounded-container-token"
			type="text"
			placeholder="https://api.openai.com/v1/chat/completions"
			bind:value={url}
		/>
	</label>
	<label class="label">
		<span>Model</span>
		<input
			class="input rounded-container-token"
			type="text"
			placeholder="gpt-4o"
			bind:value={model}
		/>
	</label>
	<label class="label">
		<span>API key (stored in browser)</span>
		<input
			class="input rounded-container-token"
			type="password"
			placeholder="sk-"
			bind:value={apiKey}
			on:change={handleKeyChange}
		/>
	</label>
	<label class="label">
		<span>prompt</span>
		<textarea
			class="textarea"
			rows="4"
			placeholder="You are an AI assistant."
			bind:value={prompt}
		/>
	</label>
</div>

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token mt-6">
	<button class="input-group-shim"></button>
	<textarea
		bind:value={currentMessage}
		class="bg-transparent border-0 ring-0"
		name="prompt"
		id="prompt"
		placeholder="Write a message..."
	/>
	<button class="variant-filled-primary" on:click={() => getChatGPTResponse()}>Send</button>
</div>

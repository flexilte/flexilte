import TextBox from '$lib/components/TextBox.svelte';
import ButtonBox from '$lib/components/ButtonBox.svelte';
import CardBox from '$lib/components/CardBox.svelte';
import DemoBox from '$lib/components/DemoBox.svelte';
import ImageBox from '$lib/components/ImageBox.svelte';
import Spacing from '$lib/components/Spacing.svelte';
import { Avatar, Progressbar, Spinner, Tags } from 'flowbite-svelte';
import CodeBlock from './components/CodeBlock.svelte';
import ChatView from './ai/ChatView.svelte';
import InputView from './ai/InputView.svelte';

export const components = {
	TextBox,
	ButtonBox,
	CardBox,
	DemoBox,
	Spinner,
	Avatar,
	Progressbar,
	CodeBlock,
	ChatView,
	InputView,
	Spacing,
	ImageBox,
	Tags
};

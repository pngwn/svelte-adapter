import { SvelteComponent, SvelteComponentTyped } from "svelte";
import { FC } from "react";

type ExtractProps<Ctor> = Ctor extends new (arg: any) => SvelteComponentTyped<infer Props> ? Props : Record<string, any>;

export default function <CompCtor extends new (arg: any) => SvelteComponent>(
	component: CompCtor,
	styles?: Record<string, string>,
	element?: string
): FC<ExtractProps<CompCtor>>

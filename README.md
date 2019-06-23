# svelte-adapter

A simple utility that allows you to use [Svelte]() components inside [Vue]() or [React]() components.

There is an adapter each for Vue and React which allows you to pass props and respond to events in a way that makes sense for that library.

This isn't a perfect solution, there are some limitations.

# Install

With [npm]():

```bash
npm install svelte-adapter
```

Or with [yarn]():

```bash
yarn add svelte-adapter
```

# Use it

Each 'adapter' is a simple function that tales a svelte component and a few options and returns a Vue or React component that can be used in Vue templates or JSX as you would expect. The returned components will always have a wrapper element, by default this is a `<span>` but it can be customised.

The adapters both have the same signature:

```ts
adapter(Component: SvelteComponent, styleObject?: object, wrapperElement?: string) : Component`
```

- `Component` should be a _compiled_ svelte component, either precompiled or compiled as part of your build step using `rollup-plugin-svelte` for rollup or `svelte-loader` from webpack.
- `styleObject` (optional) should be an object of styles that will be applied to the base elemement. This should be a valid JavaScript object with camelCased css property names. This defaults to an empty object.
- `wrapperElement` (optional). All component have a base 'wrapper' element, by default this is a `<span>` but you can pass in a string to customise this behaviour (eg: `'div'`, `'li'`, etc.) If need a specific wrapper element but don't care about styles, you can simply pass an empty object as the `styleObject`.

In the examples below the Svelte component we will be using is a simple component that accepts a prop that will be rendered and emits an event upon clicking a button.

```svelte
<script>
  import { createEventDispatcher } from 'svelte';

  export let number = 0;
  const dispatch = createEventDispatcher();
</script>

<h1>{ number }</h1>
<button on:click={ () => dispatch('magicalclick') }>
  Click Me
</button>
```

## Examples

### React

The React-Svelte adapter is a named import: `toReact`.

The implementation of the React adapter uses [hooks]() so you will need a recent version of React for this to work. If necessary I could add a class-based version at some stage.

Using the adaptor is very straight-forward, the adapter is a Higher Order Component that takes a Svelte component and returns a React component. The below example assumes your are compiling Svelte components as they are imported using webpack or rollup. If not, just import the compiled javascript file instead.

Svelte components can emit events which doesn't quite make sense in React. Any events emitted by the svelte component can be passed callbacks via an `on*` prop containing a function, this function will fire when the event is emitted. Any prop that starts with `on` followed by a capital letter is assumed to be an event and will be used to add a listener. `onClick` will fire the provided callback when `'click'` events are emitted, `onSomethingRandom` will do the same for `'somethingRandom'` events. This does not interfere with props that have the same naming convention, they will all be passed regardless.

Normal props behave as you would expect.

```js
import React, { useState } from "react";
import { toReact } from "svelte-adapter";

import SvelteComponent from "../App.svelte";

const baseStyle = {
  width: "50%"
};

const SvelteInReact = reactSvelte(SvelteApp, baseStyle, "div");

const App = () => {
  const [count, setCount] = useState(10);

  const handleClick = () => setCount(prevCount => prevCount + 1);

  return (
    <div>
      <SvelteInReact number={count} onMagicalclick={handleClick} />
      <button onClick={handleClick}>Increment - {count}</button>
    </div>
  );
};
```

### Vue

The Vue-Svelte adapter is a named import: `toVue`.

Using the adapter is very straight-forward, the adapter is a Higher Order Component that takes a Svelte component and returns a Vue component. The below example assumes your are compiling Svelte components as they are imported using webpack or rollup. If not, just import the compiled javascript file instead.

Since Vue has an event mechanism similar to Svelte, event directives can be used as expected. `v-on:*` or `@*` directives will listen for the matching events on the Svelte component. `v-on:click` or `@click` will fire the provided callback when `'click'` events are emitted, `v-on:somethingRandom` or `@somethingrandom` will do the same for `'somethingRandom'` events. Other props behave as you would expect.

Normal props behave as expected.

```vue
<template>
  <div>
    <SvelteInVue :number="count" @magicalclick="handleClick" />
    <button @click="handleClick">Increment - {{ count }}</button>
  </div>
</template>

<script>
import SvelteApp from "../App.svelte";
import { toVue } from "svelte-adapter";

const baseStyle = {
  width: "50%"
};

export default {
  components: {
    SvelteInVue: vueAdaptor(SvelteApp, baseStyle, "div")
  },
  data() {
    return {
      count: 0
    };
  },
  methods: {
    handleClick() {
      this.count += 1;
    }
  }
};
</script>
```

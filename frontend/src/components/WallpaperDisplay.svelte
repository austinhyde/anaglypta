<script>
  export let files;
  import Bricks from './Bricks.svelte';
  import Image from './Image.svelte';

  let innerWidth;

  const maxWidth = 300;
  const minCols = 1;
  $: cols = Math.max(Math.floor(innerWidth / maxWidth), minCols);
</script>

<svelte:window bind:innerWidth/>

<div class="grow">
  <Bricks {cols} items={files} let:item={file}>
    <Image {file}/>
  </Bricks>
</div>
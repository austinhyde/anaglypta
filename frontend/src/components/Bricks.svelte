<script lang="ts">
  export let cols: number = 3;
  export let items = [];

  $: reordered = reorder(items, cols);

  function reorder(arr, cols) {
    const out = [];
    for (let col = 0; col < cols; col++) {
      for (let i = 0; i < arr.length; i += cols) {
        let _val = arr[i + col];
        if (_val !== undefined)
          out.push(_val);
      }
    }
    return out;
  }
</script>

<style>
  .bricks {
    column-count: var(--cols);
    column-gap: 0;
  }
</style>

<div class="bricks" style="--cols:{cols}">
  {#each reordered as item}
    <slot {item}/>
  {/each}
</div>
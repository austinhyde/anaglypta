<script lang="ts">
    import { getAbsoluteOffset } from "../utils";

  export let relativeTo: HTMLElement;
  $: relativeSize = [relativeTo.offsetWidth, relativeTo.offsetHeight];
  $: relativePos = getAbsoluteOffset(relativeTo);
  let container;
  $: containerPos = container == null || getAbsoluteOffset(container);


  const borderRadius = 10;
  const arrowSize = 8;
  $: arrowTop = borderRadius + arrowSize/2;
  
  $: left = relativePos[0];
  $: top = relativePos[1] + arrowSize/2;
</script>
<div class="float" bind:this={container}>
  <div class="popup-menu vert shrink" style="--arrow-size:{arrowSize}px; --border-radius:{borderRadius}px; left:{left}px; top:{top}px">
    <slot/>
  </div>
</div>

<style lang="scss">
  .popup-menu {
    border: 1px solid var(--inv-bg-color);
    background-color: var(--inv-bg-color);
    color: var(--inv-fg-color);
    padding: 10px;
    border-radius: var(--border-radius);
    
    
    :first-child {
      margin-top: 0;
    }
    :last-child {
      margin-bottom: 0;
    }

    &::after {
      content: " ";
      position: absolute;
      top: calc(var(--border-radius) + var(--arrow-size));
      right: 100%;
      margin-top: calc(var(--arrow-size) * -1);
      border-width: var(--arrow-size);
      border-style: solid;
      border-color: transparent var(--inv-bg-color) transparent transparent;
    }
  }
</style>
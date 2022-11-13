<script lang="ts">
  import { GetFiles, AddRoot } from "../wailsjs/go/main/App";
  import WallpaperDisplay from "./components/WallpaperDisplay.svelte";
  import Loading from "./components/Loading.svelte";

  let filesPromise = (async function() {
    await AddRoot("/Users/austin/Drive/default/wallpaper");
    return GetFiles();
  })();
</script>

<main class="full">
  {#await filesPromise}
    <Loading/>
  {:then files}
    <WallpaperDisplay {files}/>
  {/await}
</main>

<style lang="scss">

</style>

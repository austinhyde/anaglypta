<script lang="ts">
  import { GetFiles, AddRoot } from "../wailsjs/go/main/App";
  import WallpaperDisplay from "./components/WallpaperDisplay.svelte";
  import Loading from "./components/Loading.svelte";
  import FolderMenu from "./components/FolderMenu.svelte";
  import 'iconify-icon';
    import PopupMenu from "./components/PopupMenu.svelte";

  let filesPromise = (async function() {
    return GetFiles();
  })();

  function updateFiles() {
    filesPromise = GetFiles()
  }

  let showFoldersMenu = false;
  let foldersButton;
</script>

<div class="full">
  <div class="horiz">
    <div class="vert sidebar">
      <button class="size-big" on:click={() => showFoldersMenu = !showFoldersMenu} bind:this={foldersButton}><iconify-icon icon="ph:folder-notch"/></button>
    </div>
    <div class="rest">
      {#if showFoldersMenu}
        <PopupMenu relativeTo={foldersButton}>
          <FolderMenu on:change={updateFiles}/>
        </PopupMenu>
      {/if}
      <div class="scrollable">
        {#await filesPromise}
          <Loading/>
        {:then files}
          <WallpaperDisplay files={files}/>
        {/await}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .sidebar {
    padding: 3px;
  }
  .rest {
    position: relative;
  }
</style>

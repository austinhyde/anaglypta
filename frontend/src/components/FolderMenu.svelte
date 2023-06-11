<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { AddRoot, ListRoots, RemoveRoot, SelectDirectory } from "../../wailsjs/go/main/App";
  import Loading from "./Loading.svelte";
  import PopupMenu from "./PopupMenu.svelte";
  const dispatch = createEventDispatcher();

  let foldersPromise = ListRoots();

  function remove(id) {
    return async function() {
      await RemoveRoot(id);
      foldersPromise = ListRoots();
      dispatch('change');
    }
  }

  async function add() {
    const dir = await SelectDirectory();
    if (dir == "") return;
    await AddRoot(dir);
    foldersPromise = ListRoots();
    dispatch('change');
  }

</script>


<h2>Wallpaper Folders</h2>
{#await foldersPromise}
  <Loading/>
{:then folders} 
  <ul>
    {#each folders as folder}
      <li>{folder.Path} <button class="invert" on:click={remove(folder.ID)}><iconify-icon icon="ph:trash"/></button></li>
    {/each}
    <li><button class="invert" on:click={add}><iconify-icon icon="ph:plus-circle"/></button></li>
  </ul>
{/await}
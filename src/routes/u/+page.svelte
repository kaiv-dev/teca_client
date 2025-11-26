<script lang="ts">
  import { get_all_guids } from "$lib/api/profile.svelte";


    import Miniprofile from "$lib/../components/user/miniprofile.svelte";

    let guids : string[] = $state([]);

    get_all_guids().then((r) => {
        guids = r;
    })
</script>


<div 
style=""
class="flex-grow flex justify-center relative vh min-w-[900px] p-2"
>


<div class="w-full flex justify-center relative">
    <div class="w-full h-fit max-w-[800px] p-2 card-base card-100 card-100-border grid grid-cols-2 gap-8">
        <div class="w-full h-fit gap-5 flex flex-wrap content-start justify-center">
            {#each [1,2,3,4,5,6,7,8]}
                <div class="w-[64px] h-[64px] c"></div>
            {/each}
        </div>

        {#each guids as guid (guid)}
            <Miniprofile user_id={guid}></Miniprofile>
        {/each}
    </div>
</div>

</div>

<style>

.c {
    /* background-color: oklch(50% 100% 220); */
    border-radius: 20px;
    border: oklch(50% 100% 220) 0px solid;
    transition: background-color 500ms cubic-bezier(0.33, 1, 0.68, 1), border 250ms cubic-bezier(0.5, 0, 0.75, 0);
}

.c:hover {
    background-color: oklch(65% 60% 220);
    border: oklch(65% 60% 220) 2px solid; /* oklch(65% 60% 220)*/
    transition: border 0ms cubic-bezier(0.5, 0, 0.75, 0);
}


</style>
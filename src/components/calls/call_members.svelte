<script lang="ts">


    let users = $state([
        {id: '1', name: 'Avatar 1'},
        {id: '2', name: 'Avatar 2'},
        {id: '3', name: 'Avatar 3'},
    ]);
    let cols = $state(2);
    function update_cols(n: number){
        if (n < 16) {
            cols = Math.ceil(Math.sqrt(n))
            return;
        }
        cols = 4
    }
    update_cols(users.length);
    function add_user(){
        let u = Math.round(Math.random() * 1000);
        users.push({id: `${u}`, name: `Avatar ${u}`});
        update_cols(users.length);
    }
    function remove_user(){
        users.pop();
        update_cols(users.length);
    }
</script>






<style>
    .parent {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 0.5rem;
        box-sizing: border-box;
        overflow: hidden;
    }

    .b {
        display: flex;
        justify-content: center;
        align-items: center;

        aspect-ratio: 16 / 10;
        max-width: 100%;
        max-height: 100%;
        width: 100%;
        height: auto;
    }

    .a {
        aspect-ratio: 16 / 10;
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: 100%;
        position: relative;
    }

    .container {
        display: grid;
        grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
        align-items: center;
        justify-content: center;
        align-content: center;
        min-width: 100%; /* wtf */
        gap: 10px;
        border: 2px solid  red;
    }

    .subcontainer {
        aspect-ratio: 16 / 10;
        width: auto;
        height: auto; 
        background-color: #000A;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
    }
</style>

<div class="parent" style="--cols:{cols};">
    <div class="b border">
        <div class="a border-2">
            <div class="w-full h-full container">
                {#each  users as user (user.id) }
                    <div class="subcontainer">{user.name}</div>
                {/each}
            </div>
        </div>
    </div>
</div>

<div class="absolute top-2 right-2">
    <button class="btn btn-primary" onclick={add_user}>Add user</button>
    <button class="btn btn-error" onclick={remove_user}>Remove user</button>
</div>
<!-- 
<style>
    
    .main {
        aspect-ratio: 16 / 10;
        max-width: 100%;
        max-height: 100%;
        aspect-ratio: 16 / 9;
        width: auto;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;

    }
    .test {
    }
    .row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
<div class="border w-full h-full p-2 relative flex items-center justify-center overflow-clip main">
    <div class="absolute top-2 right-2">
    <button class="btn btn-primary" on:click={add_user}>Add user</button>
    <button class="btn btn-error" on:click={remove_user}>Remove user</button>
    </div>
    <div class="border container" style="--cols:{cols};">
        {#each  users as user (user.id) }
            <div class="subcontainer">{user.name}</div>
        {/each}
    </div>
</div> -->


<!-- <style>

    .container {
        aspect-ratio: 16 / 10;
        height: 100%;
        /* width: 100%; */
        width: auto;
        align-items: center;
        align-content: center;
        display: grid;
        gap: 10px;
    }

    .subcontainer {
        aspect-ratio: 16 / 10;
        min-width: 32px;
        min-height: 32px;
        width: auto;
        background-color: #000A;
        border-radius: 4px;
        height: auto; 
        object-fit: contain; 
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
    }
    
</style>

<div class="border w-full h-full p-2 relative flex items-center justify-center">
    <div class="absolute top-2 right-2">
    <button class="btn btn-primary" on:click={add_user}>Add user</button>
    <button class="btn btn-error" on:click={remove_user}>Remove user</button>
    </div>
    <div class="border container grid-cols-2">
        {#each  users as user (user.id) }
            <div class="subcontainer">{user.name}</div>
        {/each}
    </div>
</div> -->
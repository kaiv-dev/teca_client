<script lang="ts">
  import { fly, slide } from 'svelte/transition';
  import Icon from '@iconify/svelte';
  import Avatar from '../user/avatar.svelte';
  import { USER_GUID } from '$lib/token.svelte';
  import { get_miniprofile, type MiniProfile } from '$lib/api/profile.svelte';
  import { onDestroy } from 'svelte';
  import { get } from 'svelte/store';
  import type { PublicRoomRecord } from '$lib/api/calls.svelte';

  let {
    room_record,
    onclick=(id: string):void=>{}
  } : {
    room_record: PublicRoomRecord,
    onclick?: (id: string) => void
  } = $props();

  // async function fetchMembers() {
  //   for (let member of members) {
  //     // let r = await get_miniprofile(member.id);
  //   } 
  // }



  let opened = $state(false);


  const toggle = () => {
    opened = !opened;
  };

  // const addAvatar = () => {
  //   const id = String(Date.now());
  //   members = [...members, { id, name: `Avatar ${members.length + 1}` }];
  // };

  // const removeAvatar = () => {
  //   if (members.length > 0) {
  //     members = members.slice(0, -1);
  //   }
  // };
  const fly_x = (node: any) => fly(node, {opacity: -1.0, x: -40, duration: 250 });
  const fly_y = (node: any) => fly(node, {opacity: -1.0, y: -40, duration: 250 });
  let guid = get(USER_GUID)
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="card-200 card-200-border p-0.5 relative" transition:fly_x>
   <button
    class="h-[38px] w-[32px] absolute right-0 flex items-center justify-center cursor-pointer no-focus"
    tabindex="-1"
    onclick={toggle}
  >
    <Icon
      icon="mdi:chevron-up"
      width="24"
      height="24"
      class="transition-transform hover:text-white active:border-0 hover:scale-130"
      style={opened ? '' : 'transform: rotate(-180deg)'}
    />
  </button>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="flex flex-row items-center max-h-[36px] h-[36px] overflow-hidden relative px-2 gap-2 mr-6 cursor-pointer no-focus"
    onclick={() => onclick(room_record.guid)}>
      {#if room_record.secure}
        <Icon class="min-w-[24px] p-[3px]  -translate-x-[1px]" icon="fa:lock" height=24px/>
      {:else}
        <Icon class="min-w-[24px]" icon="flowbite:volume-up-solid" height=24px/>
      {/if}
      <div class="flex-grow-[1000] text-ellipsis overflow-hidden font-bold">{room_record.name}</div>
      <div class="flex-grow-[1] flex-shrink h-full flex flex-row flex-wrap-reverse gap-y-4 p-0.5 gap-0.5 place-content-end oveflow-hidden">
        {#each Object.values(room_record.users) as users (users.guid)}
        {#if !opened}
            <div transition:fly_y|local >
              <Avatar class="w-8 h-8 hover:scale-105 transition-transform" mini url={{nickname: users.guid}} hover_profile={get(USER_GUID)}></Avatar>
            </div>
          {/if}
          {/each}
      </div>
  </div>
  {#if opened}
    <div transition:slide class="flex flex-col px-2 pb-2 gap-1">
        {#each Object.values(room_record.users) as users (users.guid)}
          <div transition:slide class="member">
          </div>
          {#if opened}
          <div in:fly_x|global  class="flex flex-row gap-1 items-center font-semibold">
            <Avatar class="w-8 h-8 hover:scale-105 transition-transform" mini url={{nickname: users.guid}} hover_profile={get(USER_GUID)}></Avatar>
            <div>{users.guid}</div>
          </div>
          {/if}
        {/each}
    </div>
  {/if}
</div>

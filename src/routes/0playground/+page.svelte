<script lang="ts">
  import Icon from "@iconify/svelte";


</script>



<style>
  .container {
    width: 64px;
    height: 32px;
    border: 1px solid black;
    border-radius: 32px;
    background: linear-gradient(135deg, #ff0080 30%, #ff8c00 50%, #40e0d0 70%);
    background-attachment: fixed;
    background-size: 100vw 100vh;
    background-repeat: no-repeat;
    background-position: 0 0;
    position: relative;
    background-origin: border-box;
    
  }
  .btn {
    height: 100%;
    width: 100%;
    background: white;
    mix-blend-mode: overlay;
  }


  /* layout from your snippet */
  .page {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
  }
  .bg-white {
    position: absolute;
    inset: 0;
    background: white;
    z-index: -10;
  }
</style>

<div class="page">
  <div class="bg-white"></div>
  <div class="container">
    <div class="btn">qq</div>
  </div>
  <div class="container">
    <div class="btn">bebra</div>
  </div>
</div>


<!-- <style>

.button-outer {
  border-radius: 100%;
  border: 2px solid oklch(70.7% 0.022 261.325);
  box-shadow: 0px 0px 5px oklch(70.7% 0.022 261.325);
  backdrop-filter: blur(2px);
  background: rgba(1,1,1,0.3);
  padding: 12px;
  /* overflow: clip; */
}

:global{
  .button-icon {
    filter: drop-shadow(0px 0px 2px rgba(0,0,0,0.9));
  }

.bg {
  
}

.gradient-layer {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg,
    #ff00ff00,
    #00ffff00
  );
  z-index: 0;
  pointer-events: none;
}


.gradient-mask {
  mix-blend-mode: overlay;
}

}
</style> -->

  <!-- <div class="border w-16 h-16 button-outer gradient-mask">
    <Icon icon="ic:round-mic" class="w-full h-full" />
  </div> -->

<!-- <div class="min-w-screen min-h-screen w-screen h-screen flex items-center justify-center">
  <img src="https://www.pixelstalk.net/wp-content/uploads/image12/A-night-scene-of-a-city-waterfront-4K-image-with-reflections-of-city-lights-dancing-on-the-water.jpg" alt="" class="absolute w-full h-full -z-10">
  
  <div class="gradient-layer"></div>
  <div class="border w-16 h-16 button-outer gradient-mask">
    <Icon icon="ic:round-mic" class="w-full h-full button-icon text-gray-400"/>
  </div>
  <div class="absolute top-0 w-64 h-64 bg-gray-300 gradient-mask"></div>
</div>
     -->
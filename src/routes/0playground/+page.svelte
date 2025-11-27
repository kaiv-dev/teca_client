<!--
Source - https://stackoverflow.com/a
Posted by Wei-jye, modified by community. See post 'Timeline' for change history
Retrieved 2025-11-27, License - CC BY-SA 4.0
-->

<div class="wrapper">
    <div class="header">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
    <div class="flexi-content-wrapper">
        <div class="flexi-content">
            <!-- some long contents here -->
             <div class="h-[10000px]"></div>
        </div>
    </div>
</div>
 

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding: 15px;
}

.header {
  font-size: 1.5em;
  font-weight: 700;
  margin: 10px 0;

}

.content {
 margin-bottom: 10px;
}

.flexi-content-wrapper {
  margin-top: 10px;
  flex: 1;
  position: relative;
}

.flexi-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid rgb(253, 140, 140);
  overflow: auto;
}

</style>
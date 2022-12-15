<template>
  <div class="px-5">
    <ShowCard /> 
    <div class="d-flex justify-content-end  mx-auto action-btn align-items-center"> 
      <AddEpisode /> 
      <ProgramUpdate /> 
    </div>
    <DisplayEpisode />
    <DisplayComments />
  </div>
</template>

<script>
// @ is an alias to /src
import ShowCard from '@/components/ShowCard.vue';
import AddEpisode from '@/components/AddEpisode.vue';
import ProgramUpdate from '@/components/ProgramUpdate.vue';
import DisplayEpisode from '@/components/DisplayEpisode.vue';
import DisplayComments from '@/components/DisplayComments.vue';
export default {
  name: 'ShowView',
  components: {
    ShowCard,
    AddEpisode,
    ProgramUpdate,
    DisplayEpisode,
    DisplayComments
  }       
}
</script>
<style scoped>
 .action-btn {
  max-width: 800px;
 }
</style>
<template>
  <div class="timeline__container">
    <div class="timeline__action-date">
      <button @click="addDate(-1)" class="timeline__action-date-btn">
        &lt;
      </button>
      <p>
        {{ nowDate.toLocaleDateString() }}
      </p>
      <button @click="addDate(1)" class="timeline__action-date-btn">
        &gt;
      </button>
    </div>
    <p>Часы</p>
    <div ref="timeline" class="timeline">
      <TimeLineHeader />
      <TimeLineBody :nowDate="nowDate"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide  } from "vue";
import { addDay } from '@/helpers/helpers'
import TimeLineBody from '@/components/TimeLine/TimeLineBody.vue'
import TimeLineHeader from '@/components/TimeLine/TimeLineHeader.vue'

const nowDate = ref(new Date());
const timeline = ref<HTMLDivElement | null>(null);
provide('timeline', timeline)

const addDate = (day: number) => {
  nowDate.value = addDay(nowDate.value ,day);
}

</script>

<style lang="scss">

.timeline {
  display: flex;
  flex-direction: column;
  overflow-x: auto;

  &__action-date {
    align-self: flex-start;
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;
    color: $blue;
    font-size: 24px;

    &-btn {
      padding: 0;
      background-color: transparent;
      border: none;
      color: $blue;
      font-size: 24px;
      cursor: pointer;
    }
  }

  &__container {
    display: flex;
    margin: 0 20px;
    flex-direction: column;
  }
}

.cell-w {
  min-width: 100px;
  border: 1px solid $Tertiary-disabled;
}

.cell-h-header {
  height: 100px;
}

</style>
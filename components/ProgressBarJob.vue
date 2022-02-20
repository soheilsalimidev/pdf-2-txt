<template>
  <div class="uploaded-file">
    <div class="upload-details">
      <div class="upload-time">
        <p class="text-font text-bold text-center" style="font-size: 1rem">
          {{
            kind === 'upload' ? personage === 100 ? 'اپلود به اتمام رسید. تنظیمات فایل خود را انتخاب کنید' : 'در حال اپلود...'
              : 'در حال انجام عملیات'
          }}
        </p>
        <p
          :class="personage === 100 && kind === 'upload' ? 'magictime slideUp' : ''"
          :style="personage === 100 && kind === 'upload' ? 'display:none' : ''"
          class="text-font text-light"
          style="font-size: .8rem; color: #757575;margin-top: .5em"
        >
          {{ personage }}% {{ kind === 'upload' ? `.  ${timeLeft}  ثانیه` : `${pageDone} صفحه از ${allPages}` }}
          <br>
          {{ kind === 'word' && personage === 90 ? 'در حال آماده سازی فایل' : '' }}
        </p>
      </div>

      <div class="btn-container ms-auto">
        <v-btn
          v-if="personage !== 100 && kind === 'upload'"
          class="ma-2"
          color="red"
          fab
          outlined
          x-small
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </div>
    <v-progress-linear
      :indeterminate="allPages === 0"
      :style="personage === 100 ? 'display:none' : ''"
      :value="personage"
      color="blue"
      style="margin-top: 1em;"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    kind: String as PropType<'upload' | 'wordOcr' | 'word'>,
    personage: [Number, String],
    timeLeft: Number,
    ocrThePdf: Function,
    allPages: Number,
    pageDone: Number
  },
  name: 'ProgressBarJob'
})
</script>

<style lang="scss" scoped>
.uploaded-file {
  display: flex;
  border-width: 2px;
  border-style: solid;
  border-color: #EEEEEE;
  border-radius: 15px;
  padding: 1em;
  flex-direction: column;
  width: 100%;
  margin-top: 2em;

  .upload-details {
    display: flex;
    flex-direction: row;
    width: 100%;

    .upload-time {
      display: flex;
      flex-direction: column;

      p {
        margin: 0;
      }
    }

  }

}
</style>

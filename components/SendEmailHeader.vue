<template>
  <section class="wrapper">
    <div class="content">
      <div class="title">
        <h2 class="text-font text-bold">
          شما در صف قرار گرفتید
        </h2>
      </div>
      <div class="section-sub">
        <p class="text-font text-light text-right">
          کار شما در صف انجام قرار گرفت.<br>
          {{ remain }} نفر جلوی شما هستند که این
          حدود {{ remain * 3 }} دقیقه زمان می برد
          می توانید در همین صفحه صبر کنید یا
        </p>
      </div>
      <div class="input-container">
        <v-text-field
          class="text-font"
          hint="وقتی کار تموم شد برام ایمیل بفرس"
          label="ایمیل"
          persistent-hint
          prepend-icon="mdi-email"
        />
        <v-btn
          class="text-font btn"
          color="primary"
          elevation="2"
        >
          برام ایمیل بفرست
        </v-btn>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'SendEmailHeader',
  props: {
    remain: Number
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    background: #fff;
    padding: 1em 1em;
    width: 100%;
    max-width: 500px;
    min-width: 200px;
    border-radius: 10px;
    text-align: center;

    .title {
      h2 {
        font-size: 2rem;
        margin-top: 0;
        letter-spacing: 0;
      }
    }

    .section-sub {
      margin-top: 1em;
      font-size: 1.2rem;
    }

    .btn {
      color: #fff;
      border: unset;
      margin-left: auto;
      margin-right: auto;
      margin-top: 1em;
      letter-spacing: 0;
    }

    @media screen and (max-width: 720px) {
      .content {
        margin-right: 20px !important;
        margin-left: 20px !important;
      }
      .input-container input {
        width: 200px;
        margin-bottom: 10px;
      }
    }
  }

}

</style>

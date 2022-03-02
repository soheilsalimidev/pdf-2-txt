<template>
  <section class="wrapper">
    <div class="content">
      <div class="title">
        <h2 class="text-font text-bold">
          کار شما به اتمام رسید
        </h2>
      </div>
      <div class="section-sub">
        <p class="text-font text-light text-right">
          اگر دانلود فایل هنوز شروع نشده
          <a :href="downloadLink" class="blue--text" style="text-decoration: none">اینجا کلیک</a>
          کنید.<br>
          با حمایت از این پرژه به پیشرفت ان کمک کنید
        </p>
      </div>
      <div class="input-container">
        <v-btn
          class="text-font btn"
          color="primary"
          elevation="2"
          @click="window.open('https://zarinp.al/soheilsalimi' , '_blank')"
        >
          حمایت کردن
        </v-btn>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'DonateComponent',
  props: {
    downloadLink: String
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

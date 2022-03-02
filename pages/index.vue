<template>
  <div>
    <header-s/>
    <div style="width: 100%;display: flex;align-items: center;justify-content: center">
      <v-alert
        border="left"
        class="text-font text-light alert"
        color="blue"
      >
        لطفا توجه کنید که تمام عملیات ها در کامپوتر شما انجام می شود و نیازی با آپلود فایل نیست.
        <br>
        در نتیجه کسی نیز به فایل شما دسترسی پیدا نمی کند.
      </v-alert>

    </div>
    <footer>
      <div class="footer text-font text-light">
        <small>ساخته شده با &#10084;&#65039; توسط <strong>سهیل سلیمی</strong></small>
      </div>
    </footer>
  </div>
</template>

<script>
import HeaderS from '../components/Header'

export default {
  name: 'IndexPage',
  components: {
    HeaderS
  },
  data () {
    return {
      socket: null
    }
  }
}
</script>

<style lang="scss">

footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 1.1rem;

  small {
    color: #000;
    letter-spacing: .025rem;
    margin-bottom: 1.5rem;
    display: block;
  }
}

.alert {
  width: 40%
}

@media screen and (max-width: 600px) {
  .alert {
    width: 95%;
  }
}

</style>

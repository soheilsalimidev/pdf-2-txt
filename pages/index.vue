<template>
  <div>
    <header-s/>
    <div style="width: 100%;display: flex;align-items: center;justify-content: center">
      <v-alert
        border="left"
        class="text-font text-light alert"
        color="blue"
      >
        <h3>
          شما می توانید فایل های pdf خود را به راحتی و بدون نیاز به آپلود تبدیل به ورد کنید.
        </h3>

        <br/>
        <b class="text-font text-bold"> چطوری؟؟</b>
        <br/>
        <h5>
          خیلی ساده با استفاده از هوش مصنوعی OCR
          OCR مخفف Optical Character Recognition هست.
          این هوش مصنوعی (Tesseract) که از سال 1980 تا الان در حال توسعه هست و دقت بالایی داره
          ما براتون سایتی را آماده کردم که خیلی راحت بتونید pdf هاتون یا عکس هاتون را راحت با
          این هوش مصنوعی تبدیل به ورد یا متن بکنید :)
        </h5>
      </v-alert>

    </div>
    <footer>
      <div class="footer text-font text-light">
        <small>ساخته شده با &#10084;&#65039; توسط <strong>سهیل سلیمی</strong> در <a
          href="https://github.com/soheilsalimidev/pdf-2-txt" style="text-decoration: none" target="_blank"
        >گیت هاب</a></small>
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

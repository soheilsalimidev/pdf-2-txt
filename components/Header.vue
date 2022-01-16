<template>
  <div class="headerContainer">
    <div class="headerMenuContainer">
      <div class="logo-menu">
        <div class="logo">
          <v-img :src="require('@/static/icon.png')" width="50"/>
        </div>
        <ul>
          <li class="text-font text-bold">خانه</li>
          <li class="text-font text-medium">چگونه</li>
          <li class="text-font text-medium">کجا</li>
        </ul>
      </div>
      <v-btn
        class="text-font text-bold btn"
        color="#09915A"
        elevation="5"
        light
      >
        حمایت کردن
      </v-btn>
    </div>
    <div ref="bodyHeader" class="headerBodyContainer" @mousemove="moving">
      <div style="align-self: baseline;">
        <div v-for="(po,index) in btnPo" :key="index" class="img-small">
          <v-img
            :src="po.image"
            :style="`top: ${po.topNew}px; right: ${po.leftNew}px`"
            height="30"
            width="30"
          />
        </div>
      </div>

      <h1 class="text-font text-center text-black">
        ،هر نوع پی دی اف ی را که دارید
        <br>
        می توانید به ورد تبدیل کنید
      </h1>
      <h4 class="text-font text-center"> OCR با استفاده از هوش مصنوعی و تنکولوژی </h4>

      <v-card
        class="send-card"
        elevation="3"
      >

        <div class="upload-box" @click="$refs.file.click()" @dragleave="dragleave"
             @dragover="dragover" @drop="drop"
        >

          <input id="assetsFieldHandle" ref="file" name="fields[assetsFieldHandle][]"
                 style="display: none" type="file" @change="onChange"
          />
          <div ref="lottieDiv" style="height: 10em"></div>
          <div>
            <label class="text-font text-bold " for="assetsFieldHandle">
              فایل خود را اینجا رها کنید
              <br>
              یا <span class="blue--text">اینجا کلیک کنید</span> تا فایل خود را انتخاب کنید
            </label>
            <h4 class="text-font text-center" style="font-size: .8rem">.png .jpg .pdf پشتیبانی از فرمت های </h4>
          </div>
        </div>

        <div :class="showFile ? 'magictime swashIn' : ''" :style="showFile ? '' : 'display: none;'"
             class="uploaded-file"
        >
          <div class="upload-details">
            <div class="upload-time">
              <p class="text-font text-bold text-center" style="font-size: 1rem">
                {{
                  uploadPersonage === 100 ? 'اپلود به اتمام رسید. تنظیمات فایل خود را انتخاب کنید' : 'در حال اپلود...'
                }}
              </p>
              <p :class="uploadPersonage === 100 ? 'magictime slideUp' : ''"
                 :style="uploadPersonage === 100 ? 'display:none' : ''" class="text-font text-light"
                 style="font-size: .8rem; color: #757575;margin-top: .5em"
              >
                {{ uploadPersonage }}% . {{ timeLeft }}ثانیه
              </p>
            </div>
            <div class="btn-container ms-auto">
              <v-btn
                v-if="uploadPersonage !== 100"
                class="ma-2"
                color="red"
                fab
                outlined
                x-small
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <div ref="finishedLottie" style="width: 50px;height: 50px"></div>
            </div>
          </div>


          <v-progress-linear
            :style="uploadPersonage === 100 ? 'display:none' : ''"
            :value="uploadPersonage"
            color="blue"
            stream
            style="margin-top: 1em;"
          ></v-progress-linear>

          <v-row :class="uploadPersonage === 100 ? 'magictime puffIn' : ''"
                 :style="uploadPersonage !== 100 ? 'display:none' : ''"
          >

            <v-col md="6" sm="12" style="padding: 0 2em;margin: 0">
              <v-select
                :items="['فارسی','عربی','انگلیسی']"
                chips
                class="text-font"
                deletable-chips
                hint="توجه کنید که اولیوت زبان ها اهمیت دارد!"
                label="زبان های استفاده شده در فایل"
                multiple
                persistent-hint
                style="margin: 0"
              >
              </v-select>
            </v-col>

            <v-col md="6" sm="12" style="padding: 0 2em;margin: 0">
              <v-radio-group v-model="output">
                <template v-slot:label>
                  <div class="text-font text-bold text-large text-right">کدام خروجی را نیاز دارید</div>
                </template>
                <v-radio value="word">
                  <template v-slot:label>
                    <div class="text-font text-light text-right">تبدیل به ورد <strong class="success--text">دقت پایین
                      تر</strong></div>
                  </template>
                </v-radio>
                <v-radio value="pdf">
                  <template v-slot:label>
                    <div class="text-font text-light text-right"> تبدیل به پی دی اف قابل جستوجو <strong
                      class="primary--text"
                    >بدون خطا</strong></div>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>

          </v-row>

        </div>


      </v-card>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import lottie from 'lottie-web'

export default Vue.extend({
  name: 'HeaderS',
  data () {
    let self = this
    return {
      btnPo: [
        {
          image: require('@/static/icon.png'),
          top: 0,
          left: self.percent(15),
          topNew: 0,
          leftNew: self.percent(15),

        },
        {
          image: require('@/static/icon.png'),
          top: 60,
          left: self.percent(2),
          topNew: 60,
          leftNew: self.percent(2),

        },
        {
          image: require('@/static/icon.png'),
          top: 400,
          left: self.percent(8),
          topNew: 400,
          leftNew: self.percent(8),

        },
        {
          image: require('@/static/icon.png'),
          top: 380,
          left: self.percent(25),
          topNew: 380,
          leftNew: self.percent(25),
        },
        {
          image: require('@/static/icon.png'),
          top: 50,
          left: self.percent(30),
          topNew: 50,
          leftNew: self.percent(30),
        },
        {
          image: require('@/static/icon.png'),
          top: 20,
          left: self.percent(80),
          topNew: 20,
          leftNew: self.percent(80),
        },
        {
          image: require('@/static/icon.png'),
          top: 400,
          left: self.percent(90),
          topNew: 400,
          leftNew: self.percent(90),
        },
        {
          image: require('@/static/icon.png'),
          top: 400,
          left: self.percent(50),
          topNew: 400,
          leftNew: self.percent(50),
        },
      ],
      filelist: [],
      showFile: false,
      uploadPersonage: 0,
      timeLeft: 0,
      output: false
    }
  },
  mounted () {
    this.$vuetify.rtl = true
    lottie.loadAnimation({
      container: this.$refs.lottieDiv,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('@/assets/lottie/scan.json')
    })
  },
  methods: {
    moving ($event) {
      for (let i = 0; i < this.btnPo.length; i++) {
        this.btnPo[i].topNew = this.btnPo[i].top - $event.pageY / 40
        this.btnPo[i].leftNew = this.btnPo[i].left - $event.pageX / 40
      }
      this.$forceUpdate()
    },
    percent (per) {
      if (process.browser) {
        return (window.innerWidth * per) / 100
      }
    },
    onChange () {
      this.filelist = this.$refs.file.files
      this.showFile = true
      setTimeout(() => {
        this.uploadPersonage = 100
        lottie.loadAnimation({
          container: this.$refs.finishedLottie,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          animationData: require(`@/assets/lottie/finished.json`)
        }).show()
      }, 3000)

    },
    remove (i) {
      this.filelist.splice(i, 1)
    },
    dragover (event) {
      event.preventDefault()
      if (!event.currentTarget.classList.contains('active-on-drag')) {
        event.currentTarget.classList.add('active-on-drag')
      }
    },
    dragleave (event) {
      event.currentTarget.classList.remove('active-on-drag')
    },
    drop (event) {
      event.preventDefault()
      this.$refs.file.files = event.dataTransfer.files
      this.onChange()
      event.currentTarget.classList.remove('active-on-drag')
    }
  }
})
</script>

<style lang="scss" scoped>
.headerContainer {
  .headerMenuContainer {
    direction: rtl;
    display: flex;
    flex-direction: row;

    .btn {
      color: #fff;
      margin: 2em auto 2em 2em;
      letter-spacing: 0;
    }

    .logo-menu {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .logo {
        margin-right: 2em;
      }

      ul {
        margin-right: 2em;

        li {
          margin-right: 1.5em;
          display: inline-block;
        }
      }
    }
  }

  .headerBodyContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-top: 4em;

    .send-card {
      padding: 1em 2em;
      width: 60%;
      height: auto;
      margin: 2em auto 3em;
      left: 0;
      right: 0;
      text-align: center;
      border-radius: 15px;

      .active-on-drag {
        background-color: rgba(175, 203, 236, 0.6);
        border-color: rgba(175, 203, 236);
        transition: background-color ease-in-out .5s, border-color ease-in-out .5s;
      }

      .upload-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 17em;
        border-style: dashed;
        border-width: 2px;
        border-radius: 10px;
        border-color: #BDBDBD;
        transition: background-color ease-in-out .5s, border-color ease-in-out .5s;

        label {
          font-size: 1.2rem;
        }

      }

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

    }

    .img-small {
      position: absolute;
    }

    h4 {
      margin-top: 1em;
      font-size: 1.2rem;
      font-weight: 400;
    }

  }
}
</style>

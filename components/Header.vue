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
        v-if="isCardDisplay"
        :class="isConnected ? 'magictime vanishOut' : ''"
      >

        <div v-if="filelist.length === 0" class="upload-box" @click="$refs.file.click()" @dragleave="dragleave"
             @dragover="dragover" @drop="drop"
        >

          <input id="assetsFieldHandle" ref="file" accept="image/png, image/jpeg , application/pdf"
                 name="fields[assetsFieldHandle][]"
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
        <div v-else-if="imgUrl" class="upload-box">
          <v-img :src="imgUrl" style="border-radius: 15px;max-height: 17em; max-width: 100%"></v-img>
        </div>

        <div :class="showSetting ? 'magictime swashIn' : ''" :style="showSetting ? '' : 'display: none;'"
             class="uploaded-file"
        >
          <v-form
            ref="form"
            lazy-validation
          >
            <v-row>
              <v-col md="1">
                <div ref="finishedLottie" style="width: 50px;height: 50px"
                     @click="startTheAction"
                ></div>
              </v-col>
              <v-col md="5" sm="12" style="padding: 0 2em;margin: 0">
                <v-select
                  v-model="lang"
                  :items="langArray"
                  :rules="rules.select"
                  chips
                  class="text-font"
                  deletable-chips
                  hint="توجه کنید که اولیوت زبان ها اهمیت دارد!"
                  item-text="name"
                  item-value="lang"
                  label="زبان های استفاده شده در فایل"
                  multiple
                  persistent-hint
                  style="margin: 0"
                >
                </v-select>
              </v-col>

              <v-col md="6" sm="12" style="padding: 0 2em;margin: 0">
                <v-radio-group v-model="output" :rules="rules.select">
                  <template v-slot:label>
                    <div class="text-font text-bold text-large text-right">کدام خروجی را نیاز دارید</div>
                  </template>
                  <v-radio disabled value="word">
                    <template v-slot:label>
                      <div class="text-font text-light text-right">تبدیل به ورد <strong class="success--text">برای فایل
                        هایی که از عکس نیستند</strong></div>
                    </template>
                  </v-radio>
                  <v-radio value="wordOcr">
                    <template v-slot:label>
                      <div class="text-font text-light text-right">تبدیل به متن <strong class="success--text">با استفاده
                        از تکنولژی ocr</strong></div>
                    </template>
                  </v-radio>
                  <v-radio disabled value="pdf">
                    <template v-slot:label>
                      <div class="text-font text-light text-right"> تبدیل به پی دی اف قابل جستوجو با تکنلوژی ocr <strong
                        class="primary--text"
                      >بدون خطا</strong></div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>

            </v-row>
          </v-form>
        </div>

        <div :class="start ? 'magictime swashIn' : ''" :style="start ? '' : 'display: none;'">
          <ProgressBarJob :all-pages="allPages" :page-done="finishedPages" :personage="personage" kind="local"
          ></ProgressBarJob>
        </div>

      </v-card>
      <v-card
        v-if="!isCardDisplay"
        :class="!isCardDisplay ? 'magictime vanishIn' : ''"
        class="waiting-card"
        elevation="3"
      >
        <send-email-header v-if="remain !== 0" :remain="remain"></send-email-header>
        <div v-else>
          <p v-if="!finished" class="text-font">
            کار شما در حال انجام است<br>
            این کار بسته به نوع فایل و تعداد صفحات از 1 تا 3 دقیقه زمان میبرد
          </p>
          <donate v-else></donate>
        </div>

      </v-card>

    </div>
    <v-dialog
      v-model="finished"
      scrollable
      width="700"
      @click:outside="copy"
    >
      <v-card>
        <v-card-title class="text-font text-bold">
          عملیات با موفقیت انجام شد
        </v-card-title>

        <v-card-text class="text-font text-light">
          <v-textarea
            :value="result"
            auto-grow
          >
          </v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="text-font"
            color="primary"
            text
            @click="copy"
          >
            کپی کردن
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      timeout="3000"
    >
      <p class="text-font">
        متن با موفیقت کپی شد
      </p>
      <template v-slot:action="{ attrs }">
        <v-btn
          class="text-font"
          color="pink"
          text
          v-bind="attrs"
        >
          بستن
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Vue from 'vue'
import lottie from 'lottie-web'
import io from 'socket.io/client-dist/socket.io'
import SendEmailHeader from './SendEmailHeader'
import Donate from './Donate'
import { createScheduler, createWorker } from 'tesseract.js'
import ProgressBarJob from './ProgressBarJob'

export default Vue.extend({
  name: 'HeaderS',
  components: {
    ProgressBarJob,
    SendEmailHeader,
    Donate
  },
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
      imgUrl: '',
      snackbar: false,
      showSetting: false,
      personage: 0,
      bufferPersonage: 0,
      timeLeft: 0,
      output: false,
      socket: null,
      savedFileName: '',
      isConnected: false,
      isCardDisplay: true,
      remain: 0,
      lang: [],
      langArray: [{
        name: 'فارسی',
        lang: 'fas'
      }, {
        name: 'انگلیسی',
        lang: 'eng'
      }, {
        name: 'عربی',
        lang: 'ara'
      }],
      start: false,
      finished: false,
      finishedPages: 0,
      allPages: 0,
      result: '',
      rules: {
        select: [(v) => Boolean(Object.keys(v || {})[0]) || 'زبان مورد نظر خود را انتخاب کنید!!!'],
        radio: [(v) => !!v || 'حالت مورد نظر خود را انتخاب کنید!!!'],
      }
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
    async onChange () {
      this.filelist = this.$refs.file.files[0]
      this.showSetting = true
      if (this.filelist.type === 'image/png' || this.filelist.type === 'image/jpeg') {
        this.imgUrl = URL.createObjectURL(this.filelist)
      }
      lottie.loadAnimation({
        container: this.$refs.finishedLottie,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: require(`@/assets/lottie/finished.json`)
      }).show()
    },
    upload () {
      const form = new FormData
      form.append('file', this.filelist)

      setInterval(() => this.timeLeft += 1, 1000)

      this.$axios.$post('/upload/file', form, {
        onUploadProgress: progressEvent => this.personage = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
      }).then(value => {
        if (value.fileName) {
          this.savedFileName = value.fileName
        } else {

        }
      })
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
    },
    async startTheAction () {

      if (this.$refs.form.validate()) {
        switch (this.output) {
          case 'wordOcr':
            return this.ocrLocal()
        }
      }

    },
    async ocrLocal () {

      this.showSetting = false
      this.start = true

      const pdfjsLib = require('pdfjs-dist/legacy/build/pdf')
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.12.313/legacy/build/pdf.worker.min.js'

      const scheduler = createScheduler()

      if (this.filelist.type === 'application/pdf') {
        try {
          for (let j of Array(5).fill(0)) {

            const worker1 = createWorker()
            await worker1.load()
            await worker1.loadLanguage(this.lang.join('+'))
            await worker1.initialize(this.lang.join('+'))
            scheduler.addWorker(worker1)
          }
        } catch (e) {
          console.log(e)
        }
        pdfjsLib.getDocument(URL.createObjectURL(this.filelist)).promise.then(async value => {
          this.allPages = value.numPages
          const ocrResult = Array(value.numPages - 1)
          for (let i = 1; i <= value.numPages; i++) {
            value.getPage(i).then(page => {
              const viewport = page.getViewport({ scale: 1 })
              const canvas = document.createElement('canvas')
              const ctx = canvas.getContext('2d')
              const renderContext = {
                canvasContext: ctx,
                viewport: viewport
              }
              canvas.height = viewport.height
              canvas.width = viewport.width
              page.render(renderContext).promise.then(async () => {
                const { data: { text } } = await scheduler.addJob('recognize', canvas)
                ocrResult[i - 1] = text
                this.finishedPages++
                this.personage = (this.finishedPages * 100) / value.numPages
                if (this.finishedPages === value.numPages) {
                  this.result = ocrResult.join('\n')
                  this.finished = true
                  await scheduler.terminate()
                }
              })
            })
          }
        })
      } else {
        const worker1 = createWorker()
        await worker1.load()
        await worker1.loadLanguage(this.lang.join('+'))
        await worker1.initialize(this.lang.join('+'))
        const { data: { text } } = await worker1.recognize(this.imgUrl)
        this.result = text
        this.finished = true
        await worker1.terminate()
      }
    },
    async ocrServer () {
      await this.$axios.$post(`/ocr/${this.savedFileName}`, {}, { params: { lang: 'fas' } })
      this.socket = io()

      this.socket.emit('addJob', {
        savedFileName: this.savedFileName,
        lang: this.lang.join('+'),
        output: this.output
      })

      this.socket.on('status', (mgs) => this.remain = mgs)
      this.socket.on('result', (mgs) => {
        const element = document.createElement('a')
        element.setAttribute('href', window.location.origin + '/uploads/pdfs/' + mgs)
        element.setAttribute('download', 'pdf file')

        element.style.display = 'none'

        document.body.appendChild(element)

        element.click()
        document.body.removeChild(element)
      })
      this.isConnected = true
      setTimeout(() => {
        this.isCardDisplay = false
      }, 100)
    },
    async copy () {
      await navigator.clipboard.writeText(this.result)
      this.snackbar = true
      this.filelist = []
      this.showSetting = false
      this.personage = 0
      this.bufferPersonage = 0
      this.timeLeft = 0
      this.output = false
      this.socket = null
      this.savedFileName = ''
      this.isConnected = false
      this.isCardDisplay = true
      this.remain = 0
      this.lang = []
      this.start = false
      this.finished = false
      this.finishedPages = 0
      this.allPages = 0
      this.result = ''
      this.imgUrl = ''
      lottie.loadAnimation({
        container: this.$refs.lottieDiv,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: require('@/assets/lottie/scan.json')
      })
    }
  },
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

    .waiting-card {
      padding: 1em 2em;
      width: 40%;
      height: auto;
      margin: 2em auto 3em;
      left: 0;
      right: 0;
      text-align: center;
      border-radius: 15px;

      .queue {
        display: flex;
      }

    }

  }
}
</style>

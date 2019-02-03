<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card>
      <v-card-title>
        <span class="headline">Надішліть ваш відгук, зауваження або пропозицію</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Ваше ім'я" required v-model="name" :rules="nameRules"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Email" v-model="mail" required :rules="mailRules"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea label="Ваше повідомлення" v-model="message" auto-grow></v-textarea>
            </v-flex>
            <v-flex>
              <input
                type="file"
                id="files"
                class="inputfile"
                ref="file"
                v-on:change="handleFilesUpload()"
                data-multiple-caption="{count} files selected"
                multiple
              >
              <label for="files">
                <v-icon>attach_file</v-icon>
                <span v-if="file==null" class="subheading">Прикріпити файл</span>
                <span v-if="file!=null">{{file.name}}</span>
              </label>
              <v-icon v-if="file != null" @click="file=null" color="red">clear</v-icon>
            </v-flex>
            <v-alert
              v-if="alert"
              v-model="alert"
              dismissible
              outline
              type="error"
              class="noMargin"
            >Будь-ласка, перевірте правильність даних</v-alert>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="blue darken-1" flat v-on:click="dialogClose">Скасувати</v-btn>
        <v-btn color="blue darken-1" flat v-on:click="submit">Надіслати</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template> 

<script>
import api from "@/api";
import { TELEGRAM_CHAT_ID } from "@/constants/Const";
import { transliterate } from "inflected";

export default {
  name: "Feedback",
  props: {
    dialog: Boolean
  },
  data() {
    return {
      valid: true,
      file: null,
      name: "",
      mail: "",
      message: "",
      alert: false,
      nameRules: [v => !!v || "Потрібно ввести ім`я"],
      mailRules: [
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail введено не коректно"
      ],
      TELEGRAM_CHAT_ID
    };
  },
  computed: {
    token() {
      return this.$store.state.auth.jwt;
    }
  },
  methods: {
    dialogClose() {
      this.$emit("closeDialog");
      this.$refs.form.reset();
    },
    handleFilesUpload() {
      this.file = this.$refs.file.files[0];
    },
    submit() {
      this.alert = false;
      if (this.$refs.form.validate()) {
        let formData = new FormData();
        formData.append("author", this.name);
        formData.append("mail", this.mail);
        formData.append("text", this.message);
        if (this.file != null) {
          let fileName = transliterate(this.$refs.file.files[0].name);
          formData.append("attachment", this.file, fileName);
        }
        formData.append("unread", true);
        api.reviews
          .sendReview(formData, this.token)
          .then(response => {
            // eslint-disable-next-line
            console.log(response);
          })
          .catch(error => {
            // eslint-disable-next-line
            console.log(error.response);
            if (error.response.status == 401) {
              this.$router.push({ name: "Empty" });
            }
          });
        let message = `Новый отзыв на сайте! \nИмя: ${this.name}\nE-mail: ${
          this.mail
        }\nСообщение: ${this.message}`;
        api.reviews.sendTelegramMessage(TELEGRAM_CHAT_ID, message);
        if (this.file != null) {
          let payload = new FormData();
          payload.append("chat_id", 377890546);
          payload.append("document", this.file);
          api.reviews
            .sendTelegramDocument(payload)
            .then(function(response) {
              // eslint-disable-next-line
              console.log(response);
            })
            .catch(function(error) {
              // eslint-disable-next-line
              console.log(error);
            });
        }
        this.$emit("closeDialog");
        this.$refs.form.reset();
      } else {
        this.alert = true;
      }
      this.file = null;
    }
  }
};
</script>

<style scoped>
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.noMargin {
  margin: 0;
  width: 100%;
  border-radius: 10px;
}
</style>

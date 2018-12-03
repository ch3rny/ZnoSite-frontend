<template>
  <v-container grid-list-md>
    <div>
      <p class="title font-weight-medium">Мої добірки</p>
    </div>
    <v-layout wrap>
      <v-flex xs12 sm6>
        <v-text-field v-model="searchBundle" label="Пошук" prepend-icon="search" clearable/>
      </v-flex>
      <v-flex xs12>
        <v-subheader>Мої</v-subheader>
        <v-layout row wrap>
          <v-flex
            xs6
            sm4
            md3
            v-for="(bundle, index) in myBundles"
            :key="bundle.key"
            v-show="bundle.name.indexOf(searchBundle)>=0"
          >
            <v-card v-show="index<=max">
              <router-link
                :to="{ name: 'TestSolving', params: { mode: 'bundle', tasks: bundle.tasks}}"
              >
                <v-img
                  class="white--text"
                  height="150px"
                  gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                  :src="getBundleCover(bundle.cover)"
                >
                  <v-container fill-height fluid>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">{{bundle.name}}</span>
                        <br>
                        <span>К-сть завдань: {{bundle.tasks.length}}</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </router-link>
              <v-card-actions>
                <v-spacer/>
                <v-btn icon>
                  <v-icon>share</v-icon>
                </v-btn>
                <v-btn icon :to="{ name: 'BundleEdit', params: { id: bundle.id} }">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn icon @click="goToRemoveDialog(bundle, index)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        <v-btn v-if="max < myBundles.length" flat small @click="max=myBundles.length">Показати всі</v-btn>
      </v-flex>
      <v-dialog v-model="removeDialog" max-width="300px">
        <v-card>
          <v-card-title
            class="headline text-xs-center"
          >Ви дійсно бажаєте видалити "{{activeBundle.name}}"?</v-card-title>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" flat="flat" @click="removeDialog = false">Відхилити</v-btn>
            <v-btn color="red darken-1" flat="flat" @click="deleteBundle(activeBundle.id)">Видалити</v-btn>
            <v-spacer/>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="createDialog" max-width="300px">
        <v-card>
          <v-card-title class="headline text-xs-center">
            <span>Введіть назву</span>
            <v-text-field
              autofocus
              v-model.trim="newBundleName"
              clearable
              @keyup.enter="createBundle()"
            ></v-text-field>
          </v-card-title>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="red darken-1" flat="flat" @click="createDialog = false">Відхилити</v-btn>
            <v-btn color="primary" flat="flat" @click="createBundle()">Створити</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- <v-flex xs12>
        <v-subheader>Доступні мені</v-subheader>
        <v-flex xs6 sm4 md3>
          <v-card>
            <v-img class="white--text" height="200px" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)" src="https://school12.net/img/site/3-min.png">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">{{myBundles}}</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>favorite</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-flex>-->
    </v-layout>
    <v-fab-transition>
      <v-btn color="primary" dark fixed bottom right round large @click="createDialog=true">
        <v-icon>add</v-icon>
        <span>Створити</span>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>


<script>
import api from "@/api";
import { ROOT_URL, BUNDLE_DEFAULT_COVER } from "@/constants/Const";
export default {
  data() {
    return {
      myBundles: [],
      sharedBundles: [],
      ROOT_URL,
      BUNDLE_DEFAULT_COVER,
      max: 8,
      activeBundle: {},
      removeDialog: false,
      createDialog: false,
      shareDialog: false,
      index: "",
      searchBundle: "",
      newBundleName: "Нова добірка"
    };
  },
  computed: {
    userId() {
      return this.$store.state.auth.user.pk;
    }
  },
  methods: {
    getBundleCover: cover =>
      cover == null ? BUNDLE_DEFAULT_COVER : ROOT_URL + cover,
    goToRemoveDialog(bundle, index) {
      this.activeBundle = bundle;
      this.removeDialog = true;
      this.index = index;
    },
    deleteBundle(id) {
      api.bundles.deleteBundle(id);
      this.myBundles.splice(this.index, 1);
      this.removeDialog = false;
    },
    createBundle() {
      const payload = {
        name: this.newBundleName,
        author_id: this.userId
      };
      api.bundles
        .createBundle(payload)
        .then(response => {
          // eslint-disable-next-line
          console.log(response);
          this.myBundles.splice(0, 0, response.data);
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error.response);
        });
      this.createDialog = false;
    }
  },
  mounted() {
    api.bundles
      .getUserBundles(this.userId)
      .then(res => (this.myBundles = res.data));
    //let shared = "?shared=" + this.userId + "&author_id!=" + this.userId;
    //axios.get(url + shared).then(res => (this.sharedBundles = res.data));
  }
};
</script>
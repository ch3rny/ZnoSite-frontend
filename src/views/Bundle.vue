<template>
  <v-container grid-list-md>
    <v-layout wrap>
      <v-flex xs12 sm6>
        <v-text-field v-model="searchBundle" label="Пошук" prepend-icon="search" clearable/>
      </v-flex>
      <v-flex xs12>
        <div class="d-inline-flex">
          <p class="title font-weight-medium">Мої добірки</p>
          <v-spacer></v-spacer>
          <v-menu bottom left icon>
            <v-btn slot="activator" flat icon>
              <v-icon>sort</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="(item, i) in sortList" :key="i" @click="sortArray(item.prop)">
                <v-list-tile-title>{{ item.title}}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-btn flat icon @click="reverseArray()">
            <v-icon v-if="isReversed">arrow_downward</v-icon>
            <v-icon v-else>arrow_upward</v-icon>
          </v-btn>
        </div>

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
              <router-link :to="{ name: 'BundleSolving', params: { id: bundle.id}}">
                <v-img
                  class="white--text"
                  height="150px"
                  gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                  :src="bundle.cover"
                >
                  <v-container fill-height fluid>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">{{bundle.name}}</span>
                        <br>
                        <span>К-сть завдань: {{bundle.tasks.length}}</span>
                        <br>
                        <span>{{bundle.created_date}}</span>
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
import { ROOT_URL } from "@/constants/Const";
export default {
  data() {
    return {
      myBundles: [],
      sharedBundles: [],
      ROOT_URL,
      max: 8,
      activeBundle: {},
      removeDialog: false,
      createDialog: false,
      shareDialog: false,
      index: "",
      searchBundle: "",
      newBundleName: "Нова добірка",
      sortList: [
        { title: "за назвою", prop: "name" },
        { title: "за датою створення", prop: "created_date" },
        { title: "за останніми змінами", prop: "edited_date" },
        { title: "за кількістю завдань", prop: "tasks" }
      ],
      isReversed: false
    };
  },
  computed: {
    userId() {
      return this.$store.state.auth.user.pk;
    }
  },
  methods: {
    goToRemoveDialog(bundle, index) {
      this.activeBundle = bundle;
      this.removeDialog = true;
      this.index = index;
    },
    deleteBundle(id) {
      api.bundles.deleteBundle(id).then(this.myBundles.splice(this.index, 1));
      this.removeDialog = false;
    },
    createBundle() {
      const payload = {
        name: this.newBundleName,
        author_id: this.userId
      };
      api.bundles.createBundle(payload).then(response => {
        this.myBundles.splice(0, 0, response.data);
      });
      this.createDialog = false;
    },
    reverseArray() {
      this.myBundles = this.myBundles.reverse();
      this.isReversed = !this.isReversed;
    },
    sortArray(prop) {
      //console.log(prop);
      switch (prop) {
        case "name":
        case "created_date":
        case "edited_date":
          this.myBundles = this.myBundles.sort((a, b) =>
            a[prop] > b[prop] ? 1 : b[prop] > a[prop] ? -1 : 0
          );
          break;
        case "tasks":
          this.myBundles = this.myBundles.sort((a, b) =>
            a[prop].length > b[prop].length
              ? 1
              : b[prop].length > a[prop].length
              ? -1
              : 0
          );
      }
    }
  },
  mounted() {
    api.bundles.getUserBundles(this.userId).then(
      res =>
        (this.myBundles = res.data.map(item => ({
          ...item,
          cover: ROOT_URL + item.cover
        })))
    );
    //let shared = "?shared=" + this.userId + "&author_id!=" + this.userId;
    //axios.get(url + shared).then(res => (this.sharedBundles = res.data));
  }
};
</script>
<style scoped>
.title {
  margin-top: 16px;
  margin-bottom: 0;
}
</style>

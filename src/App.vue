<template>
  <v-app>
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
      :stateless="dialog"
    >
      <v-list>
        <v-list-tile class="hidden-lg-and-up menu" color="red">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title v-text="title"></v-toolbar-title>
        </v-list-tile>
        <v-divider class="hidden-lg-and-up"></v-divider>
        <v-list-tile value="true" v-for="(item, i) in items" :key="i" :to="{name: item.route }">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider inset></v-divider>
        <v-dialog v-if="drawer" v-model="dialog" max-width="500px">
          <v-list-tile value="true" slot="activator">
            <v-list-tile-action>
              <v-icon color="grey darken-1">feedback</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Зворотний зв’язок</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <feedback @closeDialog="dialog = false"/>
        </v-dialog>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      height="56px"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      fixed
      color="primary"
      dark
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">{{title}}</router-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-title v-if="this.$route.name=='ZnoSolving'">
        <v-icon>access_time</v-icon>
        <span v-show="$vuetify.breakpoint.mdAndUp">Часу залишилося:</span>
        <span>{{timeLeft}}</span>
        <span>хв</span>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn v-if="!isLogged" flat large color="white" @click="login()">УВІЙТИ</v-btn>
        <v-menu v-else bottom left attach nudge-bottom="4">
          <v-avatar slot="activator">
            <img :src="avatar" alt="avatar">
          </v-avatar>
          <user-panel/>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container class="wrapper">
        <router-view/>
      </v-container>
    </v-content>
    <!--     <v-footer app>
      <span>this is footer</span>
    </v-footer>-->
  </v-app>
</template>

<script>
import menu from "@/constants/Menu";
import Feedback from "@/components/Feedback.vue";
import UserPanel from "@/components/UserPanel";

export default {
  name: "App",
  components: {
    Feedback,
    UserPanel
  },
  data() {
    return {
      drawer: null,
      items: menu,
      title: "Easy__Physic",
      dialog: false
    };
  },
  computed: {
    timeLeft() {
      return this.$store.state.znoTimer.timeLeft;
    },
    isLogged() {
      return this.$store.state.auth.user != null;
    },
    avatar() {
      return this.$store.state.auth.avatar;
    }
  },
  methods: {
    login() {
      this.$store.dispatch("auth/login");
    }
  },
  created() {
    if (this.isLogged) {
      this.$store.dispatch("auth/inspectToken");
    }
    setInterval(() => this.$store.dispatch("auth/inspectToken"), 280000);
    console.log("fdfdfdf", this.avatar);
  }
};
</script>
<style scoped>
.wrapper {
  padding-left: 6px;
  padding-right: 6px;
}
.v-btn {
  text-transform: none;
}
.menu {
  margin-left: -16px;
}
</style>

<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <h3 class="display-3">Вітаємо на сайті Easy__Physic</h3>
        <span class="subheading">Тут ви маєте можливість підготуватися до ЗНО з фізики</span>
        <v-divider class="my-3"/>
        <div class="title mb-3">Оберіть дію:</div>
      </v-flex>
      <v-flex xs6 sm4 md3>
        <v-card :to="{ name: 'Sampling'}">
          <v-img src="https://znofiles.000webhostapp.com/img/1-min.png" height="150px"/>
          <v-card-title primary-title>
            <div>
              <h3 class="subheading">Створити вибірку</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs6 sm4 md3>
        <v-card :to="{ name: 'Zno'}">
          <v-img src="https://znofiles.000webhostapp.com/img/2-min.png" height="150px"/>
          <v-card-title primary-title>
            <div>
              <h3 class="subheading">Пройти тест ЗНО</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs6 sm4 md3>
        <v-card :to="{ name: 'Books'}">
          <v-img src="https://znofiles.000webhostapp.com/img/3-min.png" height="150px"/>
          <v-card-title primary-title>
            <div>
              <h3 class="subheading">Довідник</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs6 sm4 md3>
        <v-card :to="{ name: 'Info'}">
          <v-img src="https://znofiles.000webhostapp.com/img/4-min.png" height="150px"/>
          <v-card-title primary-title>
            <div>
              <h3 class="subheading">Про сайт</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
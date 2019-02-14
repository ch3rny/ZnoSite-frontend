<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 sm6>
        <div>
          <p class="title font-weight-medium">{{Bundle.name}}</p>
        </div>
        <v-text-field v-model.trim="Bundle.name" clearable label="Назва"></v-text-field>
        <v-img
          :src="Bundle.cover"
          height="200px"
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        >
          <input
            type="file"
            id="files"
            class="inputfile"
            ref="file"
            accept="image/*"
            @change="previewImage"
          >
          <label for="files">
            <v-container fluid fill-height>
              <v-layout align-center justify-center>
                <v-flex class="text-xs-center">
                  <v-icon large color="white">edit</v-icon>
                </v-flex>
              </v-layout>
            </v-container>
          </label>
        </v-img>
      </v-flex>
      <v-flex xs12 sm6>
        <div>
          <p class="title font-weight-medium">Обрані завдання</p>
        </div>
        <div style="overflow-y: scroll; max-height:263px;" v-if="chosenTasks.length!=0">
          <v-list two-line subheader dense>
            <transition-group name="fadeLeft">
              <v-list-tile v-for="(task, index) in chosenTasks" :key="task.id" avatar>
                <!-- @click="" -->
                <v-tooltip bottom class="pointer">
                  <v-list-tile-avatar @click="openImageDialog(task.task_image)" slot="activator">
                    <v-icon>image</v-icon>
                  </v-list-tile-avatar>
                  <span>Переглянути завдання</span>
                </v-tooltip>
                <v-list-tile-content>
                  <v-list-tile-title>
                    <span>
                      <span>№ {{task.number}}.&nbsp;</span>
                      <span>{{task.year}} &nbsp;</span>
                      <span v-if="task.zno_type==1">(Основне ЗНО)</span>
                      <span v-if="task.zno_type==2">(Пробне ЗНО)</span>
                      <span v-if="task.zno_type==3">(Додаткове ЗНО)</span>
                    </span>
                  </v-list-tile-title>
                  <v-list-tile-sub-title>({{task.theme.name}})</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple @click="deleteTask(index)">
                    <v-icon color="grey lighten-1">delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <v-dialog v-model="imageDialog" max-width="600px">
                  <img :src="dialogImage" alt>
                </v-dialog>
              </v-list-tile>
            </transition-group>
          </v-list>
        </div>
        <div v-else>
          <p class="subheading font-weight-ligth">В цій добірці поки що немає завдань :((</p>
        </div>
      </v-flex>
      <v-flex xs12>
        <br>
        <div>
          <p class="title font-weight-medium">Додати завдання:</p>
        </div>
        <v-layout>
          <v-flex xs3>
            <v-select
              :items="YEARS"
              multiple
              v-model="checkedYears"
              :menu-props="{ maxHeight: '400', zIndex:'1' }"
              label="Роки"
              @change="loadTasks()"
            >
              <template slot="selection" slot-scope="{ item, index }">
                <span v-if="index === 0">{{ item }}</span>
                <span v-if="index === 1" class="grey--text">(+{{ checkedYears.length - 1 }})</span>
              </template>
            </v-select>
          </v-flex>
          <v-flex xs3>
            <v-select
              :items="THEMES"
              multiple
              v-model="checkedThemes"
              :menu-props="{ maxHeight: '400', zIndex:'1' }"
              label="Теми"
              @change="loadTasks()"
            >
              <template slot="selection" slot-scope="{ item, index }">
                <span v-if="index === 0">{{ item }}</span>
                <span v-if="index === 1" class="grey--text">(+{{ checkedThemes.length - 1 }})</span>
              </template>
            </v-select>
          </v-flex>
          <v-flex xs3>
            <v-select
              :items="TYPES"
              item-text="name"
              item-value="value"
              multiple
              v-model="checkedTypes"
              :menu-props="{ maxHeight: '400' }"
              label="Завдання"
              @change="loadTasks()"
            >
              <template slot="selection" slot-scope="{ item, index }">
                <span v-if="index === 0">{{ item.name}}</span>
                <span v-if="index === 1" class="grey--text">(+{{ checkedTypes.length - 1 }})</span>
              </template>
            </v-select>
          </v-flex>
          <v-flex xs3>
            <v-select
              :items="ZNO_TYPES"
              item-text="name"
              item-value="value"
              multiple
              v-model="checkedZnoTypes"
              :menu-props="{ maxHeight: '400' }"
              label="ЗНО"
              @change="loadTasks()"
            >
              <span v-if="index === 0">{{ item.value }}</span>
              <span v-if="index === 1" class="grey--text">(+{{ checkedZnoTypes.length - 1 }})</span>
            </v-select>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-snackbar v-model="snackbarAdd" bottom color="success" :timeout="1800">
        <v-layout align-center justify-center>
          <v-flex>
            <div>
              <p class="text-xs-center noPadding">Завдання додано</p>
            </div>
          </v-flex>
        </v-layout>
      </v-snackbar>
      <v-snackbar v-model="snackbarDelete" bottom color="error" :timeout="1800">
        <v-layout align-center justify-center>
          <v-flex>
            <div>
              <p class="text-xs-center noPadding">Завдання видалено</p>
            </div>
          </v-flex>
        </v-layout>
      </v-snackbar>
      <v-snackbar v-model="snackbarSave" bottom color="success" :timeout="1800">
        <v-layout align-center justify-center>
          <v-flex>
            <div>
              <p class="text-xs-center noPadding">Добірку збережено</p>
            </div>
          </v-flex>
        </v-layout>
      </v-snackbar>
      <v-flex>
        <v-data-iterator
          :items="tasks"
          content-tag="v-layout"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          row
          wrap
          no-data-text="Немає завдань за вашими критеріями"
        >
          <v-flex slot="item" slot-scope="props" xs12 lg6>
            <v-card class="card__wrapper">
              <v-subheader>
                <span>
                  <span>Завдання № {{props.item.number}}&nbsp;</span>
                  <span v-if="props.item.zno_type==1">з основної сесії ЗНО</span>
                  <span v-if="props.item.zno_type==2">з пробного ЗНО</span>
                  <span v-if="props.item.zno_type==3">з додаткової сесії ЗНО</span>
                  <span>&nbsp;{{props.item.year}} року ({{props.item.theme.name}})</span>
                </span>
              </v-subheader>
              <img :src="ROOT_URL+props.item.task_image">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn round color="primary" @click="addTask(props.item.id)">додати</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-data-iterator>
        <v-flex v-show="$vuetify.breakpoint.mdAndDown">
          <div class="kostyl"/>
        </v-flex>
      </v-flex>
    </v-layout>
    <v-dialog v-model="saveDialog" max-width="300px">
      <v-card>
        <v-card-title
          class="headline text-xs-center"
        >Вашу добірку не збережено! Ви дійсно бажаєти вийти?</v-card-title>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" flat="flat" @click="saveDialog = false">Повернутися</v-btn>
          <v-btn color="red darken-1" flat="flat" @click="confirmExit()">Вийти</v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-fab-transition>
      <v-btn class="z" color="primary" dark fixed right bottom fab @click="saveBundle()">
        <v-icon>save</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import { transliterate } from 'inflected';
import THEMES from '@/constants/Themes';
import YEARS from '@/constants/Years';
import TYPES from '@/constants/Types';
import ZNO_TYPES from '@/constants/ZnoTypes';
import { ROOT_URL } from '@/constants/Const';
import api from '@/api';

//require("vue2-animate/dist/vue2-animate.min.css");

export default {
	data() {
		return {
			index: null,
			rowsPerPageItems: [10],
			pagination: {
				rowsPerPage: 10
			},
			snackbarAdd: false,
			snackbarDelete: false,
			snackbarSave: false,
			imageDialog: false,
			saveDialog: false,
			dialogImage: '',
			confirmButton: false,
			confirmButtonUrl: '',
			ROOT_URL,
			Bundle: {},
			isSaved: false,
			tasks: [],
			chosenTasks: [],
			checkedThemes: [],
			checkedYears: [],
			checkedTypes: [],
			checkedZnoTypes: [],
			THEMES,
			TYPES,
			ZNO_TYPES,
			YEARS
		};
	},
	computed: {
		bundleID() {
			return this.$route.params.id;
		}
	},
	watch: {
		Bundle: {
			handler() {
				this.refreshChosenTasks();
				this.isSaved = false;
			},
			deep: true
		}
	},
	methods: {
		loadTasks() {
			api.tasks
				.getTasks(
					this.checkedYears,
					this.checkedThemes,
					this.checkedTypes,
					this.checkedZnoTypes
				)
				.then(res => (this.tasks = res.data));
		},
		refreshChosenTasks() {
			if (this.Bundle.tasks.length > 0) {
				api.tasks
					.getBundleTasks(this.Bundle.tasks)
					.then(res => (this.chosenTasks = res.data));
			} else {
				this.chosenTasks = [];
			}
		},
		openImageDialog(image) {
			this.imageDialog = true;
			this.dialogImage = ROOT_URL + image;
		},
		previewImage() {
			var input = this.$refs.file;
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				reader.onload = e => {
					this.Bundle.cover = e.target.result;
				};
				reader.readAsDataURL(input.files[0]);
			}
		},
		deleteTask(index) {
			this.Bundle.tasks.splice(index, 1);
			this.snackbarDelete = true;
		},
		addTask(id) {
			this.Bundle.tasks.push(id);
			this.snackbarAdd = true;
		},
		saveBundle() {
			let payload = new FormData();
			payload.append('name', this.Bundle.name);
			if (this.$refs.file.files[0]) {
				let fileName = transliterate(this.$refs.file.files[0].name);
				payload.append('cover', this.$refs.file.files[0], fileName);
			}
			payload.append('edited_date', new Date().toISOString());
			this.Bundle.tasks.forEach(item => payload.append('tasks', item));
			// var arr = this.Bundle.tasks;
			// for (var i = 0; i < arr.length; i++) {
			// 	payload.append('tasks', arr[i]);
			// }
			api.bundles
				.updateBundle(payload, this.Bundle.id)
				.then((this.isSaved = true), (this.snackbarSave = true));
		},
		confirmExit() {
			this.confirmButton = true;
			this.$router.push({
				path: this.confirmButtonUrl
			});
		}
	},
	mounted() {
		api.bundles.getBundle(this.bundleID).then(res => {
			this.Bundle = res.data;
			this.Bundle.cover = ROOT_URL + res.data.cover;
		});

		this.loadTasks();
	},
	beforeRouteLeave(to, from, next) {
		if (!this.isSaved) {
			this.saveDialog = true;
			this.confirmButtonUrl = to.path;
			if (this.confirmButton) {
				next();
			}
		} else {
			next();
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
img {
	width: 100%;
	max-width: 600px;
	display: block;
	margin-left: auto;
	margin-right: auto;
}
.card__wrapper {
	max-width: 620px;
	margin-left: auto;
	margin-right: auto;
	border-radius: 12px;
}
.noPadding {
	padding: 0;
	margin: 0;
}
.pointer {
	cursor: pointer;
}
.kostyl {
	height: 56px;
}
.z {
	z-index: 1000;
}
</style>

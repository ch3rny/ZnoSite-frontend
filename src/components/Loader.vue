<template>
  <v-flex d-flex xs12 md10 lg9 class="loader" v-if="loading">
    <v-layout align-center justify-center fill-height>
      <v-flex class="sinusoid">
        <div class="text-xs-center">
          <div class="wrapper">
            <div v-for="i of 11" :id="`ball${13-i}`" class="ball" :key="i"></div>
          </div>
        </div>
        <br>
        <div class="text-xs-center">
          <p class="title font-weight-medium">Завантаження...</p>
        </div>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
	props: {
		loading: Boolean
	}
};
</script>

<style scoped>
.loader {
	width: 100%;
	height: 90vh;
	z-index: 1;
}
.sinusoid {
	width: 250px;
}
.anime {
	margin: 0 auto;
}
.wrapper {
	height: 40px;
	margin: 0 auto;
	margin-bottom: 20px;
}
.title {
	animation: blink 2s ease-in-out infinite;
}
.ball {
	display: inline-block;
	width: 15px;
	height: 15px;
	border-radius: 50%;
	background-color: #1976d2;
	position: relative;
	top: 20px;
	animation: bounce 2s linear infinite;
}

#ball1 {
	animation-delay: 0s;
	background-color: red;
}

#ball2 {
	animation-delay: -0.17s;
}

#ball3 {
	animation-delay: -0.35s;
}

#ball4 {
	animation-delay: -0.5s;
}

#ball5 {
	animation-delay: -0.65s;
}

#ball6 {
	animation-delay: -0.83s;
}

#ball7 {
	animation-delay: -1s;
}

#ball8 {
	animation-delay: -1.17s;
}

#ball9 {
	animation-delay: -1.35s;
}

#ball10 {
	animation-delay: -1.5s;
}

#ball11 {
	animation-delay: -1.65s;
}

#ball12 {
	animation-delay: -1.83s;
}
#ball13 {
	animation-delay: 0s;
}

@keyframes bounce {
	0%,
	50%,
	100% {
		transform: translateY(0px);
	}
	5%,
	45% {
		transform: translateY(6px);
	}
	10%,
	40% {
		transform: translateY(12px);
	}
	15%,
	35% {
		transform: translateY(16px);
	}
	20%,
	30% {
		transform: translateY(19px);
	}
	25% {
		transform: translateY(20px);
	}
	55%,
	95% {
		transform: translateY(-6px);
	}
	60%,
	90% {
		transform: translateY(-12px);
	}
	65%,
	85% {
		transform: translateY(-16px);
	}
	70%,
	80% {
		transform: translateY(-19px);
	}
	75% {
		transform: translateY(-20px);
	}
}
@keyframes blink {
	0% {
		opacity: 1;
	}
	25%,
	75% {
		opacity: 0.66;
	}
	50% {
		opacity: 0.33;
	}
}
</style>

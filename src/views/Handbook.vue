<template>
  <div class="wrapper">
    <div id="ball13" class="ball"></div>
    <div id="ball12" class="ball"></div>
    <div id="ball11" class="ball"></div>
    <div id="ball10" class="ball"></div>
    <div id="ball9" class="ball"></div>
    <div id="ball8" class="ball"></div>
    <div id="ball7" class="ball"></div>
    <div id="ball6" class="ball"></div>
    <div id="ball5" class="ball"></div>
    <div id="ball4" class="ball"></div>
    <div id="ball3" class="ball"></div>
    <div id="ball2" class="ball"></div>
    <div id="ball1" class="ball"></div>
  </div>
</template>

<script>
// export default {
//   mounted() {
//     MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
//   },
// };
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.wrapper {
  width: 210px;
  height: 40px;
  margin: 0 auto;
}

.ball {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #222ede;
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
  background-color: red;
}

#ball5 {
  animation-delay: -0.65s;
}

#ball6 {
  animation-delay: -0.83s;
}

#ball7 {
  animation-delay: -1s;
  background-color: red;
}

#ball8 {
  animation-delay: -1.17s;
}

#ball9 {
  animation-delay: -1.35s;
}

#ball10 {
  animation-delay: -1.5s;
  background-color: red;
}

#ball11 {
  animation-delay: -1.65s;
}

#ball12 {
  animation-delay: -1.83s;
}
#ball13 {
  animation-delay: 0s;
  background-color: red;
}

@keyframes bounce {
  0% {
    transform: translateY(0px);
  }
  5% {
    transform: translateY(6px);
  }
  10% {
    transform: translateY(12px);
  }
  15% {
    transform: translateY(16px);
  }
  20% {
    transform: translateY(19px);
  }
  25% {
    transform: translateY(20px);
  }
  30% {
    transform: translateY(19px);
  }
  35% {
    transform: translateY(16px);
  }
  40% {
    transform: translateY(12px);
  }
  45% {
    transform: translateY(6px);
  }
  50% {
    transform: translateY(0px);
  }
  55% {
    transform: translateY(-6px);
  }
  60% {
    transform: translateY(-12px);
  }
  65% {
    transform: translateY(-16px);
  }
  70% {
    transform: translateY(-19px);
  }
  75% {
    transform: translateY(-20px);
  }
  80% {
    transform: translateY(-19px);
  }
  85% {
    transform: translateY(-16px);
  }
  90% {
    transform: translateY(-12px);
  }
  95% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>

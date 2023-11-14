<template>
  <v-text-field
    label="Возраст, лет"
    v-model="dataUser.age"
    type="number"
    variant="underlined"
  />
  <v-text-field
    label="Рост, в см"
    v-model="dataUser.height"
    type="number"
    variant="underlined"
  />
  <v-text-field
    label="Вес, в кг"
    v-model="dataUser.weight"
    type="number"
    variant="underlined"
  />
  <v-radio-group v-model="dataUser.gender" inline>
    <v-radio label="Мужчина" value="man" />
    <v-radio label="Женщина" value="woman" />
  </v-radio-group>
  <v-select
    label="Степень физической активности"
    :items="levelPhysicalActivity"
    v-model="dataUser.activity"
    item-title="title"
    item-value="value"
    variant="underlined"
  />
  <v-btn @click="getNormCalorie()" class="calculate">Рассчитать</v-btn>
  <p class="message mt-2">{{ message }}</p>
</template>

<script setup>
import { ref, reactive, computed } from "vue";

const levelPhysicalActivity = ref(levelPhysicalActivityData);

const dataUser = reactive({
  age: null,
  height: null,
  weight: null,
  gender: "man",
  activity: levelPhysicalActivity.value[0].value,
});

const props = defineProps({
  totalCaloriesDay: Number,
});

const emit = defineEmits(["normCalorie", "comment"]);

const message = ref("");
const comment = ref("");
const normCalorie = ref(null);

// расчет суточной нормы калорий
function getNormCalorie() {
  if (verificationData()) {
    let partFormula =
      10 * dataUser.weight +
      6.25 * dataUser.height -
      5 * dataUser.age;
    partFormula =
      dataUser.gender === "man" ? partFormula + 5 : partFormula - 161;
    normCalorie.value = partFormula * parseFloat(dataUser.activity);
    message.value = "";
  } else {
    message.value = "Введите корректные данные";
    normCalorie.value = null;
    comment.value = "";
  }
  emit("normCalorie", normCalorie.value);
  emit("comment", checkExcessDeficiency);
}

// проверка избытка и недостатка
const checkExcessDeficiency = computed(() => {
  if (props.totalCaloriesDay > normCalorie.value) {
    return "Превышение на " + (props.totalCaloriesDay - normCalorie.value) + " Ккал!!!";
  } else if (props.totalCaloriesDay < normCalorie.value) {
    return "Недостаток " + (normCalorie.value - props.totalCaloriesDay) + " Ккал!!!";
  } else return "";
});

function verificationData() {
  let age = parseInt(dataUser.age);
  let height = parseFloat(dataUser.height);
  let weight = parseFloat(dataUser.weight);
  if (
    age > 0 &&
    age <= 100 &&
    height > 0 &&
    height <= 300 &&
    weight > 0 &&
    weight <= 1000
  )
    return true;
  else return false;
}
</script>

<style scoped lang="scss">
@use "../styles/settings";

.calculate {
  @include settings.btnStyle();
  background-color: #7cb342;
}
.message {
  @include settings.message();
}
</style>
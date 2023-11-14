<template>
  <div>
    <p class="title-filter mb-4">Выберите фильтры</p>
    <hr class="mb-6" />
    <v-row dense>
      <v-col cols="12">
        <p>Калории за порцию*</p>
        <v-radio-group v-model="n_calories" color="light-green-darken-4" inline>
          <v-radio label="Менее 100" value="0" />
          <v-radio label="100 - 250" value="1" />
          <v-radio label="250 - 500" value="2" />
          <v-radio label="Более 500" value="3" />
        </v-radio-group>
      </v-col>
      <v-col cols="12">
        <p>Белки</p>
        <v-radio-group v-model="n_proteins" color="light-green-darken-4" inline>
          <v-radio label="Менее 15" value="0" />
          <v-radio label="15 - 30" value="1" />
          <v-radio label="30 - 50" value="2" />
          <v-radio label="Более 50" value="3" />
          <v-radio label="Все" value="4" />
        </v-radio-group>
      </v-col>
      <v-col cols="12">
        <p>Жиры</p>
        <v-radio-group v-model="n_fats" color="light-green-darken-4" inline>
          <v-radio label="Менее 25" value="0" />
          <v-radio label="25 - 50" value="1" />
          <v-radio label="50 - 75" value="2" />
          <v-radio label="Более 75" value="3" />
          <v-radio label="Все" value="4" />
        </v-radio-group>
      </v-col>
      <v-col cols="12">
        <p>Углеводы</p>
        <v-radio-group v-model="n_carbs" color="light-green-darken-4" inline>
          <v-radio label="Менее 25" value="0" />
          <v-radio label="25 - 50" value="1" />
          <v-radio label="50 - 75" value="2" />
          <v-radio label="Более 75" value="3" />
          <v-radio label="Все" value="4" />
        </v-radio-group>
      </v-col>
    </v-row>
    <v-btn variant="tonal" @click="filtration()" class="btn-ok">ОК</v-btn>
    <p class="message mt-2">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useLisfFoodsStore } from "@/store/listFoods";
import { storeToRefs } from "pinia";

const listFoodStore = useLisfFoodsStore();
const { foods } = storeToRefs(listFoodStore);
const { getAllFoods } = listFoodStore;
getAllFoods();

const message = ref("");
const emit = defineEmits(["foodFilter"]);

const n_calories = ref("");
const n_proteins = ref("");
const n_fats = ref("");
const n_carbs = ref("");

const criteria = reactive({
  calories: calories(searchMaxValue("calories")),
  proteins: proteins(searchMaxValue("proteins")),
  fats: fats(searchMaxValue("fats")),
  carbs: carbs(searchMaxValue("carbs")),
});

function filtration() {
  if (n_calories.value !== "") {
    if (n_proteins.value === "") n_proteins.value = 4;
    if (n_fats.value === "") n_fats.value = 4;
    if (n_carbs.value === "") n_carbs.value = 4;
    let foodFilter = foods.value.filter(
      (f) =>
        between(
          f.calories,
          criteria.calories[n_calories.value].min,
          criteria.calories[n_calories.value].max
        ) &&
        between(
          f.proteins,
          criteria.proteins[n_proteins.value].min,
          criteria.proteins[n_proteins.value].max
        ) &&
        between(
          f.fats,
          criteria.fats[n_fats.value].min,
          criteria.fats[n_fats.value].max
        ) &&
        between(
          f.carbs,
          criteria.carbs[n_carbs.value].min,
          criteria.carbs[n_carbs.value].max
        )
    );
    message.value = "";
    emit("foodFilter", foodFilter);
  } else message.value = "Выберите необходимый диапазон калорий";
}

function between(value, min, max) {
  return value >= min && value <= max;
}

function searchMaxValue(parametr) {
  return foods.value
    .map((item) => item[parametr])
    .reduce((prev, current) => (prev > current ? prev : current));
}
</script>

<style scoped lang="scss">
@use "../styles/settings";

.title-filter {
  color: settings.$mainColorText;
  font-weight: bold;
}
.btn-ok {
  @include settings.btnStyle();
}
.message {
  @include settings.message();
}
</style>
const days = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

const levelPhysicalActivityData = [
  { title: "минимальная активность", value: 1.2 },
  { title: "слабый уровень активности", value: 1.375 },
  { title: "умеренный уровень активности", value: 1.55 },
  { title: "тяжелая или трудоемкая активность", value: 1.7 },
  { title: "экстремальный уровень", value: 1.9 },
];

const namechartDataOdj = [
  { ru: "Калории", en: "calories" },
  { ru: "Белки", en: "proteins" },
  { ru: "Жиры", en: "fats" },
  { ru: "Углеводы", en: "carbs" },
];
const nameCriteriaChartDataObj = [
  { title: "По дням", value: "day" },
  { title: "По неделям", value: "week" },
  { title: "По месяцам", value: "month" },
  { title: "По годам", value: "year" },
];

function calories(maxVal) {
  return [
    { min: 0, max: 99 },
    { min: 100, max: 249 },
    { min: 250, max: 499 },
    { min: 500, max: maxVal },
  ];
}
function proteins(maxVal){ 
  return [
    { min: 0, max: 14 },
    { min: 15, max: 29 },
    { min: 30, max: 49 },
    { min: 50, max: maxVal },
    { min: 0, max: maxVal },
  ];
}
function fats(maxVal) {
  return [
    { min: 0, max: 24 },
    { min: 25, max: 49 },
    { min: 50, max: 74 },
    { min: 75, max: maxVal },
    { min: 0, max: maxVal},
  ];
}
function carbs(maxVal) {
  return [
    { min: 0, max: 24 },
    { min: 25, max: 49 },
    { min: 50, max: 74 },
    { min: 75, max: maxVal },
    { min: 0, max: maxVal },
  ];
}

const header = {
  align: "start",
  key: "name",
  sortable: false,
  title: "Продукты/Блюда",
};
const headersTableFoodDirectory = [
  header,
  { key: "calories", title: "Калории (Ккал)" },
  { key: "proteins", title: "Белки (г)" },
  { key: "fats", title: "Жиры (г)" },
  { key: "carbs", title: "Углеводы (г)" },
];

let headersTableFoodSection = [
  header,
  { key: "weight", title: "Масса (г)" },
  { key: "calories", title: "Калории (Ккал)" },
  { key: "actions", title: "" },
];

let headersTableFoodSelection = [
  {
    align: "start",
    key: "name",
    sortable: false,
    title: "Продукты/Блюда",
  },
  { key: "calories", title: "Калории (Ккал)" },
  { key: "proteins", title: "Белки (г)" },
  { key: "fats", title: "Жиры (г)" },
  { key: "carbs", title: "Углеводы (г)" },
  { key: "actions", title: "" },
];
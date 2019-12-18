<template>
  <div class="Base">
    <div class="list">
      <CategoryList />
    </div>
    <div class="items" v-if="true">
      <DrinkItems />
    </div>
    <div v-if="true">
     <DetailsOfDrink/>
    </div>
  </div>
</template>

<script>
import CategoryList from "./CategoriesHome";
import DrinkItems from "./DrinkItems";
import DetailsOfDrink from "./DetailsOfDrikns";

export default {
    name : 'Home',
  components: {
    CategoryList,
    DrinkItems,
    DetailsOfDrink
  }
};
</script>

<style>
.Base{
  width: 100%;
}
.list{
  width: 20%;
  float: left
}
.items{
  width: 74%;
  float: right;
  overflow:overlay;
  height: 630px;
  margin-left: 3%;
  margin-right: 3%;
}

::-webkit-scrollbar {
  width: 10px;
}


::-webkit-scrollbar-track {
  background:yellowgreen; 
}
 

::-webkit-scrollbar-thumb {
  background:teal; 
}


::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>
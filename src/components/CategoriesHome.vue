<template>
  <div>
    <div class="list-group" id="MainCategory"> 
      <a
        id="SubCategory"
        href="#"
        class="list-group-item list-group-item-action active w-25 m-1"
        v-for="item in items"
        :key="item"
        v-on:click="loadData(item)"
      >{{item}}</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {EventBus} from '../EventBus'

export default {
  name: "CategoryList",
  data() {
    return {
      items: [],
      aItem: "",
      backgroundColor:"none"
    };
  },
  beforeMount() {
  
    this.getCatList();
  },
  methods: {
    getCatList() {
      console.log("success");
      axios({
        method: "GET",
        url: "https://the-cocktail-db.p.rapidapi.com/list.php",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
          "x-rapidapi-key": "7eb7cb0097msh13df13840eefc10p1c7773jsn226625744505"
        },
        params: {
          c: "list"
        }
      })
        .then(response => {
          response.data["drinks"].forEach(element => {
            this.items.push(element.strCategory);
           
          });
        })
        .catch(error => {
          console.log(error);
        });
    },

    loadData(item){
      console.log(item);
      EventBus.$emit('itemName',item);
    }
  }
};
</script>

<style>
#MainCategory{
 width: 100%; 
}
#SubCategory{
  width: 100%;
  min-inline-size: -webkit-fill-available;
  border-radius: 10px;
}

</style>
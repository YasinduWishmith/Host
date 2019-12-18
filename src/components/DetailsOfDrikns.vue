<template>
  <div class="outer" v-if="show">
    <div class="card text-white bg-primary mb-3" style="max-width: 800rem;">
      <div class="card-header"><h4>{{drinkCategory}}</h4></div>
      <div class="card-body">
        <h6 class="card-title"> {{drink}} Category</h6>
        <p
          class="card-text"
        >It's looks like a {{drinkGlass}}. It is {{drinkAlcoholic}}. It should {{drinkInstruction}}</p>
        <div class="footer">
          <button class="btn btn-danger" type="button" data-dismiss="modal" v-on:click="close()">Close</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { EventBus } from "../EventBus";
export default {
  name: "DetailsOfDrink",

  data() {
    return {
      drinkCategory: "",
      drinkAlcoholic: "",
      drinkGlass: "",
      drinkInstruction: "",
      drink: "",
      itemId: "",
      show: false,
      blur:false
  
    };
 
  },

  mounted() {
    this.getItemId();
  },
  methods: {
    getItemId() {
      
      EventBus.$on("getId", itemId => {
        this.itemId = itemId;
        this.getDetails(this.itemId);
        console.log(this.itemId);
        EventBus.$off("getId", itemId);
      });

    },

    getDetails(key) {
      
      const axios = require("axios");

      axios({
        method: "GET",
        url: "https://the-cocktail-db.p.rapidapi.com/lookup.php",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
          "x-rapidapi-key": "7eb7cb0097msh13df13840eefc10p1c7773jsn226625744505"
        },
        params: {
          i: "" + key + ""
        }
      })
        .then(response => {
          console.log(response.data["drinks"][0]["idDrink"]);

          this.drinkCategory = response.data["drinks"][0]["strCategory"];
          this.drinkAlcoholic = response.data["drinks"][0]["strAlcoholic"];
          this.drinkGlass = response.data["drinks"][0]["strGlass"];
          this.drinkInstruction = response.data["drinks"][0]["strInstructions"];
          this.drink = response.data["drinks"][0]["strDrink"];
        
        if( this.drinkCategory){
            this.show = true; 
        }
        

          
        })
        .catch(error => {
          console.log(error);
        });
       

      
    },

    clear(){
      this.drinkCategory = "";
          this.drinkAlcoholic = "";
          this.drinkGlass = "";
          this.drinkInstruction = "";
          this.drink = "";
    },
    close(){
      this.show=false;
      this.clear();
      EventBus.$emit('blurFalse', this.blur);
      
    }
  }
};

</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
h6 {
  margin-top: 0;
  color: #42b983;
  font-weight: 700
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}
.outer{
position: absolute;
    z-index: 100;
      margin-left: 30%;
    margin-top: 10%;
    margin-right: 30%;
} 
.footer{
  margin-top: 15px;
  z-index: 150;
  margin-right: 30%;
}
button{
   z-index: 150;
}

    

</style>
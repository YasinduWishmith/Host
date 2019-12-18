<template>
  <b-container fluid v-bind:class="{blurFunct:this.blur}">
    <div class="row">
      <div class="card col-3 itemcard hovereffect" v-for="(glass,index) in glasses" :key="index">
        <div class="card title">
          <h5 class="card-header" id="header" v-on:click="loadDetails(glass)">{{glass.strDrink}}</h5>
        </div>
        <img
          class="img-responsive"
          style="height: 200px; width: 100%; display: block;"
          :src="glass.strDrinkThumb"
          alt="Card image"
        />
      </div>
    </div>
    <h1 style="z-index:100">{{this.count}}</h1>
  </b-container>
</template>

<script>
import { EventBus } from "../EventBus";
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/interval'

export default {
  name: "DrinkItems",

  data() {
    return {
      glasses: [],
      itemName: "",
      Ordinary_Drink: "Ordinary Drink",
      itemId: "",
      isActive: true,
      blur:false,
      count:0
    };
  },

  created(){
    const obs = Observable.interval(100)
    obs.subscribe(
      (value) => {
        this.count = value
        EventBus.$on("blurFalse", blur=>{
          this.blur = blur
        });
      }
    )
  },
  beforeMount() {
    this.getItemListInitialy();
    this.getItemName();
  },
  methods: {
    makeblur(){
      this.blur = true;
    },
    loadDetails(glass){
      this.itemId = glass.idDrink;
      EventBus.$emit('getId', this.itemId);
        this.makeblur();
    },
    getItemName() {
      EventBus.$on("itemName", aItem => {
        this.itemName = aItem;

        this.getItemList(this.itemName);

        EventBus.$off("itemName", aItem);
      });
    },

    getItemList(key) {
      const axios = require("axios");

      axios({
        method: "GET",
        url: "https://the-cocktail-db.p.rapidapi.com/filter.php",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
          "x-rapidapi-key": "7eb7cb0097msh13df13840eefc10p1c7773jsn226625744505"
        },

        params: {
          c: "" + key + ""
        }
      })
        .then(response => {
          this.glasses = [];
          response.data["drinks"].forEach(element => {
            this.glasses.push(element);
          });
          console.log(this.glasses);
        })
        .catch(error => {
          console.log(error);
        });
    },

    getItemListInitialy() {
      const axios = require("axios");

      axios({
        method: "GET",
        url: "https://the-cocktail-db.p.rapidapi.com/filter.php",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
          "x-rapidapi-key": "7eb7cb0097msh13df13840eefc10p1c7773jsn226625744505"
        },

        params: {
          c: "" + this.Ordinary_Drink + ""
        }
      })
        .then(response => {
          this.glasses = [];
          response.data["drinks"].forEach(element => {
            this.glasses.push(element);
          });
          console.log(this.glasses);
        })
        .catch(error => {
          console.log(error);
        });
    },
    blurFunct(){
      event.target.blur();
    }
  }
};
</script>

<style>
#cardouter {
  width: 200px;
}
#header {
     background-color: transparent;
    font-weight: 1000;
    z-index: 5;
    color: floralwhite;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;
    padding-left: 150px;
    padding-right: 60px;
    padding-top: 100px;
   

}
.card.col-3.itemcard {
  padding-left: 8px;
  padding-right: 8px;
  margin-bottom: 20px;
}

.hovereffect {
  width: 100%;
  height: 100%;
  float: left;
  overflow: hidden;
  position: relative;
  text-align: center;
  cursor: default;
}

.hovereffect .overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.hovereffect:hover .overlay {
  background-color: rgba(170, 170, 170, 0.4);
}

.hovereffect h2,
.hovereffect img {
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
      margin-left: 5px;
    margin-right: 20px;
}

.hovereffect img {
  display: block;
  position: relative;
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);

}

.hovereffect:hover img {
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
      opacity: 0.2;
  filter: alpha(opacity=50);
}

.hovereffect h5 {
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  position: relative;
  font-size: 17px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
}

.hovereffect a.info {
  display: inline-block;
  text-decoration: none;
  padding: 7px 14px;
  text-transform: uppercase;
  color: #fff;
  border: 1px solid #fff;
  margin: 50px 0 0 0;
  background-color: transparent;
  opacity: 0;
  filter: alpha(opacity=0);
  -webkit-transform: scale(1.5);
  -ms-transform: scale(1.5);
  transform: scale(1.5);
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.2s ease-in-out;
  font-weight: normal;
  height: 85%;
  width: 85%;
  position: absolute;
  top: -20%;
  left: 8%;
  padding: 70px;

}

.hovereffect:hover a.info {
  opacity: 0.5;
  filter: alpha(opacity=100);
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
  background-color: rgba(0, 0, 0, 0.4);
}
.card {
  flex-direction: row-reverse;
}
h5.card-header{
  z-index: 50;
 font-size: 13px;

}
h5.card-header:hover {
  text-decoration: underline;
  font-size: 14px;
  color: aquamarine;
}

.blur   {
    filter: blur(5px);
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
}
#overlay    {
    position: fixed;
    display: none;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    background: rgba(255,255,255,.8);
    z-index: 999;
}
.blurFunct{
  filter: blur(8px);
}

</style>
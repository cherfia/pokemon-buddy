<template>
  <q-page class="flex flex-center">
    <div v-if="!showPokemon">
      <h6 class="text-h6 absolute-center" style="top: 25%">Pokémon Buddy</h6>
      <q-spinner-tail class="absolute-center" color="red" size="9rem" v-show="showProgress"/>
      <q-btn
        name="play"
        class="absolute-center"
        round
        size="3rem"
        flat
        push
        icon="img:statics/img/pokeball.svg"
        @click.prevent="getPokemonBuddy()"
      ></q-btn>
    </div>
    <div class="row items-baseline content-between justify-center text-center q-ma-lg" v-else>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <div class="row">
          <div class="col-12 desktop-only">
            <h4 class="text-uppercase text-weight-bolder text-blue-grey-9">{{getPokemon.name}}</h4>
          </div>
          <div class="col-12">
            <q-img
              :src="getPokemon.artwork"
              class="responsive"
              spinner-color="red"
              :ratio="1"
              :alt="getPokemon.name"
              style="width: 320px; max-width: 320px"
            ></q-img>
          </div>
          <div class="col-12 desktop-only q-mt-md">
            <div class="row justify-between">
              <div class="col-4 text-weight-bold">{{getPokemon.weight/10}} kg</div>
              <div class="col-2" v-for="(entry, index) in getPokemon.types" :key="index">
                <q-icon
                  size="1rem"
                  :name="'img:https://db.pokemongohub.net/images/badges/thumb/Badge_Type_'+toCapitalize(entry.type.name)+'_01.png'"
                />
              </div>
              <div class="col-4 text-weight-bold">{{getPokemon.height/10}} m</div>
              <div class="col-4 text-uppercase text-weight-bold text-blue-grey">Weight</div>
              <div
                class="col-2 text-uppercase text-weight-bold text-blue-grey"
                v-for="entry in getPokemon.types"
                :key="entry.type.name"
              >{{entry.type.name}}</div>
              <div class="col-4 text-uppercase text-weight-bold text-blue-grey">Height</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-5 col-lg-5 offset-md-1">
        <div class="row justify-between mobile-only">
          <div class="col-12">
            <h4 class="text-capitalize text-weight-bolder text-blue-grey-9">{{getPokemon.name}}</h4>
          </div>
          <div class="col-4 text-weight-bold">{{getPokemon.weight/10}} kg</div>
          <div class="col-2" v-for="(entry, index) in getPokemon.types" :key="index">
            <q-icon
              size="1rem"
              :name="'img:https://db.pokemongohub.net/images/badges/thumb/Badge_Type_'+toCapitalize(entry.type.name)+'_01.png'"
            />
          </div>
          <div class="col-4 text-weight-bold">{{getPokemon.height/10}} m</div>
          <div class="col-4 text-uppercase text-weight-bold text-blue-grey">Weight</div>
          <div
            class="col-2 text-uppercase text-weight-bold text-blue-grey"
            v-for="entry in getPokemon.types"
            :key="entry.type.name"
          >{{entry.type.name}}</div>
          <div class="col-4 text-uppercase text-weight-bold text-blue-grey">Height</div>
          <div class="col-12">
            <q-separator inset class="q-mt-lg"></q-separator>
          </div>
        </div>
        <div class="col-12">
          <h1
            class="text-left text-h6 text-uppercase text-weight-bolder text-blue-grey-9"
          >{{getPokemon.family}}</h1>
        </div>
        <div class="text-left col-12 text-body1 text-blue-grey-10">{{getPokemon.description}}</div>
        <div class="col-12 q-mt-lg q-mb-md">
          <div class="row text- justify-left">
            <div
              class="col-auto text-h6 text-uppercase text-weight-bolder text-blue-grey-9"
            >Abilities:</div>
            <div class="col-auto" v-for="entry in getPokemon.abilities" :key="entry.ability.name">
              <q-chip dense square color="teal-1" :label="toCapitalize(entry.ability.name)"></q-chip>
            </div>
          </div>
        </div>
        <div class="col-12">
          <h1 class="text-left text-h6 text-uppercase text-weight-bolder text-blue-grey-9">Stats</h1>
        </div>
        <div class="col-12 text-left text-weight-bold text-blue-grey q-gutter-y-sm justify-center">
          <div class="row">
            <div class="col-2">HP</div>
            <div class="col-9 self-center">
              <q-linear-progress :value="stat(5)" style="height: 5px" color="cyan"></q-linear-progress>
            </div>
            <div class="col-1 text-right">{{getPokemon.stats[5].base_stat}}</div>
            <div class="col-2">ATK</div>
            <div class="col-9 self-center">
              <q-linear-progress :value="stat(4)" style="height: 5px" color="negative"></q-linear-progress>
            </div>
            <div class="col-1 text-right">{{getPokemon.stats[4].base_stat}}</div>
            <div class="col-2">DEF</div>
            <div class="col-9 self-center">
              <q-linear-progress :value="stat(4)" style="height: 5px" color="positive"></q-linear-progress>
            </div>
            <div class="col-1 text-right">{{getPokemon.stats[3].base_stat}}</div>

            <div class="col-2">SP. ATK</div>
            <div class="col-9 self-center">
              <q-linear-progress :value="stat(3)" style="height: 5px" color="accent"></q-linear-progress>
            </div>
            <div class="col-1 text-right">{{getPokemon.stats[2].base_stat}}</div>

            <div class="col-2">SP. DEF</div>
            <div class="col-9 self-center">
              <q-linear-progress :value="stat(1)" style="height: 5px" color="warning"></q-linear-progress>
            </div>
            <div class="col-1 text-right">{{getPokemon.stats[1].base_stat}}</div>

            <div class="col-2">SPD</div>
            <div class="col-9 self-center">
              <q-linear-progress :value="stat(0)" style="height: 5px" color="primary"></q-linear-progress>
            </div>
            <div class="col-1 text-right">{{getPokemon.stats[0].base_stat}}</div>
          </div>
          <div class="col-12 text-center">
            <q-btn
              name="shuffle"
              round
              size="2rem"
              flat
              icon="img:statics/img/shaffle.svg"
              @click.prevent="getPokemonBuddy()"
            ></q-btn>
            <p class="text-uppercase text-weight-bold text-blue-grey">Shuffle</p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { QSpinnerBall } from "quasar";
export default {
  name: "PageIndex",
  data() {
    return {
      showPokemon: false,
      showProgress: false
    };
  },
  methods: {
    ...mapActions("PokemonUtils", ["setPokemon"]),
    getPokemonBuddy() {
      const id = Math.floor(Math.random() * 806) + 1;
      if (this.showProgress) {
        const spinner = QSpinnerBall;
        this.$q.loading.show({
          spinner,
          spinnerSize: 50
        });
        this.timer = setTimeout(() => {
          this.$q.loading.hide();
          this.timer = void 0;
        }, 1000);
        this.setPokemon(id);
      } else {
        this.showProgress = true;
        this.timer = setTimeout(() => {
          this.showPokemon = true;
        }, 1000);
        this.setPokemon(id);
      }
    },
    toCapitalize(s) {
      return (
        s
          .toLowerCase()
          .charAt(0)
          .toUpperCase() + s.slice(1)
      );
    },
    stat(id) {
      const value = this.getPokemon.stats[id].base_stat;
      return value / 100;
    }
  },
  computed: {
    ...mapGetters("PokemonUtils", ["getPokemon"])
  },
  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  }
};
</script>

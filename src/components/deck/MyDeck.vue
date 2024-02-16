<!-- MyDeck.vue -->
<template>

  <div>
    <h2>My Pokémon Deck</h2>
    <div v-if="deckPokemons.length === 0">Your deck is empty.</div>
    <div v-else>
      <div v-for="pokemon in deckPokemons" :key="pokemon.pokedex_number" class="deck-card">
        <pokemon-card :pokemon="pokemon" @show-details="showDetailsModal"></pokemon-card>
      </div>
    </div>

    <!-- Pokemon details modal for deck -->
    <pokemon-details-modal
        v-if="isModalVisible"
        :selected-pokemon="selectedPokemon"
        :deck-pokemons="deckPokemons"
        @close="closeDetailsModal"
    ></pokemon-details-modal>

    <router-link to="/pokemon-list">View Pokémon List</router-link>
  </div>

</template>

<script>

import { mapState } from 'vuex';
import PokemonCard from "@/components/pokemon/PokemonCard.vue";
import PokemonDetailsModal from "@/components/pokemon/PokemonDetailsModal.vue";


export default {
  components: {
    PokemonCard,
    PokemonDetailsModal,
  },
  computed: {
    ...mapState(['deckPokemons']),
  },
  data() {
    return {
      isModalVisible: false,
      selectedPokemon: null,
    };
  },
  methods: {
    showDetailsModal(pokemon) {
      this.selectedPokemon = pokemon;
      this.isModalVisible = true;
    },
    closeDetailsModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style scoped>

/* Add your styles here */
.deck-card {
  margin-bottom: 20px;
}

</style>

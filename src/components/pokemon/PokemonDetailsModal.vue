<!-- PokemonDetailsModal.vue -->
<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>{{ selectedPokemon.name }}</h2>
      <img :src="getImagePath(selectedPokemon.name)" :alt="selectedPokemon.name + ' Image'" />
      <p>Classification: {{ selectedPokemon.classfication }}</p>
      <p>Type: {{ selectedPokemon.type1 }}{{ selectedPokemon.type2 ? ' / ' + selectedPokemon.type2 : '' }}</p>
      <p>Abilities: {{ selectedPokemon.abilities }}</p>
      
      <p>HP: {{selectedPokemon.hp}}</p>
      <p>Attack: {{selectedPokemon.attack}}</p>
      <p>SP Attack : {{selectedPokemon.sp_attack}}</p>
      <p>Defense: {{selectedPokemon.defense}}</p>
      <p>SP Defense: {{selectedPokemon.sp_defense}}</p>
      <p>Speed: {{selectedPokemon.speed}}</p>
    </div>

    <!-- Add to Deck and Remove from Deck buttons -->
    
    <div class="deck-actions">
      <button @click="addToDeck" :disabled="isInDeck || isDeckFull">Add to My Deck</button>
      <button @click="removeFromDeck" :disabled="!isInDeck">Remove from My Deck</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    selectedPokemon: Object,
  },
  computed: {
    ...mapState(['deckPokemons']),
    isInDeck() {
      // Check if the selected Pokemon is already in the deck
      return this.deckPokemons.some(pokemon => pokemon.pokedex_number === this.selectedPokemon.pokedex_number);
    },
    isDeckFull() {
      // Check if the deck is full (limit set to 5 )
      return this.deckPokemons.length >= 5;
    },
  },
  methods: {
    getImagePath(pokemonName) {
      
      return 'images/' + pokemonName.toLowerCase() + '.png';
    },
    closeModal() {
      console.log('Closing modal');
      this.$emit('close');
    },
    ...mapMutations(['addToDeck', 'removeFromDeck']),
    addToDeck() {
      if (!this.isInDeck && !this.isDeckFull) {
        
        console.log('adding to deck')
        this.$store.commit('addToDeck', this.selectedPokemon);
      }
    },
    removeFromDeck() {
      if (this.isInDeck) {
        console.log('removing from deck')
        this.$store.commit('removeFromDeck', this.selectedPokemon);
      }
    },
  }
};
</script>

<style scoped>
/* Add your modal styles here */
.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background-color: #ffcb05;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

img:hover {
  transform: scale(1.5);
}

/* styles for deck actions */
.deck-actions {
  margin-top: 20px;
}

.deck-actions button {
  margin-right: 10px;
}

</style>

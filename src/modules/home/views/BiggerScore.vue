<template>
    
    <main>
        <div class="description">
            <p>Ce mode de jeu consiste à faire le plus gros score. Les joueurs tirent une fléchette tour à tour, et comptent respectivement leurs points. Chaque joueur rentre ensuite son score. Celui qui a fait le plus de points à la fin de la dernière manche gagne la partie.</p>
        </div>
      <div class="container">
        <div class="not-started" v-if="notStarted">
          <p>Entrez les participants et définissez le nombre de manches.</p>
          <form @submit.prevent="addParticipant">
            <label for="name">Nom du participant</label>
            <input type="text" id="name" placeholder="Entrez un nom" v-model="newParticipant">
            <button type="submit">Ajouter</button>
          </form>
          

          <div class="participants-list">
            <p>Participants :</p>
            <div v-for="(user, index) in participants"><p>  - {{ user.name }}</p></div>
          </div>
          <form @submit.prevent="setManches">
            <label for="rounds">Nombre de manches :</label>
              <select v-model="nbCoups" id="rounds">
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
              </select>
            <button type="submit">Soummettre manches</button>
          </form>
          <p><strong>Nombre de manches configurées :</strong> {{ manches }}</p>
          <button @click="submitPlayers">Lancer la partie</button>
        </div>

      <div v-if="!notStarted && !scoreCalculated">
        <h2 class="centered">Manche <b>{{ currentManche }}</b> / {{ manches }}</h2>
        <div >
          <div class="user-block"  v-for="(user, index) in users" :key="index">
            <h3>Joueur : <b>{{ user.name }}</b></h3>
            <p>Coups précédents : {{ user.value }}</p>
            <h4 v-if="scoreCalculated">{{ user.score }}</h4>
          </div>
        </div>
        <form @submit.prevent="submitValues">
            <label>
                Valeur :
                <input v-model="value" type="number" />
            </label>
            <button type="submit">Soumettre</button>
        </form>
      </div>
      <div v-else class="centered">
        <h2>Partie terminée !!! </h2>
        <h3>Winner is {{ winner.name }} avec {{ winner.score }}</h3>
      </div>
      
      </div>
    </main>
  </template>
  
  <script>
    export default {
      data() {
        return {
          notStarted: true,
          newParticipant: '',
          participants: [],
          value: '',
          users: [],
          currentUserIndex: 0,
          scoreCalculated: false,
          manches: 10,
          currentManche: 1,
          winner: []
        };
      },
      methods: {
        submitPlayers() {
          // Émettez un événement, par exemple, pour informer le composant parent du nombre de joueurs choisi
          this.users = this.participants
          this.notStarted = false
          },
        addParticipant() {
          if (this.newParticipant.trim() !== '') {
              this.participants.push({"name": this.newParticipant, "value": []});
              this.newParticipant = ''; // Efface le champ après l'ajout
          }
        },
        setManches() {
            console.log(this.nbCoups)
            if (this.nbCoups !== undefined || this.nbCoups !== '') {
                this.manches = this.nbCoups
            }
        },
        submitValues() {
          // add value on user and check conditions of game
          if (this.value !== '') {
            this.users[this.currentUserIndex].value.push(this.value)
            this.value = ""
            this.calculateRound()
            if (this.isGameFinished()) {
              this.calculateScore()
            }
            // Passez au prochain utilisateur
            this.currentUserIndex = (this.currentUserIndex + 1) % this.users.length;
          }
          
        },
        calculateRound() {
          // calculate if we can pass to next round
          const referenceLength = this.users[0].value.length;
          for (let i = 1; i < this.users.length; i++) {
            if (this.users[i].value.length !== referenceLength) {
              return false
            }
          }
          this.currentManche = this.currentManche + 1
        },
        isGameFinished() {
          // check if the game if finished regarding to variables
          if (this.currentManche > this.manches) {
            return true;
          }
          return false;
        },
        calculateScore() {
          // calculate final scores 
          for (let i = 0; i < this.users.length; i++) {
            this.users[i].score = 0
            for (let y = 0; y < this.users[i].value.length; y++) {
              this.users[i].score = this.users[i].score + this.users[i].value[y]
            }
          }
          this.scoreCalculated = true
          this.getWinner()
        },
        getWinner() {
          // export the winner of the game
          let highestScoreObject = this.users[0]
          for (let i = 1; i < this.users.length; i++) {
            if (this.users[i].score > highestScoreObject.score) {
              highestScoreObject = this.users[i]
            }
          }
          this.winner = highestScoreObject;
        }
      },
      components: {
      },
    };
  </script>
  <style scoped>
  
  label {
    font-weight: bold;
    display: block;
    margin-top: 15px;
  }

  input, select {
    width: 80%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  button {
      width: 85%;
      background-color: #28a745;
      color: white;
      padding: 10px;
      margin-top: 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: 0.3s;
  }

  button:hover {
      background-color: #218838;
  }

  .participants-list {
      margin-top: 10px;
      font-weight: bold;
  }

  .description {
    padding: 20px;
    }

  .container {
    display: flex;
  }
  
  .centered {
    text-align: center;
    align-items: center;
  }
  
  .user-block {
    height: auto;
    width: 100%;
    padding: 20px;
    text-align: center;
  }
  
  .not-started {
    display: flex;
    align-content: center;
  }

  </style>
<template>
    
    <main>
        <div class="description">
            <p>Ce mode de jeu consiste à faire le plus gros score. Les joueurs tirent une fléchette tour à tour, et comptent respectivement leurs points. Chaque joueur rentre ensuite son score. Celui qui a fait le plus de points à la fin de la dernière manche gagne la partie.</p>
        </div>
      <div class="container">
        
          <div class="not-started" v-if="notStarted">
            <p>
                <form @submit.prevent="addParticipant">
                <label>
                    Nom du participant :
                    <input v-model="newParticipant" type="text" required />
                </label>
                <button type="submit">Ajouter</button>
                <p>Participants : </p>
                <div v-for="(user, index) in participants"><p>  - {{ user.name }}</p></div>
                
                </form>
                <br />
                <form @submit.prevent="setManches">
                    <label>
                    Nombre de manches :
                    <input v-model="nbCoups" type="number" />
                </label>
                <button type="submit">Soumettre manches</button>
                <p>Nombre de manches configurées : <b>{{ manches }}</b></p>
                
                </form>
                <br />
                <button @click="submitPlayers">Lancer la partie</button>
            </p>
          </div>
  
      <div v-if="!notStarted ">
        <h2 class="centered">Manche <b>{{ currentManche }}</b> / {{ manches }}</h2>
        <div class="left-pane" >
          <div class="user-block"  v-for="(user, index) in users" :key="index">
            <h3>Joueur : <b>{{ user.name }}</b></h3>
            <p>Coups précédents : {{ user.value }}</p>
            <h4 v-if="scoreCalculated">{{ user.score }}</h4>
          </div>
        </div>
        <div class="right-pane" v-if="!this.scoreCalculated">
            <form @submit.prevent="submitValues">
                <label>
                    Valeur :
                    <input v-model="value" type="number" />
                </label>
                <button type="submit">Soumettre</button>
            </form>
        </div>
        <div class="right-pane" v-else>
          <h2>Partie terminée !!! </h2>
          <h3>Winner is {{ winner.name }} avec {{ winner.score }}</h3>
        </div>
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
  
  .left-pane, .right-pane {
    height: 100%;
    width: 50%;
    position: fixed;
    top: 20;
    overflow-x: hidden;
    padding-top: 20px;
    flex: 1;
  }
  
  .right-pane {
    right: 0;
    background-color: #eee;
  }
  </style>
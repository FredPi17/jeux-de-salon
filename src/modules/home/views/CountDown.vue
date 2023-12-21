<template>
    <main>
        <div class="description">
                <p>Ce mode de jeu se joue en retranchant chaque fléchette du nombre de départ (301) jusqu’à ce que le joueur atteigne exactement 0 (zéro). Si un joueur dépasse zéro, on dit qu’il a cassé (“Bust”) et le score revient où il en était au début de ce tour. Par exemple, si un joueur a besoin d’un 32 pour finir la partie et qu’il/elle marque 20, 8, et 10 (total 38), le score revient à 32 pour le tour suivant.</p>
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
                        <div v-for="(user, index) in participants"><p> - {{ user.name }}</p></div>
                    </form>
                    <br />
                    <button @click="submitPlayers">Lancer la partie</button>
                </p>
            </div>
            <div v-if="!notStarted">
                <div class="left-pane">
                    <div class="user-block" v-for="(user, index) in users" :key="index">
                        <h3>Joueur : {{ user.name }}</h3>
                        <p>Coups précédents : {{ user.value }}</p>
                        <h4>Restant : {{ user.left }}</h4>
                    </div>
                </div>
                <div class="right-pane" v-if="!this.gameFinished">
                    <form @submit.prevent="submitValues">
                        <label>
                            Valeur :
                            <input v-model="value" type="number"/> 
                        </label>
                        <button type="submit" >Soumettre</button>
                    </form>
                </div>
                <div class="right-pane" v-else>
                    <h2>Partie terminée !!! </h2>
                    <h3>Winner is {{ winner.name }} avec {{ winner.shots }} coups</h3>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        props: ['countDown'],
        data() {
            return {
                notStarted: true,
                newParticipant: '',
                participants: [],
                value: '',
                currentUserIndex: 0,
                winner: [],
                score: this.countDown,
                gameFinished: false,
                newLeft: 0,
                shots: 1
            }
        },
        methods: {
            submitPlayers() {
                this.users = this.participants
                this.notStarted = false
            },
            addParticipant() {
                if (this.newParticipant.trim() !== '') {
                    this.participants.push({"name": this.newParticipant, "value": [], "left": this.score});
                    this.newParticipant = ''; // Efface le champ après l'ajout
                }
                if (this.nbCoups !== undefined) {
                    this.manches = this.nbCoups
                }
            },
            submitValues() {
                if (this.value !== '') {
                    this.newLeft = this.users[this.currentUserIndex].left - this.value
                    if (this.newLeft >= 0) {
                        this.users[this.currentUserIndex].left = this.newLeft
                        
                    }
                    this.users[this.currentUserIndex].value.push(this.value)
                    this.newLeft=0
                    this.value = ""
                    if (this.isGameFinished()) {
                        this.calculateScore()
                    }
                    // Passez au prochain utilisateur
                    this.currentUserIndex = (this.currentUserIndex + 1) % this.users.length;
                }
            },
            isGameFinished() {
                if (this.users[this.currentUserIndex].left == 0) {
                    return true;
                }
                return false
            },
            calculateScore() {
                for (let i = 1; i < this.users[this.currentUserIndex].value.length; i++ ) {
                    this.shots+=1
                }
                this.users[this.currentUserIndex].shots = this.shots
                this.winner = this.users[this.currentUserIndex]
                this.gameFinished = true
            }
        }
    }

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
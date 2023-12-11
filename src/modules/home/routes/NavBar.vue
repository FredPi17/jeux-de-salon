<template>
    <main>
        <div class="navbar">
            <RouterLink :to="'/'">Accueil</RouterLink>
            <router-link :to="'/bigger'">Bigger score</router-link>
            <router-link :to="'/countdown/301'">Countdown 301</router-link>
            <router-link :to="'/countdown/501'">Countdown 501</router-link>
            <router-link :to="'/stats'">Stats</router-link>
        </div>
    </main>

</template>

<script>
export default {
}
</script>

<style>
.navbar {
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

/* Styles des liens de la barre de navigation */
.navbar a {
  color: #fff;
  text-decoration: none;
  padding: 10px;
  font-size: 16px;
}

/* Style au survol des liens */
.navbar a:hover {
  background-color: #555;
  color: #fc0; /* Couleur au survol */
}

/* Style du lien actif (la page courante) */
.navbar a.router-link-exact-active {
  border-bottom: 2px solid #fc0; /* Bordure en bas pour indiquer le lien actif */
  color: #fc0;
}
</style>

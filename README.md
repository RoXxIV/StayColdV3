# StayColdV3

## Pourquoi ce projet ?

Amateur de baignade en eau froide depuis quelques années et dans le cadre de mon apprentissage **VueJS** / **NodeJS**,  
je développe une application permettant aux motivés qui me suivent et à moi-même d’enregistrer nos baignades  
afin d’en tirer quelques statistiques et pourquoi pas les optimiser par la suite.

## objectif

- un utilisateur doit pouvoir crer un compte, se connecter grace à une authentification sécurisé et ainsi être identifié par un token unique
- un utilisateur (connecté) doit pouvoir enregistrer une baignade avec un certain nombre d'informations
- un utilisateur doit également être en mesure de modifier ou supprimer ses baignades
- un utilisateur (connecté) à accès a une page de profil personnel regroupant un certain nombre d'informations et statistiques concernant ses baignades
- un utilisateur (connecté ou non) peut afficher les baignades des autres utilisateur.
- une section de cette application sera dédié au bénéfices de la baignade en eau froide avec pour chacun, l'article scientifique associé d'entre eux
- ...

Démonstration du projet, déployé avec **Heroku** [Link](https://staycold.herokuapp.com/)

# MEVN stack

### **MongoDB** - **Express** - **Vuejs 3** - **NodeJS**

## Backend

node version: 14.15.4

## Frontend

Vue js version : vue@3.2.26

# Installation

- Créer un fichier.env

```
MONGO_URI=<Lien de connexion a mongodb>
SECRET=<chaine de caractères utilisés par jsonwebtoken>
USER_MAIL=<email>
USER_MAIL_SECRET=<Mot de passe associé à l'email>
```

- Dans _server.js_ supprimez les commentaires avant : `// require("./plugin/init-roles")();``afin d'enregistrer les Rôles utilisateurs
  en bdd lors de la première connexion.

```
npm install
node server.js
cd client
npm install
npm run serve
```

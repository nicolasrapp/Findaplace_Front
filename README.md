# Projet Java: Spot

## Description

Notre projet, baptisé "Spot", est une application web dédiée à la notation et à la rédaction d'avis sur des restaurants, bars et cafés. L'idée centrale est de créer une carte interactive qui se remplit au fur et à mesure que les utilisateurs découvrent de nouveaux endroits et partagent leurs avis.

## Fonctionnalités

### 1. Création de compte et gestion d'amis

- Les utilisateurs peuvent créer leur compte personnel.
- Ajout d'amis en tant qu'"abonnés" sur la page profil.

### 2. Carte interactive

- Une carte interactive affiche tous les "spots" notés par les utilisateurs.
- En cliquant sur un spot, les utilisateurs peuvent accéder à un résumé détaillé et être dirigés vers sa page récapitulative.
- On peut autoriser la localisation et se retrouver sur la carte.

### 3. Ajout de nouveaux spots

- Possibilité d'ajouter un nouveau spot via un formulaire d'entrée d'adresses.
- Le formulaire facilite la recherche du spot, permettant aux utilisateurs de le noter et de laisser un commentaire.
- Celui-ci est centralisé par rapport à la localisation de l'utilisateur (si il l'autorise) et permet de recommander des adresses proches de l'où on se trouve.

### 4. Gestion des spots notés

- La page "mes adresses" récapitule tous les spots notés par l'utilisateur.
- Sous la carte, vous retrouverez également les dernières activités de vos amis, leurs dernières découvertes

# Comment lancer le projet ? 

1. Clone le repo front: https://github.com/nicolasrapp/Findaplace_Front
2. Clone le repo back: https://github.com/Leocomte01/FindaPlaceBack
3. Créer dans IntelliJ la DB pour le back avec postgres et s'assurer du nom de la DB dans application.properties
4. Run les scripts SQL du fichier InitBDD pour initialiser les tables, les données et la création d'IDs dans l'ordre.
6. Dans un terminal à la racine du back, run
   ``` docker compose up ```
9. Run l'application SpringBoot
10. Dans un terminal à la racine du front, run
11. ``` npm install ```
12. Dans un terminal à la racine du front, run
    ``` ng serve ```
13. Dans un navigateur, entrer l'adresse http://localhost:4200/

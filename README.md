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
- A coté de la carte, vous retrouverez également les dernieres activités de vos amis, leurs dernieres découvertes.

### 3. Ajout de nouveaux spots

- Possibilité d'ajouter un nouveau spot via un formulaire d'entrée d'adresses.
- Le formulaire facilite la recherche du spot, permettant aux utilisateurs de le noter et de laisser un commentaire.

### 4. Gestion des spots notés

- La page "mes adresses" récapitule tous les spots notés par l'utilisateur.

# Comment faire marcher le projet ? 

1. Clone le repo front: https://github.com/nicolasrapp/Findaplace_Front
2. Clone le repo back: https://github.com/Leocomte01/FindaPlaceBack
3. Creer dans IntelliJ la DB pour le back avec postgres et s'assurer du nom de la DB dans application.properties
4. dans un terminal a la racine du back: docker compose up
5. Run l'application SpringBoot
6. dans un terminal a la racine du front: ng serve

// filter-users.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

/* filtre qui permet de trier les utilisateurs selon leur orthographe */

// Définition du filtre personnalisé
@Pipe({
  name: 'filterUsers' // Nom du filtre utilisé dans les templates Angular
})
export class FilterUsersPipe implements PipeTransform {
  // Méthode transform obligatoire pour tout filtre personnalisé
  transform(users: any[], searchQuery: string): any[] {
    // Si la requête de recherche est vide ou non définie, retourne la liste complète d'utilisateurs
    if (!searchQuery || searchQuery === '') {
      return users;
    }

    // Convertit la requête de recherche en minuscules pour rendre la recherche insensible à la casse
    searchQuery = searchQuery.toLowerCase();

    // Filtre les utilisateurs dont le nom d'utilisateur inclut la requête de recherche
    return users.filter((user) => user.user_name.toLowerCase().includes(searchQuery));
  }
}

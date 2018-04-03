# Mower Application

Ce projet est généré avec [Angular CLI](https://github.com/angular/angular-cli) version 1.6.6.

Integration de [Redux](https://redux.js.org) 

Les tests tests effectués avec [Karma](https://karma-runner.github.io)

## Execution de l'application

**Avant de lancer l'application pour la première fois `npm install` pour récupérer les dépendances nécessaires**


Pour lancer l'application, il suffit d'executer la commande suivante : 

`ng serve`

*L'application est accessible via le lien suivant `http://localhost:4200/`*


Lancement des tests  avec la commande suivante :

`ng test`




## Utilisation de l'application
1. Comme entrée vous devez choisir un fichier texte
2. Le contenu du fichier est vérifié

### Format du fichier
Nombre de lignes : 
1 ligne pour les dimensions de la grille (2 chiffres)
2 lignes pour chaque Mower ajouté
  - 1ere ligne qui va contenir la position initiale du mower, 
    - Le format [DIGIT DIGIT POSITION{'N','E','W','S'}] exemple : **1 4 S**
  - 2eme ligne qui va contenir les actions à utiliser pour le mower concerné 
    - Les digits acceptés sont : [L:Gauche, R:Droite, M:Avancer] exemple : **RLMMRLMLR**

### Exemple de fichier 
**_Vous trouvez un fichier exemple txt dans le répertoire_**

5 5

3 3 E
MMRMMRMRRM

1 2 N


GAGAGAGAA

Résultat : 

5 1 E

1 3 N

### Remarques


1. L'application gère les actions en anglais et en français, LRM pour anglais et AGD pour le français
2. L'application parse les donnés du fichier, il faut veiller à respecter les notes définies dans le fichier readme
3. L'application gère les lignes vides.

**N.B**  Dans L'enoncé du kata, on trouve qu'un mower est défini en 2 lignes, dois-je gérer le cas où un mower aura juste sa position de départ sans actions, je me demande s'il peut y avoir un cas avec un mower juste défini dans une seule ligne qui est sa position initiale
**N.B**

`ScreenShot.png`

Visuel de l'application

## Navigateurs supportés <sub><sup><sub></sub></sup></sub>

| [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- |
| Dernières 2 versions| Dernières 2 versions| Dernières 2 versions|


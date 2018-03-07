# Mower Application

Ce projet est généré avec [Angular CLI](https://github.com/angular/angular-cli) version 1.6.6.


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

1 2 N

LMLMLMLMM

Résultat : 

1 3 N

## Navigateurs supportés <sub><sup><sub></sub></sup></sub>

| [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- |
| Dernières 2 versions| Dernières 2 versions| Dernières 2 versions|
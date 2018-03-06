# Mower Application

Ce projet est généré avec [Angular CLI](https://github.com/angular/angular-cli) version 1.6.6.


Les tests tests effectués avec [Karma](https://karma-runner.github.io)

## Execution de l'application

Pour lancer l'application, il suffit d'executer `ng serve`, l'application est accessible via le lien suivant `http://localhost:4200/`

Les tests : executer la commande suivante `ng test` , une page automatique sera ouverte



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

5 5

1 2 N

LMLMLMLMM


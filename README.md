# Miniprojet

## Prérequis
Pour pouvoir lancer le projet, il faut une base de donnée mongodb d'installer.
Les dépendances doivent être installé en utilisant la commande suivante.
```sh
npm i 
```

## Serveur
Les sources du serveur se trouve dans apps/backend

La ligne de commande pour lancer le serveur est
```sh
npx nx serve backend
```

La ligne de commande pour creer un bundle est
```sh
npx nx build backend
```

La configuration du serveur est dans le fichier apps/backend/.env
```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/kraken
```

## Client
Les sources du client se trouve dans apps/miniprojet

La ligne de commande pour lancer le serveur est
```sh
npx nx serve miniprojet
```

La ligne de commande pour creer un bundle est
```sh
npx nx build miniprojet
```

La configuration du client est dans le fichier apps/miniprojet/src/environments/environment.ts
```
export const environment = {
  production: true,
  serverUrl: 'http://localhost:3000',
};
```

# Utilisation de l'image officielle Node.js
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /

# Copier les fichiers de package et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["nx", "serve", "backend"]

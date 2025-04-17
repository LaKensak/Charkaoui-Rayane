
# Mon Projet React avec Vite

Ce projet utilise **React** avec **Vite** pour une configuration rapide avec le support de HMR (Hot Module Replacement). Deux plugins officiels sont disponibles pour la gestion du Fast Refresh :
- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)** : Utilise **Babel** pour le Fast Refresh.
- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)** : Utilise **SWC** pour le Fast Refresh.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre machine :
- [Node.js](https://nodejs.org/) (Version 14+)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Installation

Clonez le dépôt et installez les dépendances :

```bash
git clone https://github.com/ton-utilisateur/mon-projet-react.git
cd mon-projet-react
npm install
```

## Lancement en mode développement

Pour démarrer le serveur de développement avec Vite et HMR (Hot Module Replacement), exécutez :

```bash
npm run dev
```

Cela lancera votre application à l'adresse `http://localhost:5173`.

## Linting avec ESLint

Ce projet utilise **ESLint** pour maintenir un code propre et cohérent. Vous pouvez exécuter l'outil de linting avec :

```bash
npm run lint
```

Si vous voulez corriger automatiquement certains problèmes :

```bash
npm run lint -- --fix
```

## Build pour la production

Pour créer une version optimisée du projet pour la production :

```bash
npm run build
```

Cela générera les fichiers optimisés dans le dossier `dist`, prêts à être déployés.

## Plugins

### Plugin avec Babel (par défaut)

Le projet utilise le plugin **@vitejs/plugin-react** basé sur Babel. Si vous souhaitez l'installer manuellement, vous pouvez le faire avec :

```bash
npm install @vitejs/plugin-react --save-dev
```

Assurez-vous que votre fichier `vite.config.js` contient :

```js
import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
};
```

### Plugin avec SWC (optionnel)

Si vous préférez utiliser **SWC** à la place de Babel pour le Fast Refresh, vous pouvez installer le plugin correspondant :

```bash
npm install @vitejs/plugin-react-swc --save-dev
```

Modifiez ensuite votre fichier `vite.config.js` pour utiliser le plugin SWC :

```js
import react from '@vitejs/plugin-react-swc';

export default {
  plugins: [react()],
};
```

## Scripts disponibles

- `npm run dev` : Démarre le serveur de développement.
- `npm run build` : Compile l'application pour la production.
- `npm run lint` : Exécute ESLint sur le code source.
- `npm run preview` : Lance un aperçu local de la build de production.

## License

[MIT](./LICENSE)

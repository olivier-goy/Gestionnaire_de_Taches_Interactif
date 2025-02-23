# Gestionnaire_de_Taches_Interactif
# Rapport Explicatif du Test Technique

## 1. Introduction

Ce document présente une explication détaillée des étapes suivies pour le développement de l'application, les choix techniques et stylistiques adoptés, ainsi que les difficultés rencontrées et les solutions mises en place. L'objectif du test technique était de concevoir une application permettant la gestion et l'affichage des tâches avec des fonctionnalités avancées telles que la recherche, le filtrage et le tri.

## 2. Étapes suivies pour le développement

### 2.1 Initialisation du projet

- Mise en place de l'architecture **MVC** (Modèle - Vue - Contrôleur) pour assurer une séparation claire des responsabilités.
- Conception du modèle de données pour structurer efficacement les informations relatives aux tâches, en définissant une organisation claire et cohérente des attributs et relations entre les données.
- Utilisation des méthodes **Agile** pour organiser et découper les tâches de développement afin de progresser efficacement malgré le travail en solo.
- Réalisation d'une **maquette** et d'une **charte graphique** afin de définir l'identité visuelle et l'ergonomie du projet.
- Mise en place du versionnage du code avec **Git** et utilisation de **GitHub** pour le stockage et le suivi des modifications.
- Création des fichiers nécessaires : modèle (**ModelHomePage**), vue (**ViewHomePage**) et contrôleur (**ControllerHomePage**).
- Hébergement de l'application sur **Vercel** pour assurer un accès en ligne et tester les déploiements.

### 2.2 Développement des fonctionnalités principales

- **Ajout d'une tâche** : Création d'un formulaire permettant d'ajouter une tâche avec différents attributs (titre, description, date, priorité, état).
- **Affichage des tâches** : Mise en place du rendu dynamique des tâches stockées.
- **Modification et suppression** : Ajout de boutons d'édition et de suppression pour permettre la gestion des tâches existantes.

### 2.3 Implémentation des filtres et de la recherche

- **Recherche par titre** : Ajout d'un champ de recherche permettant de filtrer les tâches en fonction de leur titre.
- **Filtrage par statut et priorité** : Implémentation d'un système de tri pour afficher les tâches selon leur priorité et leur état (en cours, terminées).
- **Synchronisation des filtres et de la recherche** : Mise en place d'une logique combinée permettant d'appliquer les filtres et la recherche simultanément.

### 2.4 Ajout des fonctionnalités supplémentaires

- **Gestion des alertes** : Avertissement pour les tâches dépassées ou à terminer aujourd'hui.
- **Affichage dynamique** : Mise à jour automatique de l'interface utilisateur après chaque action de l'utilisateur.
- **Réinitialisation des filtres** : Ajout d'un bouton permettant de réinitialiser tous les critères de tri et de recherche.
- **Affichage de la progression des tâches** : Implémentation d'une barre de progression pour chaque tâche en fonction de son état (en cours, terminée). Cela permet à l'utilisateur de suivre facilement l'avancement de ses tâches.
- **Responsivité du site** : Adaptation de l'interface pour une utilisation optimale sur tous types d'écrans (ordinateurs, tablettes, mobiles).

## 3. Choix techniques et stylistiques

### 3.1 Technologies utilisées

- **JavaScript (ES6+)** : Langage principal utilisé pour la logique métier et l'interaction avec le DOM.
- **LocalStorage** : Utilisé pour stocker les tâches de manière persistante, facilitant leur manipulation et leur affichage dans l'application.
- **HTML/CSS** : Structuration et mise en forme de l'interface utilisateur.
- **Git/GitHub** : Utilisation de Git pour le suivi des versions et GitHub pour l'hébergement du code et le partage du code.
- **Vercel** : Hébergement de l'application pour un accès en ligne et un déploiement facilité.

### 3.2 Style et organisation du code

- **Architecture MVC** : Organisation du code en trois couches distinctes (Modèle, Vue, Contrôleur) pour une meilleure maintenabilité.
- **Modularité** : Séparation des fonctionnalités en méthodes distinctes pour faciliter la lisibilité et la réutilisation du code.
- **Utilisation de fonctions pures** : Adoption de fonctions pures pour éviter les effets de bord et rendre le code plus prévisible.

## 4. Difficulté rencontrée et solution apportée

- **Problème** : Lorsque la recherche et le filtrage étaient appliqués ensemble, certaines tâches restaient affichées incorrectement.
- **Solution** : Création d'une méthode `applySearchAndFilter()` pour appliquer simultanément la recherche et les filtres et garantir que seul l'intersection des résultats soit affichée.

## 5. Liens utiles pour le projet

- **GitHub** : [Lien vers le dépôt GitHub](https://github.com/olivier-goy/Gestionnaire_de_Taches_Interactif)
- **Lien du site** : [Accéder à l'application en ligne](https://gestionnaire-de-taches-interactif.vercel.app/)

## 6. Conclusion

Le développement de cette application a permis de mettre en œuvre une architecture **MVC** bien structurée et d'implémenter des fonctionnalités avancées de gestion des tâches. L'utilisation des méthodes **Agile** a permis un découpage efficace des tâches pour organiser le travail de manière progressive et optimisée. De plus, l'utilisation de **Git** et **GitHub** a facilité le suivi des versions et la gestion du code source, tandis que **Vercel** a permis un hébergement rapide et un déploiement efficace. Les principales difficultés ont été résolues par une approche méthodique et une organisation rigoureuse du code. Ce projet met en avant l'importance d'une bonne séparation des responsabilités et d'une mise à jour efficace de l'affichage dynamique.

# 🍹 Boeny Nectar - Landing Page

Bienvenue sur le dépôt officiel du projet **Boeny Nectar**, une vitrine web moderne, élégante et dynamique conçue pour une marque artisanale de jus de fruits naturels basés à Mahajanga, Madagascar.

## 🌟 Présentation
Ce projet est une "Landing Page" (page d'atterrissage) e-commerce statique mais rendue dynamique grâce à une architecture centralisée basée sur du **JSON**. La majorité du contenu textuel, des produits, de la FAQ et des liens de réseaux sociaux sont gérés depuis un fichier de données unique (`data.json`). Cela permet des mises à jour extrêmement rapides du site sans avoir besoin de manipuler le code HTML.

## ✨ Fonctionnalités Principales
* **Design 100% Responsive** : S'adapte parfaitement à tous les écrans (Mobiles, Tablettes, Ordinateurs de bureau) grâce à l'utilisation de Bootstrap 5.
* **Contenu Dynamique** : Injection des données (produits, témoignages, avantages, etc.) de manière asynchrone via l'API `fetch` en JavaScript.
* **Commandes Multi-canaux (Frictionless UX)** : Une fenêtre modale intuitive permettant aux clients de passer commande en un seul clic via leurs réseaux préférés :
  * WhatsApp (avec message par défaut pré-rempli)
  * SMS Direct (avec message par défaut pré-rempli)
  * Email (avec objet et corps du message pré-remplis)
  * Messenger, Instagram, et LinkedIn.
* **Alerte de Sécurité Mobile Money** : Intégration d'une notice d'alerte visuelle (UI Alert) pour exiger les références de paiement (MVola, Orange Money, Airtel Money).
* **Formulaire de Contact Dédié** : Une page de contact secondaire (`email_Javascript.html`) avec validation des champs.

## 🛠️ Technologies Utilisées
* **HTML5** : Structure sémantique.
* **CSS3 & Bootstrap 5.3** : Habillage visuel, animations au défilement (Scroll Reveal), composants interactifs et système de grille.
* **Vanilla JavaScript (ES6)** : Logique de récupération des données JSON, création dynamique du DOM, et gestion du comportement de la barre de navigation.
* **JSON** : Stockage "Base de données" du contenu de la page.

## 📂 Structure du Projet

├── images/                 # Dossier contenant toutes les ressources visuelles (Hero, produits)
├── index.html              # Page d'accueil principale (Single Page Application)
├── email_Javascript.html   # Page secondaire du formulaire de contact
├── style.css               # Feuille de style personnalisée (animations, ombres, ajustements UX)
├── script.js               # Script principal (récupération JSON, génération HTML, IntersectionObserver)
└── data.json               # Base de données racine de tout le contenu du site


## 🚀 Installation & Utilisation en Local
Étant donné que le site utilise la fonction native `fetch()` pour charger le fichier `data.json`, il doit être exécuté sur un serveur local pour contourner les politiques de sécurité CORS des navigateurs modernes.

Pour tester le projet en local :
1. Clonez ce dépôt : 
   `git clone https://github.com/Mariogit20/boeny-nectar.git`
2. Ouvrez le dossier dans votre éditeur de code préféré (ex: Visual Studio Code).
3. Lancez un serveur local (il est recommandé d'utiliser l'extension **Live Server** sur VS Code).

## 🌐 Déploiement
Ce projet est entièrement compatible et optimisé pour un hébergement statique gratuit via **GitHub Pages**.

---
*Développé avec passion par Mario | DEV*
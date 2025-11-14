# MiniReseaux

Un projet web simple pour afficher des profils d'utilisateurs avec leurs informations, avatars, et centres d'intérêt. Ce projet est développé avec HTML, CSS et JavaScript et il permet de naviguer entre une liste d'utilisateurs et leurs profils en details.

# Installation

1- Ouvrir le projet
Accédez au dossier du projet sur votre ordinateur.

2- Installer Live Server (si vous ne l'avez pas déjà)

Ouvrez Visual Studio Code

Allez dans l'onglet Extensions

Recherchez Live Server et installez-le

3- Lancer le projet

Faites un clic droit sur le fichier index.html

Sélectionnez "Open with Live Server"

Le projet s'ouvrira automatiquement dans votre navigateur

# Utilisation

Une fois le projet lancé avec Live Server, vous pouvez :

1- Voir la liste des utilisateurs
Sur la page principale (index.html), tous les utilisateurs sont affichés sous forme de cartes avec leur avatar, nom et ville.

2- Accéder au profil détaillé d’un utilisateur
Cliquez sur une carte utilisateur pour ouvrir sa page de profil (profile.html).  
Sur cette page, vous pouvez voir :
L'avatar en grand
Le nom complet
L'âge
La ville
Les centres d'intérêt
La biographie

3- Retour à la liste des utilisateurs
Sur chaque page de profil, un lien "Retour aux utilisateurs" est disponible en bas de la carte pour revenir à la page principale.

# Notes importantes

Les fichiers JSON ne peuvent pas être chargés directement via file:// donc on utilise un serveur local obligatoirement.

Le projet est entièrement en HTML, CSS et JavaScript pur, aucune base de données ni backend n’est nécessaire et pas de framework bien evidemment.

Voici mon projet BI
Le htmlgenerator.py génère une page html avec des données csv contenues dans le dossier data. Les fichier doivent suivre le schéma de nommage suivant [champs optionnels]: mois-jour-année-[heure]_[minute]_[secondes]-catégories_magasin.csv
On peut, en cliquant sur les titres de colonne, trier le tableau en fonction de la collonne sur laquelle on a cliqué.
En cliquant sur un produit on a les prix de ce produit dans les autres magasins et pour les autres jours.
On navigue sur la gauche sur les différents tableaux.

Bugs:
	les litres ne sont pas bien comptés
	le tri du tableau ne marche pas si une case n'a pas de valeur (pas de litre ni de poids par exemple)

Fonctionnalités abandonnées par manque de temps:
	une moyenne de tous les prix d'une certaine catégorie et d'un magasin + aggrégation de toutes les moyennes
	Menu mieux rangé sur la gauche
	fonction filtre pour filtrer un tableau (par nom, poids ou volume)
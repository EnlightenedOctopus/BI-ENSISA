__Voici mon projet BI__
Le htmlgenerator.py génère une page html avec les fichier .csv contenus dans le dossier data. Les fichier doivent suivre le schéma de nommage suivant [champs optionnels]: __mois-jour-année-[heure]\_[minute]\_[secondes]-catégories_magasin.csv__
On peut, en cliquant sur les titres de colonne, trier le tableau en fonction de la collonne sur laquelle on a cliqué.
En cliquant sur un produit on a les prix de ce produit dans les autres magasins et pour les autres jours.
On navigue sur la gauche entre les différents tableaux.

__Bugs(et points à améliorer):__
	- les litres ne sont pas bien comptés
	- le tri du tableau ne marche pas si une case n'a pas de valeur (pas de litre ni de poids par exemple)

__Fonctionnalités abandonnées par manque de temps:__
	Une moyenne de tous les prix d'une certaine catégorie et d'un magasin + aggrégation de toutes les moyennes
	Menu mieux rangé sur la gauche
	Fonction filtre pour filtrer un tableau (par nom, poids ou volume)
	Meilleur gestion du poids et du volume (cas où on a 6x125g par ex)

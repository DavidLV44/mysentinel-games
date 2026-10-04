# MySentinel Games — mémoire du projet

Mini-jeux web gratuits (PWA) de David Le Verge, sous la marque MySentinelSolutions (MSS).
Jeux : "Arnaque ou pas ?" (dispo) et "Chasse au gaspi" (à construire).

## Règles du projet
- Tout en français, ton rassurant, pédagogue, un peu fun/décalé. Public : jeunes adultes + parents connectés.
- Coût zéro : site statique (HTML/CSS/JS vanilla), pas de build, pas de serveur, hébergé sur GitHub Pages.
- Marque : minimaliste, coins arrondis, ombres douces, Roboto, vert #008080.
- Contenu fictif uniquement : domaines en `.example`, aucun vrai logo/marque, aucun lien actif dans les arnaques.
- Transparence affiliation obligatoire sur toute page avec lien affilié.
- Respecter `prefers-reduced-motion` pour les animations.

## Structure
- `index.html` : accueil (hero, cartes des jeux, newsletter).
- `arnaque/index.html` + `arnaque/data.js` : jeu et ses 34 questions (`window.GAME`).
- `assets/engine.js` : moteur (deck quotidien, niveaux, indice, rattrapage, score, partage).
- `assets/mockups.js` : rendu réaliste des écrans (sms, email, appel, video, reseau, annonce, appli, rue, enceinte).
- `assets/illus.js` : pictogrammes SVG. `assets/style.css` : design et animations.
- `manifest.webmanifest`, `sw.js` : PWA (penser à incrémenter la version de cache `msg-vN` à chaque modif d'assets).
- `mentions.html` : placeholders [À COMPLÉTER] à remplir par David.

## À faire
- Construire "Chasse au gaspi" (~20 questions A ou B, chaque chiffre avec source + date) avec le même moteur (`q.options`, `G.render`).
- Vérifier avant publication : 33700, cybermalveillance.gouv.fr, chiffres ADEME.
- Brancher newsletter (Brevo/MailerLite) et lien affilié Awin quand David les fournit.

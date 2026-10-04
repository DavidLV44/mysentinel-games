/* Arnaque ou pas ? — extension du contenu (niveaux + faits divers sourcés)
   - Chaque question a un niveau : "debutant", "inter" ou "expert". Un niveau = son propre paquet de questions.
   - `fact` : fait réel, avec sa source cliquable. `protect` : gestes concrets pour se protéger.
   - Tous les messages restent FICTIFS (noms, numéros et domaines inventés, en .com/.fr).
   Vérifier avant publication qu'aucun domaine inventé n'est enregistré par un tiers (WHOIS). */
(function () {
  var Q = window.GAME.questions;

  /* ----- faits divers rattachés à des questions existantes (par position dans data.js) ----- */
  var FACTS = {
    0: {
      fact: { t: "Les arnaqueurs vont jusqu'à envoyer de fausses photos de colis générées par IA pour que le message paraisse crédible.", src: "Bercy Infos (economie.gouv.fr)", url: "https://www.economie.gouv.fr/node/3242091" },
      protect: ["Ne clique pas : suis ton colis depuis l'appli ou le site du vendeur, adresse tapée à la main", "Signale le SMS au 33700", "Carte saisie par erreur ? Fais opposition tout de suite auprès de ta banque"]
    },
    3: {
      fact: { t: "Fin 2023, une cliente bretonne a reçu un message qui semblait venir du numéro de sa banque. Guidée par l'escroc, elle a validé elle-même des opérations pour plus de 10 000 €.", src: "INC (Institut national de la consommation)", url: "https://www.inc-conso.fr/content/banque/arnaques-aux-faux-conseillers-bancaires-des-victimes-bretonnes-flouees-de-plus-de-10-000-eu" },
      protect: ["Raccroche, puis rappelle ta banque via l'appli ou le numéro au dos de ta carte", "Ne valide jamais une opération que tu n'as pas lancée toi-même", "Fais opposition et signale au 33700"]
    },
    9: {
      fact: { t: "Le faux support technique est l'une des grandes menaces pour les particuliers : le parquet de Paris a reçu 585 plaintes en 2023, pour environ 374 000 € de préjudice.", src: "Microsoft, Cybermalveillance.gouv.fr et le parquet de Paris", url: "https://news.microsoft.com/source/emea/2025/07/microsoft-cybermalveillance-gouv-fr-et-la-section-de-lutte-contre-la-cybercriminalite-du-parquet-de-paris-appellent-a-se-mobiliser-contre-les-arnaques-au-faux-support-technique/?lang=fr" },
      protect: ["Un vrai fournisseur ne t'appelle jamais de lui-même pour un « virus »", "N'installe aucun logiciel de prise en main à distance sur demande d'un inconnu", "Déjà donné l'accès ? Coupe Internet, change tes mots de passe, préviens ta banque"]
    },
    24: {
      fact: { t: "Fin 2023, l'ANTS a alerté sur de faux avis de contravention portant un QR code. Aucun vrai PV ne comporte de QR code de paiement.", src: "L'Automobiliste", url: "https://lautomobiliste.fr/30/11/2023/arnaque-qrcode-faux-pv-illegaux-quishing-contravention/" },
      protect: ["Ne scanne pas un QR code collé ou glissé là où il n'a rien à faire", "Pour une amende, tape toi-même l'adresse du site officiel", "Signale au 33700 ou à la gendarmerie"]
    },
    26: {
      fact: { t: "Fin 2020, des faux démarcheurs prétendaient que les droits CPF allaient expirer. La Caisse des dépôts a déposé des plaintes visant 21 prestataires.", src: "Centre Inffo", url: "https://www.centre-inffo.fr/?p=375093" },
      protect: ["Ne donne jamais tes identifiants CPF à quelqu'un qui t'appelle ou t'écrit", "Connecte-toi seul au site officiel, adresse tapée à la main", "Signale le démarchage abusif au 33700 ou à la DGCCRF"]
    },
    28: {
      fact: { t: "En 2024, un employé de l'entreprise Arup, à Hong Kong, a participé à une visio où le directeur financier et ses collègues étaient des deepfakes. Il a fait 15 virements, soit environ 25,6 millions de dollars.", src: "CNN", url: "https://edition.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk" },
      protect: ["Valide tout virement inhabituel par un autre canal (rappel sur un numéro connu)", "Choisis un mot de passe de famille ou d'équipe pour les urgences", "Pose une question que seule la vraie personne peut connaître"]
    },
    31: {
      fact: { t: "En 2025, la presse a rapporté qu'une Française avait versé 830 000 € à un faux acteur célèbre sur les réseaux sociaux en un an, avec des photos et vidéos générées par IA. Une enquête a été ouverte.", src: "Paris Match Belgique", url: "https://www.parismatch.be/actualites/people/2025/01/13/anne-pensait-avoir-une-relation-avec-brad-pitt-elle-divorce-et-se-fait-escroquer-de-830-000-euros-4PRKTEXB4JAZFG36JEFN7BWDTI/" },
      protect: ["Une star ne demande jamais d'argent : stop dès la première demande", "Fais une recherche d'image inversée et vérifie le compte officiel certifié", "Parles-en à un proche avant tout paiement, et signale le profil"]
    }
  };
  Object.keys(FACTS).forEach(function (i) {
    if (Q[i]) { Q[i].fact = FACTS[i].fact; Q[i].protect = FACTS[i].protect; }
  });

  /* ----- nouvelles questions ----- */
  var NEW = [
    /* ===== DÉBUTANT ===== */
    {
      level: "debutant", img: "cadeau", channel: "email", from: "Billetterie Jeux <gagnant@billets-ceremonie-2024.com>", subject: "Félicitations : 2 billets gratuits pour la cérémonie !",
      marks: ["2 billets gratuits", "4,90 € de frais d'envoi", "places papier"], answer: "arnaque",
      body: "Bravo ! Vous êtes sélectionné(e) pour recevoir 2 billets gratuits pour la grande cérémonie d'ouverture.\n\nIl suffit de régler 4,90 € de frais d'envoi pour recevoir vos places papier :\n\n[[Recevoir mes billets]]",
      explain: "« Gratuit », mais il faut payer des frais : c'est le piège. Les frais d'envoi ne servent qu'à récupérer ta carte bancaire. Et pour cet événement, il n'existait même pas de billets papier.",
      clues: ["Un cadeau « gratuit » qui demande de payer", "Des billets papier alors que tout est dématérialisé", "Adresse d'expéditeur sans lien avec la billetterie officielle"],
      tip: "N'achète tes billets que sur la billetterie officielle de l'événement.",
      fact: { t: "En mai 2024, la DGCCRF a alerté sur de faux courriels promettant des billets gratuits pour la cérémonie d'ouverture des JO de Paris contre de simples frais de port.", src: "Que Choisir", url: "https://www.quechoisir.org/actualite-jeux-olympiques-paris-2024-attention-a-l-arnaque-aux-faux-billets-gratuits-pour-la-ceremonie-d-ouverture-n124306/" },
      protect: ["Achète uniquement sur le site officiel de l'événement", "Ne donne jamais ta carte pour recevoir un cadeau", "Signale le mail sur Signal Spam ou au 33700"]
    },
    {
      level: "debutant", img: "sante", channel: "sms", from: "Assur-Santé", marks: ["arrive à expiration", "gratuitement", "coordonnées bancaires pour les frais d'envoi"], answer: "arnaque",
      body: "Votre carte Vitale arrive à expiration. Commandez la nouvelle gratuitement en confirmant votre identité et vos coordonnées bancaires pour les frais d'envoi : [[http://carte-vitale-renouvel.fr/commande]]",
      explain: "La carte Vitale n'expire pas et n'a pas besoin d'être « renouvelée » par SMS. Là encore, « gratuit » + coordonnées bancaires = piège à données.",
      clues: ["Une démarche qui n'existe pas", "Des données bancaires demandées pour quelque chose de « gratuit »", "Lien vers un site inconnu"],
      tip: "Pour toute démarche de santé, passe par ton compte personnel sur le site officiel de l'Assurance Maladie.",
      fact: { t: "Dès janvier 2022, des SMS et mails ont proposé de « commander une nouvelle carte Vitale ». L'Assurance Maladie a confirmé qu'aucune campagne de renouvellement n'existait.", src: "Connexion France", url: "https://connexionfrance.com/French-news/Carte-Vitale-scam-People-in-France-warned-over-fake-emails-and-texts" },
      protect: ["Ne réponds jamais à un SMS qui demande tes données bancaires", "Passe par ton compte officiel, adresse tapée à la main", "Signale au 33700"]
    },
    {
      level: "debutant", img: "ordi", channel: "email", from: "Alex Moreau <contact@secur-vid3o-alerte.com>", subject: "J'ai une vidéo de vous", marks: ["J'ai piraté votre ordinateur", "500 € en bitcoins", "sous 48 h"], answer: "arnaque",
      body: "J'ai piraté votre ordinateur et enregistré une vidéo compromettante de vous.\n\nEnvoyez 500 € en bitcoins sous 48 h, sinon elle sera envoyée à tous vos contacts.",
      explain: "C'est un message de masse envoyé à des milliers de personnes. Il n'existe aucune vidéo. Si on cite un de tes vieux mots de passe, il vient d'une fuite de données, pas d'un piratage de ton ordinateur.",
      clues: ["Aucune preuve précise, message générique", "Paiement en cryptomonnaie avec compte à rebours", "Menace d'envoyer à tes contacts"],
      tip: "Ne réponds pas, ne paie pas. Change le mot de passe cité et active la double authentification.",
      fact: { t: "En trois semaines de janvier 2019, plus de la moitié des demandes d'aide reçues par Cybermalveillance portaient sur ce chantage à la webcam : 13 389 demandes sur 22 500.", src: "Que Choisir", url: "https://www.quechoisir.org/actualite-arnaque-recrudescence-de-chantage-a-la-webcam-n63483" },
      protect: ["Ne réponds pas et ne paie pas", "Change les mots de passe cités et active la double authentification", "Signale sur Cybermalveillance.gouv.fr ou Pharos"]
    },
    {
      level: "debutant", img: "badge", channel: "email", from: "Direction centrale <convocation@gendarmerie-protection-mineurs.com>", subject: "Convocation : procédure en cours", marks: ["Cher internaute", "copie de votre passeport", "sous 72 h"], answer: "arnaque",
      body: "Cher internaute,\n\nVous faites l'objet d'une procédure. Répondez sous 72 h avec une copie de votre passeport, sinon une convocation sera émise.\n\nLa direction centrale",
      explain: "Une accusation grave ne se notifie jamais par simple e-mail. Le but : te faire peur pour obtenir une pièce d'identité ou de l'argent.",
      clues: ["Salutation « Cher internaute »", "Pièce d'identité demandée par mail", "Adresse en .com, alors que les administrations utilisent .gouv.fr"],
      tip: "Une administration te convoque par courrier officiel, pas par un mail menaçant. Ne réponds pas.",
      fact: { t: "En octobre 2025, la Gendarmerie a alerté sur de faux courriels signés d'une « Brigade de protection des mineurs », avec de faux sceaux officiels.", src: "Journal du Geek", url: "https://www.journaldugeek.com/2025/10/13/cet-e-mail-de-la-brigade-de-protection-des-mineurs-est-une-arnaque-ne-tombez-pas-dans-le-piege/" },
      protect: ["N'ouvre pas les pièces jointes et ne réponds pas", "N'envoie aucun document ni argent", "Signale sur Cybermalveillance.gouv.fr ou Pharos"]
    },
    {
      level: "debutant", img: "calendrier", channel: "sms", from: "Salon Éclat", marks: ["jeudi 16 h", "appelle le salon", "réponds ANNULER"], answer: "legit",
      body: "Salon Éclat : rappel de ton rendez-vous jeudi 16 h avec Camille. Pour le déplacer, appelle le salon. Pour l'annuler, réponds ANNULER. À jeudi !",
      explain: "Message normal : tu connais le salon, tu as pris ce rendez-vous, et on ne te demande ni argent ni données. Pas de lien, pas d'urgence.",
      clues: ["Rendez-vous que tu as vraiment pris", "Aucun lien à cliquer", "Aucune demande d'argent ni de données"],
      tip: "Se méfier de tout n'est pas la solution : vérifie si tu es à l'origine de la demande."
    },
    {
      level: "debutant", img: "colis", channel: "sms", from: "Le Relais du Marché", marks: ["colis n° 4821", "Retrait avec pièce d'identité", "9 h-19 h"], answer: "legit",
      body: "Le Relais du Marché : ton colis n° 4821 est arrivé. Retrait avec pièce d'identité avant le 12/10, du lundi au samedi, 9 h-19 h.",
      explain: "Ce message donne un numéro de colis, un lieu que tu as toi-même choisi et des horaires. Aucun paiement ni lien n'est demandé : il t'invite juste à passer le chercher.",
      clues: ["Point relais que tu as choisi", "Numéro de colis précis", "Aucun lien, aucun paiement"],
      tip: "Attends-tu bien un colis dans ce point relais ? Si oui, tout est normal."
    },

    /* ===== INTERMÉDIAIRE ===== */
    {
      level: "inter", img: "cadeau", channel: "annonce", from: "Vendeur : « Karim_Tickets »", marks: ["450 € la paire", "paiement hors plateforme", "e-ticket après virement"], answer: "arnaque",
      body: "Dernières places pour la finale du 100 m, 450 € la paire, e-ticket après virement. Vendeur pressé : paiement hors plateforme uniquement, sinon je les revends dans l'heure.",
      explain: "Billets introuvables, prix gonflé, virement hors plateforme et pression : le combo classique. Une fois le virement fait, le vendeur disparaît.",
      clues: ["Places « introuvables » à un prix très élevé", "Paiement par virement, hors plateforme", "Pression : « je les revends dans l'heure »"],
      tip: "N'achète que sur la billetterie officielle. Sur une revente, utilise une plateforme qui protège ton paiement.",
      fact: { t: "Avant les JO de Paris, les cyber-patrouilles de la Gendarmerie ont repéré 44 sites de faux billets et 26 annonces sur les réseaux sociaux.", src: "Gendarmerie nationale", url: "https://www.gendarmerie.interieur.gouv.fr/gendinfo/criminalite-organisee-et-enquetes/2023/jeux-olympiques-de-paris-les-cyber-patrouilles-detectent-44-sites-de-faux-billets" },
      protect: ["Achète uniquement sur la billetterie officielle", "Paie par carte, jamais par virement à un inconnu", "Signale les annonces suspectes sur Pharos"]
    },
    {
      level: "inter", img: "calendrier", channel: "annonce", from: "Propriétaire : « Eva L. »", marks: ["480 € la semaine", "acompte de 40 %", "Visite impossible"], answer: "arnaque",
      body: "Villa 6 personnes vue mer, 480 € la semaine en août ! Pour bloquer vos dates, virement d'un acompte de 40 % à Eva Lambert. Visite impossible, propriétaire à l'étranger.",
      explain: "Prix très en dessous du marché, acompte par virement, impossible de visiter ni d'appeler : la fausse location de vacances. Les photos sont souvent volées sur d'autres annonces.",
      clues: ["Prix largement sous le marché", "Acompte par virement, hors plateforme", "Propriétaire injoignable, visite impossible"],
      tip: "Réserve via la plateforme et paie sur celle-ci. Fais une recherche d'image inversée sur les photos.",
      fact: { t: "En mars 2024, une opération soutenue par Europol en Roumanie a visé un réseau de fausses locations de vacances : plus de 1 000 victimes, 9 suspects arrêtés.", src: "OCCRP", url: "https://www.occrp.org/en/news/europol-holiday-rental-fraud-exposed-in-romania" },
      protect: ["Réserve et paie sur la plateforme, jamais en dehors", "Demande une visio du logement et vérifie les photos par recherche inversée", "Signale l'annonce à la plateforme et à Pharos"]
    },
    {
      level: "inter", img: "maisonco", channel: "annonce", from: "Loueur : « Thomas »", marks: ["Plusieurs personnes intéressées", "envoyez un acompte", "je vous transmets les clés par courrier"], answer: "arnaque",
      body: "Bonjour, l'appart est toujours dispo. Plusieurs personnes intéressées : envoyez un acompte pour garantir votre place, je vous transmets les clés par courrier.",
      explain: "On te presse avec une « forte demande » et on te demande de payer avant toute visite. Les clés « envoyées par courrier » ne viendront jamais.",
      clues: ["Fausse concurrence pour te presser", "Acompte avant visite et avant contrat", "Clés par courrier au lieu d'une remise en main propre"],
      tip: "Visite (ou demande une visio) et exige un contrat avant tout paiement.",
      fact: { t: "En 2025, deux hommes ont publié une fausse annonce d'appartement de vacances à Fréjus et encaissé les acomptes de 46 victimes, soit environ 27 000 €.", src: "Gérer Seul, d'après Var-Matin", url: "https://www.gererseul.com/actualite-immobiliere/un-reseau-descroquerie-sur-leboncoin-46-victimes-piegees-par-une-annonce-immobiliere-frauduleuse/" },
      protect: ["Visite ou demande une visio avant de payer quoi que ce soit", "Exige un contrat écrit", "Évite le virement, préfère un paiement protégé"]
    },
    {
      level: "inter", img: "velo", channel: "annonce", from: "Acheteur : « Claire »", marks: ["passer samedi", "en main propre"], answer: "legit",
      body: "Bonjour, ton vélo est toujours disponible ? Je peux passer samedi pour l'essayer. Je paierai en main propre, si ça te va.",
      explain: "Une vraie acheteuse veut voir l'article, l'essayer et payer sur place. Elle ne te demande ni ta carte, ni un lien, ni ton code.",
      clues: ["Elle veut voir et essayer l'article", "Paiement en main propre", "Aucun lien ni demande de données"],
      tip: "Rester prudent, c'est aussi savoir reconnaître le comportement normal : voir, essayer, payer sur place."
    },
    {
      level: "inter", img: "facture", channel: "email", from: "MaisonLumière <service-client@maisonlumiere-deco.fr>", subject: "Votre remboursement est en cours", marks: ["aucune démarche", "moyen de paiement utilisé"], answer: "legit",
      body: "Bonjour,\n\nSuite au retour de votre article (commande n° 48011), nous avons remboursé 39,90 € sur le moyen de paiement utilisé. Vous n'avez aucune démarche à faire : le montant apparaîtra sous 5 à 7 jours.\n\nLe service client",
      explain: "Un vrai remboursement se fait tout seul, sur le moyen de paiement d'origine. On ne te demande ni lien, ni nouvelles données bancaires. C'est l'inverse du faux remboursement.",
      clues: ["Tu as bien retourné cet article", "Remboursement sur le moyen de paiement d'origine", "Aucune action ni lien demandé"],
      tip: "Un remboursement légitime ne demande jamais de nouvelles coordonnées bancaires."
    },

    /* ===== EXPERT ===== */
    {
      level: "expert", img: "call", channel: "reseau", from: "+33 7 00 00 00 05 (nouveau numéro)", marks: ["Voici mon nouveau numéro", "reste discret", "accord de confidentialité"], answer: "arnaque",
      body: "Bonjour, c'est Marc. Voici mon nouveau numéro. J'ai un gros dossier d'acquisition, reste discret et prépare-toi à signer un accord de confidentialité. Je t'appelle dans 5 minutes.",
      explain: "Le patron qui écrit d'un nouveau numéro pour un dossier ultra-confidentiel, puis qui t'appelle avec une voix imitée par IA : c'est une fraude au président 2.0. La pression du secret empêche de vérifier.",
      clues: ["Nouveau numéro, messagerie grand public", "Sujet ultra-confidentiel et pression au secret", "Appel de suivi avec une voix qui pourrait être imitée"],
      tip: "Rappelle ton patron sur son numéro habituel, ou pose une question que seule la vraie personne peut connaître.",
      fact: { t: "En juillet 2024, un cadre de Ferrari a reçu un appel imitant par IA la voix de son PDG. Il a demandé le titre d'un livre que le vrai PDG lui avait recommandé : l'imposteur a raccroché.", src: "Fortune", url: "https://fortune.com/2024/07/27/ferrari-deepfake-attempt-scammer-security-question-ceo-benedetto-vigna-cybersecurity-ai" },
      protect: ["Pose une question personnelle que seule la vraie personne connaît", "Rappelle sur le numéro habituel avant d'agir", "Préviens ta hiérarchie avant toute demande confidentielle"]
    },
    {
      level: "expert", img: "deepfake", channel: "appel", from: "Numéro inconnu", marks: ["On a votre fille", "ne prévenez personne", "virement immédiat"], answer: "arnaque",
      body: "[Une voix d'enfant en pleurs : « Maman, aide-moi… »] Puis un homme : « On a votre fille. Ne raccrochez pas, ne prévenez personne : virement immédiat. »",
      explain: "Quelques secondes de voix, prises dans une vidéo publique, suffisent à cloner une voix par IA. Le but est de te paniquer pour que tu paies avant de vérifier.",
      clues: ["Voix qui pleure, sans vraie conversation", "Exigence de secret et de paiement immédiat", "Numéro inconnu, alors que ton proche est joignable autrement"],
      tip: "Raccroche et rappelle ton proche sur son numéro habituel. Ne paie rien au téléphone.",
      fact: { t: "Aux États-Unis, une mère a reçu un appel avec la voix clonée de sa fille de 15 ans et une demande de rançon d'un million de dollars. Elle a démasqué la fraude en joignant son mari, qui avait sa fille en sécurité.", src: "Futura Sciences", url: "https://www.futura-sciences.com/tech/actualites/intelligence-artificielle-terrifiante-histoire-escroquerie-clonage-voix-realise-ia-104646/" },
      protect: ["Rappelle directement le proche sur son numéro habituel", "Convenez d'un mot de passe familial pour les urgences", "Ne paie rien au téléphone et alerte la police (17)"]
    },
    {
      level: "expert", img: "banque", channel: "sms", from: "Ta banque (conversation habituelle)", marks: ["Tentatives de virement frauduleuses", "Rappelle-nous tout de suite", "sécuriser ton compte"], answer: "arnaque",
      body: "Tentatives de virement frauduleuses détectées sur ton compte. Rappelle-nous tout de suite au numéro ci-dessous : un conseiller va sécuriser ton compte.",
      explain: "Ce SMS s'affiche dans la même conversation que les vrais messages de ta banque, ce qui rassure à tort : l'expéditeur peut être falsifié. Le « conseiller » te fera ensuite valider des opérations toi-même.",
      clues: ["Même fil de discussion que les vrais SMS : ça ne prouve rien", "Urgence et numéro à rappeler dans le message", "Un « conseiller » qui te guide dans ton appli"],
      tip: "Ne rappelle jamais le numéro du message. Ouvre ton appli bancaire ou appelle le numéro au dos de ta carte."
    },
    {
      level: "expert", img: "crypto", channel: "reseau", from: "Publicité sponsorisée", marks: ["présentateur télé", "rend 80 € par jour", "Dépôt minimum 250 €"], answer: "arnaque",
      body: "[Vidéo : un présentateur télé que tu reconnais explique devant la caméra] « Cette plateforme m'a changé la vie : elle rend 80 € par jour sans effort. Dépôt minimum 250 €. Clique sous la vidéo. »",
      explain: "Visage et voix de personnalités sont copiés par IA pour vanter de faux placements. Aucune célébrité sérieuse ne fait la promotion de gains garantis, et la vidéo n'est même pas de lui.",
      clues: ["Célébrité qui promet des gains faciles", "Dépôt minimum puis gains garantis", "Mouvements de lèvres ou ton légèrement artificiels"],
      tip: "Cherche l'info sur le site officiel de la personnalité ou de la chaîne. Un placement garanti n'existe pas."
    },
    {
      level: "expert", img: "maj", channel: "email", from: "NuageBox <securite@nuagebox-cloud.fr>", subject: "Nouvelle connexion à ton compte", marks: ["nouvel appareil", "Si c'est bien toi, tu n'as rien à faire", "ouvre l'application"], answer: "legit",
      body: "Bonjour,\n\nUne connexion à ton compte a eu lieu depuis un nouvel appareil (Lyon) le 3 octobre à 08 h 12.\n\nSi c'est bien toi, tu n'as rien à faire. Sinon, ouvre l'application NuageBox, rubrique Sécurité, pour changer ton mot de passe.",
      explain: "Le message t'informe sans te presser et te renvoie vers l'appli que tu as déjà. Pas de lien, pas de menace, pas de demande de mot de passe. C'est exactement le bon fonctionnement d'une alerte de sécurité.",
      clues: ["Aucun lien dans le message", "Tu es invité à ouvrir toi-même ton appli", "Ton calme : aucune urgence, aucune menace"],
      tip: "Si le doute persiste, change quand même ton mot de passe depuis l'appli, jamais depuis un lien reçu."
    },
    {
      level: "expert", img: "identite", channel: "email", from: "Service informatique <dsi@atelier-nordik.fr>", subject: "Ton mot de passe expire dans 5 jours", marks: ["intranet", "ne te demandera jamais ton mot de passe"], answer: "legit",
      body: "Bonjour,\n\nPour des raisons de sécurité, ton mot de passe expire dans 5 jours. Rends-toi sur l'intranet (adresse habituelle) pour le renouveler.\n\nLe service informatique ne te demandera jamais ton mot de passe par e-mail ou par téléphone.",
      explain: "Il y a une échéance, mais elle est raisonnable (5 jours), et le message te renvoie vers l'intranet que tu connais, sans lien. Il rappelle même la règle d'or : on ne te demandera jamais ton mot de passe.",
      clues: ["Échéance raisonnable, pas de menace", "Renvoi vers l'intranet habituel, pas de lien", "Rappel de la règle de sécurité"],
      tip: "Une échéance n'est pas toujours un piège : regarde si on te donne un lien et si on te demande un mot de passe."
    }
  ];

  NEW.forEach(function (q) { Q.push(q); });

  /* ----- contrôle de cohérence (console uniquement) ----- */
  try {
    Q.forEach(function (q, i) {
      var hay = [q.body || "", q.from || "", q.subject || ""].join("\n");
      (q.marks || []).forEach(function (m) { if (hay.indexOf(m) < 0) console.warn("Mark introuvable, question " + i + " :", m); });
    });
  } catch (e) { /* ignoré */ }
})();

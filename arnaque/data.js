/* Arnaque ou pas ? — contenu du jeu
   Tous les messages sont FICTIFS : noms, numéros, domaines inventés (.com/.fr plausibles). Les faits divers cités sont réels et sourcés.
   Aucun vrai logo, aucun lien actif. */
window.GAME = {
  id: "arnaque",
  title: "Arnaque ou pas ?",
  emoji: "🛡️",
  intro: "Un message arrive. Arnaque ou message légitime ? Tu as quelques secondes pour trancher, et on t'explique les indices à chaque fois.",
  question: "Alors, ton verdict ?",
  roundSize: 8,
  channelLabels: { sms: "📱 SMS", email: "📧 E-mail", appel: "📞 Appel téléphonique", reseau: "💬 Message privé", annonce: "🏷️ Petite annonce", rue: "🚏 Dans la rue", video: "🎥 Appel vidéo", enceinte: "🔊 Enceinte connectée", appli: "📲 Notification d'application" },
  answerKeys: ["arnaque", "legit"],
  answerLabels: ["Arnaque !", "Légitime"],
  answerButtons: ["Arnaque", "Légitime"],
  stamps: { arnaque: "ARNAQUE", legit: "LÉGITIME" },
  rattrapage: { arnaque: "Retrouve le passage qui aurait dû t'alerter :", legit: "Retrouve le passage qui aurait dû te rassurer :" },
  goodTitle: "Bien joué ! C'était :",
  badTitle: "Raté ! C'était :",
  ranks: [
    { min: 0, emoji: "🌱", title: "Apprenti sentinelle", text: "Pas de panique : tout le monde se fait piéger au début. Relis les indices et retente ta chance !" },
    { min: 0.5, emoji: "🔍", title: "Œil en éveil", text: "Tu repères déjà beaucoup de pièges. Encore un peu d'entraînement et plus rien ne t'échappe." },
    { min: 0.75, emoji: "🛡️", title: "Sentinelle confirmée", text: "Très bon score ! Tu as les bons réflexes. Pense à partager le jeu à tes proches, surtout aux moins à l'aise avec le numérique." },
    { min: 1, emoji: "🏆", title: "Sentinelle en chef", text: "Sans faute ! Les arnaqueurs peuvent aller se rhabiller. Défie un proche pour voir s'il fait aussi bien." }
  ],
  /* Mettre l'URL affiliée (lien Awin) pour afficher l'encart de recommandation sous le résultat.
     Laisser url vide tant que le lien n'est pas prêt : l'encart reste masqué. */
  affiliate: {
    title: "Et si tu protégeais ta maison aussi ?",
    text: "Une caméra ou une serrure connectée peut aider à surveiller son logement. Compare toujours plusieurs modèles avant d'acheter.",
    cta: "Voir les produits",
    url: ""
  },
  questions: [
    {
      level: "debutant", img: "colis", channel: "sms", from: "+33 7 00 00 00 01", marks: ["1,99 €", "sous 24 h"], answer: "arnaque",
      body: "[Livraison] Votre colis n'a pas pu être livré. Des frais de réexpédition de 1,99 € sont à régler sous 24 h : [[http://colis-suivi-reexp.com/pay]]",
      explain: "Classique du faux SMS de livraison. Les petits frais ne servent qu'à récupérer les données de ta carte bancaire.",
      clues: ["Aucun numéro de suivi ni nom du transporteur", "Urgence de 24 h", "Lien vers un site inconnu"],
      tip: "Tu attends un colis ? Va sur le site ou l'appli du vendeur en tapant toi-même l'adresse."
    },
    {
      level: "debutant", img: "code", channel: "sms", from: "36 123", marks: ["Ne le communiquez à personne", "ignorez ce message"], answer: "legit",
      body: "Votre code de vérification est 482913. Il expire dans 10 minutes. Ne le communiquez à personne. Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.",
      explain: "Message normal, à condition que ce soit toi qui viennes de te connecter ou de t'inscrire quelque part. Ce code sert à confirmer que c'est bien toi.",
      clues: ["Aucun lien à cliquer", "Il rappelle de ne jamais partager le code"],
      tip: "Si tu n'as rien demandé, ignore-le. Et ne donne jamais ce code à quelqu'un qui t'appelle."
    },
    {
      level: "inter", img: "banque", channel: "email", from: "Sécurité <alerte@securite-banque-loire.com>", subject: "Action requise : votre compte sera bloqué", marks: ["alerte@securite-banque-loire.com", "cher client", "dans les 12 heures"], answer: "arnaque",
      body: "Bonjour cher client,\n\nNous avons détecté une activité inhabituelle. Pour éviter le blocage définitif de votre compte, confirmez vos identifiants dans les 12 heures :\n\n[[Vérifier mon compte maintenant]]\n\nMerci de votre confiance.\nLe service sécurité",
      explain: "Hameçonnage (phishing) : le but est de te faire saisir tes identifiants sur une fausse page qui ressemble à celle de ta banque.",
      clues: ["Salutation vague (« cher client »)", "Menace de blocage et délai très court", "Adresse d'expéditeur qui imite sans être la vraie"],
      tip: "Une banque ne te demande jamais tes identifiants par e-mail. Connecte-toi via son appli officielle."
    },
    {
      level: "inter", img: "call", channel: "appel", from: "Numéro masqué", marks: ["transférer sur un compte sécurisé", "me communiquer le code reçu par SMS"], answer: "arnaque",
      body: "« Bonjour, je suis votre conseiller sécurité. Des paiements suspects ont été détectés sur votre compte. Pour protéger votre argent, je vais vous guider pour le transférer sur un compte sécurisé, et vous allez me communiquer le code reçu par SMS. »",
      explain: "Fraude au faux conseiller. Le « compte sécurisé » appartient aux escrocs, et le code SMS valide le virement à ta place.",
      clues: ["Demande de virer ton argent soi-disant pour le protéger", "Demande du code reçu par SMS", "Pression et appel inattendu"],
      tip: "Raccroche, puis rappelle ta banque au numéro figurant sur ta carte ou ton site officiel."
    },
    {
      level: "debutant", img: "colis", channel: "email", from: "MaisonLumière <commande@maisonlumiere-deco.fr>", subject: "Votre commande n° 48217 est expédiée", marks: ["Merci pour votre commande de mardi", "dans votre espace client habituel"], answer: "legit",
      body: "Bonjour Camille,\n\nMerci pour votre commande de mardi (1 lampe de bureau). Elle part aujourd'hui et sera livrée d'ici jeudi.\n\nVous retrouverez le suivi dans votre espace client habituel.\n\nL'équipe MaisonLumière",
      explain: "Ici, tu as passé une commande réelle et le message ne demande rien : pas d'argent, pas de mot de passe, pas de lien pressant. C'est une simple confirmation.",
      clues: ["Tu reconnais la commande", "Aucune demande de paiement ni d'information", "Prénom correct et détails précis"],
      tip: "Le bon réflexe : vérifier que tu as bien commandé chez ce vendeur avant de te fier au message."
    },
    {
      level: "inter", img: "chat", channel: "sms", from: "+33 6 00 00 00 02", marks: ["c'est mon nouveau numéro", "virement urgent"], answer: "arnaque",
      body: "Coucou maman c'est moi, j'ai cassé mon téléphone, c'est mon nouveau numéro. Peux-tu me faire un virement urgent ? Je te rembourse demain, j'ai une facture à payer.",
      explain: "Arnaque au faux proche (« Salut maman »). L'escroc joue sur l'émotion et la rapidité pour que tu ne vérifies pas.",
      clues: ["Nouveau numéro inconnu", "Demande d'argent urgente", "Aucun détail que seul ton proche connaît"],
      tip: "Appelle l'ancien numéro de ton proche ou pose une question dont seul lui connaît la réponse."
    },
    {
      level: "debutant", img: "cadeau", channel: "email", from: "Enquête Clients <gagnants@enquete-cadeaux-vip.com>", subject: "Félicitations ! Vous avez gagné un robot aspirateur", marks: ["1,95 € de frais de port", "aujourd'hui seulement"], answer: "arnaque",
      body: "Vous avez été sélectionné(e) pour notre enquête de satisfaction ! Choisissez votre cadeau parmi 3 produits. Il vous suffit de régler 1,95 € de frais de port :\n\n[[Réclamer mon cadeau]]\n\nOffre valable aujourd'hui seulement !",
      explain: "Faux concours : les « frais de port » servent à capter ta carte bancaire, parfois pour un abonnement caché.",
      clues: ["Tu n'as participé à aucun concours", "Cadeau de valeur contre un tout petit paiement", "Urgence : « aujourd'hui seulement »"],
      tip: "Si c'est trop beau pour être vrai, c'est que c'est faux. Aucune vraie enquête ne te demande ta carte."
    },
    {
      level: "debutant", img: "amende", channel: "sms", from: "Avis-Amende", marks: ["amende impayée", "sous 48 h", "majoration"], answer: "arnaque",
      body: "Vous avez une amende impayée. Régularisez sous 48 h pour éviter une majoration : [[http://paiement-amende-fr.com/regler]]",
      explain: "Fausse amende : un SMS avec un lien de paiement pressant est un signal d'alerte fort. Le site est un piège à données bancaires.",
      clues: ["Pas de référence précise ni de lieu ni de date", "Délai de 48 h et menace de majoration", "Lien vers un site au nom bricolé"],
      tip: "En cas de doute, va toi-même sur le site officiel de l'administration, sans cliquer sur le lien."
    },
    {
      level: "debutant", img: "calendrier", channel: "email", from: "Cabinet Dr Martin <rdv@cabinet-martin-sante.fr>", subject: "Rappel de votre rendez-vous", marks: ["mardi 14 à 14 h 30", "numéro habituel"], answer: "legit",
      body: "Bonjour,\n\nNous vous rappelons votre rendez-vous du mardi 14 à 14 h 30 au cabinet.\n\nPour le déplacer ou l'annuler, merci d'appeler le cabinet au numéro habituel.\n\nCordialement,\nLe secrétariat",
      explain: "Message simple, avec un rendez-vous que tu connais, sans lien ni demande d'argent ou de données. C'est ce qu'on attend d'un rappel normal.",
      clues: ["Rendez-vous réel et attendu", "Aucune demande de paiement ni de documents", "Contact via le numéro habituel"],
      tip: "Le critère clé : tu connais l'expéditeur et le message ne te demande rien d'inhabituel."
    },
    {
      level: "inter", img: "ordi", channel: "appel", from: "Numéro inconnu", marks: ["alertes de virus", "logiciel de prise en main à distance"], answer: "arnaque",
      body: "« Bonjour, je suis du support technique de votre fournisseur d'accès. Votre ordinateur envoie des alertes de virus. Installez ce petit logiciel de prise en main à distance et je règle le problème pour vous. »",
      explain: "Faux support technique : en installant le logiciel, tu donnes le contrôle de ton ordinateur (et de tes comptes) à l'escroc.",
      clues: ["Appel que tu n'as pas demandé", "Alerte virus alarmante", "Demande d'installer un logiciel à distance"],
      tip: "Un vrai fournisseur ne te contacte pas ainsi. Raccroche, et n'installe rien à la demande d'un inconnu."
    },
    {
      level: "debutant", img: "sante", channel: "sms", from: "Santé-Remb", marks: ["87,40 €", "Mettez à jour vos informations bancaires"], answer: "arnaque",
      body: "Votre organisme de santé vous doit un remboursement de 87,40 €. Mettez à jour vos informations bancaires pour le recevoir : [[http://remboursement-sante-fr.com/maj]]",
      explain: "Fausse promesse de remboursement : on t'attire avec de l'argent pour récupérer tes données bancaires et personnelles.",
      clues: ["Montant précis mais sans détail de dossier", "Demande de mise à jour bancaire par lien", "Expéditeur générique"],
      tip: "Pour vérifier un remboursement, ouvre ton espace personnel officiel en tapant l'adresse toi-même."
    },
    {
      level: "expert", img: "cadeau", channel: "email", from: "Directeur <direction@delmas-groupe-pro.com>", subject: "Urgent et confidentiel", marks: ["4 cartes cadeaux", "ne peux pas téléphoner", "Reste discret"], answer: "arnaque",
      body: "Bonjour,\n\nJe suis en réunion et ne peux pas téléphoner. J'ai besoin que tu m'achètes 4 cartes cadeaux de 100 € dès maintenant. Envoie-moi les codes par retour de mail. Je te rembourse ce soir. Reste discret.\n\nMerci,\nLe Directeur",
      explain: "Fraude « au président » : l'escroc se fait passer pour ton chef et demande des cartes cadeaux, impossibles à récupérer une fois les codes envoyés.",
      clues: ["Demande de cartes cadeaux", "Impossible de téléphoner", "Consigne de discrétion et d'urgence"],
      tip: "Vérifie par un autre canal (téléphone, en personne) avant de dépenser quoi que ce soit."
    },
    {
      level: "inter", img: "social", channel: "reseau", from: "Support Officiel Pages", marks: ["suppression définitive", "12 prochaines heures"], answer: "arnaque",
      body: "Votre compte a enfreint nos règles de la communauté. Faites appel dans les 12 prochaines heures pour éviter sa suppression définitive : [[http://appel-compte-support.com/verif]]",
      explain: "Faux message de plateforme sociale : la page d'« appel » vole ton mot de passe, puis ton compte est utilisé pour arnaquer tes contacts.",
      clues: ["Menace de suppression", "Délai de 12 h", "Lien externe au lieu de passer par l'appli"],
      tip: "Les vraies notifications se trouvent dans les paramètres de l'appli, pas dans un message privé."
    },
    {
      level: "debutant", img: "voiture", channel: "sms", from: "CT Rapide", marks: ["confirmé le 12/10 à 9 h 00", "numéro de votre convocation"], answer: "legit",
      body: "Votre rendez-vous de contrôle technique est confirmé le 12/10 à 9 h 00 au centre CT Rapide. Pour modifier, rappelez le centre au numéro de votre convocation.",
      explain: "Message attendu si tu as pris rendez-vous. Il ne demande aucune donnée et renvoie vers le numéro que tu as déjà.",
      clues: ["Rendez-vous que tu as pris", "Pas de lien ni de demande d'argent", "Renvoi vers un numéro connu"],
      tip: "Un message qui confirme une action que tu as faite, sans rien demander de plus, est généralement fiable."
    },
    {
      level: "inter", img: "facture", channel: "email", from: "Facturation <compta@fournisseur-services-fr.com>", subject: "Facture impayée – dernier rappel", marks: ["Facture_20941.zip", "sous 3 jours"], answer: "arnaque",
      body: "Bonjour,\n\nVotre facture n° 20941 est restée impayée. Vous la trouverez en pièce jointe (Facture_20941.zip). Merci de régler sous 3 jours pour éviter des frais de recouvrement.",
      explain: "Pièce jointe piégée : le fichier .zip contient très probablement un logiciel malveillant qui s'installe quand tu l'ouvres.",
      clues: ["Aucun nom de société reconnu", "Pièce jointe .zip inattendue", "Menace de frais de recouvrement"],
      tip: "N'ouvre jamais une pièce jointe inattendue, surtout un fichier .zip ou .exe."
    },
    {
      level: "inter", img: "velo", channel: "annonce", from: "Acheteur : « Julien »", marks: ["sans le voir", "tu y mets ta carte bancaire pour recevoir l'argent"], answer: "arnaque",
      body: "Bonjour, je prends ton vélo sans le voir ! Je paie via un service de paiement sécurisé. Je t'envoie un lien : tu y mets ta carte bancaire pour recevoir l'argent, et mon transporteur passe le chercher.",
      explain: "Arnaque à la petite annonce : pour recevoir de l'argent, tu n'as jamais besoin de saisir les données de ta carte. C'est un piège à données bancaires.",
      clues: ["Acheteur qui n'a pas besoin de voir l'article", "Faux « paiement sécurisé » par lien", "Transporteur imposé"],
      tip: "Pour être payé, privilégie la remise en main propre, ou un virement que tu vois arriver sur ton compte."
    },
    {
      level: "inter", img: "banque", channel: "appel", from: "Ta banque (numéro habituel)", marks: ["Vous aviez demandé un rendez-vous", "vous pouvez aussi me rappeler à l'agence"], answer: "legit",
      body: "« Bonjour, c'est Sophie, de votre agence. Vous aviez demandé un rendez-vous pour parler de votre épargne. Seriez-vous disponible jeudi à 16 h ? Rien d'urgent, vous pouvez aussi me rappeler à l'agence. »",
      explain: "Ce conseiller répond à une demande que tu as faite, propose un rendez-vous physique et ne te demande ni code ni virement. Aucune pression.",
      clues: ["C'est lié à une demande que tu avais faite", "Aucune demande de code, de mot de passe ou de virement", "Possibilité de rappeler l'agence"],
      tip: "Même dans ce cas, tu peux toujours raccrocher et rappeler l'agence toi-même, par prudence."
    },
    {
      level: "debutant", img: "laptopeuro", channel: "sms", from: "+33 7 00 00 00 03", marks: ["250 € par jour", "Aucune expérience requise"], answer: "arnaque",
      body: "Gagnez 250 € par jour depuis chez vous ! Aucune expérience requise. Écrivez-nous sur WhatsApp pour commencer aujourd'hui : [[whatsapp-job250.com/go]]",
      explain: "Fausse offre d'emploi : on t'attire avec un gain énorme et facile, puis on te demande de payer une « formation » ou de recevoir de l'argent illégal.",
      clues: ["Gain disproportionné sans compétence", "Contact par SMS non sollicité", "Discussion qui bascule sur une messagerie privée"],
      tip: "Un vrai recruteur ne promet pas 250 € par jour sans entretien ni contrat."
    },
    {
      level: "inter", img: "crypto", channel: "email", from: "Invest Boost <contact@crypto-gains-garantis.com>", subject: "+30 % par semaine, garanti", marks: ["Rendement garanti de 30 % par semaine", "Places limitées"], answer: "arnaque",
      body: "Rejoignez les centaines d'investisseurs qui doublent leur capital chaque mois ! Rendement garanti de 30 % par semaine. Dépôt minimum : 250 €. Places limitées, inscrivez-vous maintenant :\n\n[[Je rejoins le programme]]",
      explain: "Aucun placement sérieux ne peut garantir un rendement pareil. C'est le schéma classique de l'escroquerie à l'investissement.",
      clues: ["« Rendement garanti » très élevé", "Places limitées pour créer de l'urgence", "Message non sollicité"],
      tip: "Plus la promesse de gain est forte et rapide, plus le risque d'arnaque est grand."
    },
    {
      level: "inter", img: "enveloppe", channel: "email", from: "MySentinel Games <bonjour@mysentinelsolutions.com>", subject: "Confirme ton inscription à la newsletter", marks: ["Tu viens de demander", "ignore simplement ce message"], answer: "legit",
      body: "Bonjour,\n\nTu viens de demander à recevoir notre newsletter. Pour confirmer, clique sur le bouton ci-dessous.\n\nSi ce n'est pas toi, ignore simplement ce message : tu ne recevras rien.\n\n[[Je confirme mon inscription]]",
      explain: "C'est une confirmation d'inscription classique (double opt-in) : elle n'a de sens que si c'est toi qui viens de t'inscrire, et elle ne demande aucune donnée sensible.",
      clues: ["Tu viens de t'inscrire", "Aucun mot de passe ni donnée bancaire demandés", "Possibilité d'ignorer sans conséquence"],
      tip: "Un clic de confirmation de newsletter est sans risque si tu viens de t'inscrire. Sinon, supprime le message."
    },
    {
      level: "debutant", img: "ampoule", channel: "sms", from: "Info-Énergie", marks: ["126 €", "avant ce soir", "carte bancaire"], answer: "arnaque",
      body: "Votre fournisseur d'énergie vous doit un trop-perçu de 126 €. Récupérez-le avant ce soir en renseignant votre carte bancaire : [[http://trop-percu-energie.com/rembours]]",
      explain: "Faux remboursement d'énergie : on te dit que tu vas recevoir de l'argent pour te faire saisir ta carte. Les remboursements arrivent sur ton compte sans que tu aies à communiquer ta carte.",
      clues: ["Remboursement à saisir avant « ce soir »", "Demande de carte bancaire pour recevoir de l'argent", "Fournisseur non identifié"],
      tip: "Pour recevoir de l'argent, on a seulement besoin de ton IBAN, jamais de ton code de carte."
    },
    {
      level: "expert", img: "badge", channel: "appel", from: "Numéro officiel affiché", marks: ["la couper en deux", "donner votre code", "passera la récupérer chez vous"], answer: "arnaque",
      body: "« Bonjour, ici la police. Votre carte bancaire est utilisée à l'étranger. Pour la sécuriser, vous allez la couper en deux, donner votre code, et un collègue passera la récupérer chez vous. »",
      explain: "Fausse police : un « collègue » vient chercher ta carte et ton code à domicile. Les numéros peuvent être falsifiés pour paraître officiels.",
      clues: ["Demande de ton code de carte", "Un coursier vient chercher la carte", "Pression et ton autoritaire"],
      tip: "Ni la police ni ta banque ne te demandera jamais ton code. Raccroche et appelle toi-même ta banque."
    },
    {
      level: "inter", img: "carte", channel: "sms", from: "TaBanque", marks: ["contactez le numéro au dos de votre carte"], answer: "legit",
      body: "Paiement par carte de 23,50 € chez Boulangerie du Port le 03/10. Si vous ne reconnaissez pas cette opération, contactez le numéro au dos de votre carte.",
      explain: "Alerte de paiement standard que ta banque t'envoie quand tu as activé les notifications. Elle ne contient aucun lien et renvoie vers le numéro au dos de ta carte.",
      clues: ["Pas de lien à cliquer", "Montant et commerçant précis", "Renvoi vers le numéro au dos de la carte"],
      tip: "Si tu ne reconnais pas un paiement, appelle le numéro au dos de ta carte, pas un numéro donné dans un message."
    },
    {
      level: "inter", img: "play", channel: "email", from: "StreamBox <abonnement@streambox-service.com>", subject: "Votre paiement a échoué", marks: ["dans les 24 h", "streambox-service.com"], answer: "arnaque",
      body: "Bonjour,\n\nNous n'avons pas pu renouveler votre abonnement StreamBox. Mettez à jour votre carte dans les 24 h pour éviter la suspension :\n\n[[Mettre à jour mon paiement]]",
      explain: "Faux e-mail d'abonnement streaming : le lien mène à une fausse page de paiement qui récupère ta carte.",
      clues: ["Délai de 24 h avant suspension", "Lien vers une mise à jour de paiement", "Adresse expéditeur qui ne correspond pas à ton vrai service"],
      tip: "Vérifie ton abonnement depuis l'appli ou le site officiel, ouvert par toi-même."
    },
    {
      level: "inter", img: "qr", channel: "rue", from: "Horodateur de la rue du Marché", marks: ["autocollant", "scanner pour payer"], answer: "arnaque",
      body: "Un autocollant « Payez votre stationnement » avec un QR code est collé sur l'horodateur, juste à côté de l'écran. Il te dit de scanner pour payer sans monnaie.",
      explain: "Faux QR code collé par-dessus (ou à côté) des vrais : il redirige vers une page de paiement frauduleuse qui capte ta carte.",
      clues: ["Autocollant visiblement ajouté, pas intégré à l'appareil", "Paiement demandé via un site inconnu", "Pas de mention d'un opérateur officiel"],
      tip: "Avant de scanner, vérifie que le QR code est bien intégré à l'horodateur, ou utilise l'appli officielle de la ville."
    },
    {
      level: "expert", img: "paie", channel: "email", from: "Service Paie <paie@atelier-nordik.fr>", subject: "Votre bulletin de septembre est disponible", marks: ["comme d'habitude", "intranet de l'entreprise"], answer: "legit",
      body: "Bonjour,\n\nVotre bulletin de paie de septembre est maintenant disponible dans votre espace salarié. Connectez-vous comme d'habitude depuis l'intranet de l'entreprise.\n\nLe service paie",
      explain: "Message normal : il t'invite à te connecter comme d'habitude, sans lien piégé ni demande de données. L'expéditeur correspond à ton entreprise.",
      clues: ["Tu reçois ce type d'avis chaque mois", "Pas de lien urgent ni de demande d'identifiants", "Renvoi vers ton espace habituel"],
      tip: "Même avec ce type de message, va toujours dans ton espace via le chemin que tu connais."
    },
    {
      level: "debutant", img: "formation", channel: "sms", from: "Espace-Formation", marks: ["avant minuit", "gratuitement"], answer: "arnaque",
      body: "Vos droits à la formation expirent bientôt. Activez-les gratuitement avant minuit : [[http://droits-formation-activ.com/go]]",
      explain: "Fausse alerte sur des droits personnels : elle crée une fausse urgence pour récupérer tes données (identité, numéro de sécurité sociale, banque).",
      clues: ["Urgence : « avant minuit »", "Lien vers un site inconnu", "Expéditeur sans identité claire"],
      tip: "Connecte-toi directement au service officiel concerné pour vérifier tes droits, sans passer par le lien du message."
    },
    {
      level: "debutant", img: "pharmacie", channel: "sms", from: "Pharmacie du Centre", marks: ["à retirer au comptoir", "ordonnance"], answer: "legit",
      body: "Pharmacie du Centre : votre commande est prête, à retirer au comptoir jusqu'à samedi 19 h. Merci de vous munir de votre ordonnance.",
      explain: "Message attendu si tu as passé commande à ta pharmacie : il ne demande aucun paiement en ligne ni donnée, et te donne un retrait en magasin.",
      clues: ["Tu connais la pharmacie et ta commande", "Retrait au comptoir, pas de lien", "Aucune demande de paiement ni d'identifiants"],
      tip: "En cas de doute, appelle la pharmacie au numéro que tu connais."
    },
    {
      level: "expert", img: "deepfake", channel: "video", from: "Numéro inconnu", marks: ["j'ai perdu mon passeport et mon téléphone", "800 € tout de suite"], answer: "arnaque",
      body: "Appel vidéo en direct. À l'écran, ton fils, les yeux rouges, la voix un peu hachée : « Papa, j'ai perdu mon passeport et mon téléphone à l'étranger, je suis chez quelqu'un qui m'aide. Il me faut 800 € tout de suite, je te rembourse dès que je rentre. »",
      explain: "Grâce à l'IA, il devient possible de copier une voix et un visage à partir de courtes vidéos publiées en ligne. Ici, l'émotion sert à t'empêcher de vérifier.",
      clues: ["Appel depuis un numéro que tu ne connais pas", "Urgence et détresse pour que tu ne réfléchisses pas", "Demande de virement immédiat", "Image ou son légèrement saccadés"],
      tip: "Raccroche et rappelle ton proche sur son vrai numéro. Convenez à l'avance d'un mot de code familial que seuls vous connaissez."
    },
    {
      level: "expert", img: "maisonco", channel: "enceinte", from: "Voix sur ton enceinte connectée", marks: ["payez 0,05 bitcoin", "Vous avez 24 heures"], answer: "arnaque",
      body: "Tout à coup, ton enceinte diffuse en boucle : « Votre maison est verrouillée. Le chauffage est coupé. Pour retrouver l'accès, payez 0,05 bitcoin à l'adresse affichée dans votre application. Vous avez 24 heures. »",
      explain: "Scénario encore rare mais plausible : une faille dans un routeur ou un objet connecté mal protégé donne le contrôle à un pirate, qui réclame une rançon.",
      clues: ["Menace sur ton confort et ta sécurité", "Paiement exigé en cryptomonnaie", "Délai très court pour te pousser à payer"],
      tip: "Ne paie jamais. Débranche ta box, change tous les mots de passe, mets les appareils à jour et signale-le sur cybermalveillance.gouv.fr. Un mot de passe unique par appareil réduit le risque."
    },
    {
      level: "expert", img: "extensionia", channel: "email", from: "NovaAI Team <upgrade@novaai-premium-offres.com>", subject: "Passez à NovaAI Premium Ultra, 3 fois plus rapide", marks: ["réservée aux premiers inscrits", "500 premiers utilisateurs", "novaai-premium-offres.com"], answer: "arnaque",
      body: "Bonjour,\n\nNovaAI lance sa version Premium Ultra, réservée aux premiers inscrits. Installez dès maintenant l'extension officielle et gagnez 3 heures par jour :\n\n[[Installer l'extension Premium Ultra]]\n\nOffre limitée aux 500 premiers utilisateurs.",
      explain: "Fausse mise à niveau d'un outil d'IA populaire : l'extension fonctionne au début mais peut enregistrer tes frappes et voler tes mots de passe.",
      clues: ["Message non sollicité qui joue sur la peur de rater une innovation", "Adresse d'expéditeur différente du vrai site", "Places limitées et installation hors boutique officielle"],
      tip: "Installe les extensions seulement depuis la boutique officielle du navigateur ou le site du service, ouvert par toi, et regarde toujours les autorisations demandées."
    },
    {
      level: "expert", img: "coeur", channel: "reseau", from: "Élise (rencontrée sur une appli de rencontre)", marks: ["tu es la seule personne en qui j'ai confiance", "Il me manque 3 000 €", "Ne le dis à personne"], answer: "arnaque",
      body: "Mon amour, après tous ces mois à se parler chaque soir, tu es la seule personne en qui j'ai confiance. La banque va saisir la maison de ma mère malade. Il me manque 3 000 € avant vendredi. Je te rembourserai, je te le jure. Ne le dis à personne, ça me fait trop honte.",
      explain: "Arnaque aux sentiments : certains profils sont désormais pilotés par une IA capable de t'écouter pendant des mois et d'adapter ses réponses, avant d'inventer un drame financier.",
      clues: ["Relation uniquement à distance, jamais de rencontre", "Drame financier soudain après des mois de confiance", "Demande d'argent et de secret"],
      tip: "N'envoie jamais d'argent à quelqu'un que tu n'as jamais rencontré. Propose un appel vidéo en direct et fais une recherche d'image inversée sur ses photos."
    },
    {
      level: "expert", img: "identite", channel: "email", from: "Crédit Rivage <gestion@credit-rivage-conso.fr>", subject: "Confirmation de votre contrat de crédit n° 70418", marks: ["crédit à la consommation de 6 000 €", "Si vous n'êtes pas à l'origine de cette demande"], answer: "legit",
      body: "Bonjour,\n\nNous vous confirmons la souscription d'un crédit à la consommation de 6 000 €, avec une première mensualité de 189 € le 5 du mois prochain.\n\nSi vous n'êtes pas à l'origine de cette demande, contactez immédiatement notre service client via les coordonnées figurant sur notre site officiel.\n\nCrédit Rivage",
      explain: "Le message est sans lien piégé et renvoie vers les coordonnées officielles. Mais si tu n'as rien signé, c'est un signal grave : quelqu'un a peut-être utilisé ton identité (identité synthétique à partir de données volées).",
      clues: ["Aucune demande de mot de passe ni lien à cliquer", "Renvoi vers les coordonnées officielles", "Contrat dont tu n'as aucun souvenir"],
      tip: "Contacte l'organisme par ses coordonnées officielles, dépose plainte, garde les preuves et fais-toi orienter par cybermalveillance.gouv.fr. Ne communique ta pièce d'identité qu'aux organismes que tu connais."
    },
    {
      level: "expert", img: "maj", channel: "appli", from: "Appli de ton opérateur", marks: ["Ouvre l'application de ton opérateur"], answer: "legit",
      body: "Une mise à jour de sécurité est disponible pour ta box. Ouvre l'application de ton opérateur, rubrique « Ma box », pour l'installer à un moment qui te convient.",
      explain: "Ce message te demande d'ouvrir toi-même l'appli officielle que tu as déjà installée. Il n'y a ni lien externe, ni urgence, ni demande de données.",
      clues: ["Notification dans une appli que tu connais", "Pas de lien externe", "Aucune urgence, aucune demande d'argent"],
      tip: "Les mises à jour de tes appareils connectés sont ta meilleure protection. Active-les, mais lance-les toujours depuis l'appli ou le menu officiel."
    }
  ]
};

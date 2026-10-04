/* Arnaque ou pas ? — contenu du jeu
   Tous les messages sont FICTIFS : noms, numéros et adresses inventés (domaines en .example).
   Aucun vrai logo, aucun lien actif. */
window.GAME = {
  id: "arnaque",
  title: "Arnaque ou pas ?",
  emoji: "🛡️",
  intro: "Un message arrive. Arnaque ou message légitime ? Tu as quelques secondes pour trancher, et on t'explique les indices à chaque fois.",
  question: "Alors, ton verdict ?",
  roundSize: 8,
  channelLabels: { sms: "📱 SMS", email: "📧 E-mail", appel: "📞 Appel téléphonique", reseau: "💬 Message privé", annonce: "🏷️ Petite annonce", rue: "🚏 Dans la rue" },
  answerKeys: ["arnaque", "legit"],
  answerLabels: ["Arnaque !", "Légitime"],
  answerButtons: ["🚨 Arnaque", "✅ Légitime"],
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
      channel: "sms", from: "+33 7 00 00 00 01", answer: "arnaque",
      body: "[Livraison] Votre colis n'a pas pu être livré. Des frais de réexpédition de 1,99 € sont à régler sous 24 h : [[http://colis-suivi-reexp.example/pay]]",
      explain: "Classique du faux SMS de livraison. Les petits frais ne servent qu'à récupérer les données de ta carte bancaire.",
      clues: ["Aucun numéro de suivi ni nom du transporteur", "Urgence de 24 h", "Lien vers un site inconnu"],
      tip: "Tu attends un colis ? Va sur le site ou l'appli du vendeur en tapant toi-même l'adresse."
    },
    {
      channel: "sms", from: "36 123", answer: "legit",
      body: "Votre code de vérification est 482913. Il expire dans 10 minutes. Ne le communiquez à personne. Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.",
      explain: "Message normal, à condition que ce soit toi qui viennes de te connecter ou de t'inscrire quelque part. Ce code sert à confirmer que c'est bien toi.",
      clues: ["Aucun lien à cliquer", "Il rappelle de ne jamais partager le code"],
      tip: "Si tu n'as rien demandé, ignore-le. Et ne donne jamais ce code à quelqu'un qui t'appelle."
    },
    {
      channel: "email", from: "Sécurité <alerte@securite-banque-loire.example>", subject: "Action requise : votre compte sera bloqué", answer: "arnaque",
      body: "Bonjour cher client,\n\nNous avons détecté une activité inhabituelle. Pour éviter le blocage définitif de votre compte, confirmez vos identifiants dans les 12 heures :\n\n[[Vérifier mon compte maintenant]]\n\nMerci de votre confiance.\nLe service sécurité",
      explain: "Hameçonnage (phishing) : le but est de te faire saisir tes identifiants sur une fausse page qui ressemble à celle de ta banque.",
      clues: ["Salutation vague (« cher client »)", "Menace de blocage et délai très court", "Adresse d'expéditeur qui imite sans être la vraie"],
      tip: "Une banque ne te demande jamais tes identifiants par e-mail. Connecte-toi via son appli officielle."
    },
    {
      channel: "appel", from: "Numéro masqué", answer: "arnaque",
      body: "« Bonjour, je suis votre conseiller sécurité. Des paiements suspects ont été détectés sur votre compte. Pour protéger votre argent, je vais vous guider pour le transférer sur un compte sécurisé, et vous allez me communiquer le code reçu par SMS. »",
      explain: "Fraude au faux conseiller. Le « compte sécurisé » appartient aux escrocs, et le code SMS valide le virement à ta place.",
      clues: ["Demande de virer ton argent soi-disant pour le protéger", "Demande du code reçu par SMS", "Pression et appel inattendu"],
      tip: "Raccroche, puis rappelle ta banque au numéro figurant sur ta carte ou ton site officiel."
    },
    {
      channel: "email", from: "MaisonLumière <commande@maisonlumiere-boutique.example>", subject: "Votre commande n° 48217 est expédiée", answer: "legit",
      body: "Bonjour Camille,\n\nMerci pour votre commande de mardi (1 lampe de bureau). Elle part aujourd'hui et sera livrée d'ici jeudi.\n\nVous retrouverez le suivi dans votre espace client habituel.\n\nL'équipe MaisonLumière",
      explain: "Ici, tu as passé une commande réelle et le message ne demande rien : pas d'argent, pas de mot de passe, pas de lien pressant. C'est une simple confirmation.",
      clues: ["Tu reconnais la commande", "Aucune demande de paiement ni d'information", "Prénom correct et détails précis"],
      tip: "Le bon réflexe : vérifier que tu as bien commandé chez ce vendeur avant de te fier au message."
    },
    {
      channel: "sms", from: "+33 6 00 00 00 02", answer: "arnaque",
      body: "Coucou maman c'est moi, j'ai cassé mon téléphone, c'est mon nouveau numéro. Peux-tu me faire un virement urgent ? Je te rembourse demain, j'ai une facture à payer.",
      explain: "Arnaque au faux proche (« Salut maman »). L'escroc joue sur l'émotion et la rapidité pour que tu ne vérifies pas.",
      clues: ["Nouveau numéro inconnu", "Demande d'argent urgente", "Aucun détail que seul ton proche connaît"],
      tip: "Appelle l'ancien numéro de ton proche ou pose une question dont seul lui connaît la réponse."
    },
    {
      channel: "email", from: "Enquête Clients <gagnants@enquete-cadeaux-vip.example>", subject: "Félicitations ! Vous avez gagné un robot aspirateur", answer: "arnaque",
      body: "Vous avez été sélectionné(e) pour notre enquête de satisfaction ! Choisissez votre cadeau parmi 3 produits. Il vous suffit de régler 1,95 € de frais de port :\n\n[[Réclamer mon cadeau]]\n\nOffre valable aujourd'hui seulement !",
      explain: "Faux concours : les « frais de port » servent à capter ta carte bancaire, parfois pour un abonnement caché.",
      clues: ["Tu n'as participé à aucun concours", "Cadeau de valeur contre un tout petit paiement", "Urgence : « aujourd'hui seulement »"],
      tip: "Si c'est trop beau pour être vrai, c'est que c'est faux. Aucune vraie enquête ne te demande ta carte."
    },
    {
      channel: "sms", from: "Avis-Amende", answer: "arnaque",
      body: "Vous avez une amende impayée. Régularisez sous 48 h pour éviter une majoration : [[http://paiement-amende-fr.example/regler]]",
      explain: "Fausse amende : un SMS avec un lien de paiement pressant est un signal d'alerte fort. Le site est un piège à données bancaires.",
      clues: ["Pas de référence précise ni de lieu ni de date", "Délai de 48 h et menace de majoration", "Lien vers un site au nom bricolé"],
      tip: "En cas de doute, va toi-même sur le site officiel de l'administration, sans cliquer sur le lien."
    },
    {
      channel: "email", from: "Cabinet Dr Martin <rdv@cabinet-martin-sante.example>", subject: "Rappel de votre rendez-vous", answer: "legit",
      body: "Bonjour,\n\nNous vous rappelons votre rendez-vous du mardi 14 à 14 h 30 au cabinet.\n\nPour le déplacer ou l'annuler, merci d'appeler le cabinet au numéro habituel.\n\nCordialement,\nLe secrétariat",
      explain: "Message simple, avec un rendez-vous que tu connais, sans lien ni demande d'argent ou de données. C'est ce qu'on attend d'un rappel normal.",
      clues: ["Rendez-vous réel et attendu", "Aucune demande de paiement ni de documents", "Contact via le numéro habituel"],
      tip: "Le critère clé : tu connais l'expéditeur et le message ne te demande rien d'inhabituel."
    },
    {
      channel: "appel", from: "Numéro inconnu", answer: "arnaque",
      body: "« Bonjour, je suis du support technique de votre fournisseur d'accès. Votre ordinateur envoie des alertes de virus. Installez ce petit logiciel de prise en main à distance et je règle le problème pour vous. »",
      explain: "Faux support technique : en installant le logiciel, tu donnes le contrôle de ton ordinateur (et de tes comptes) à l'escroc.",
      clues: ["Appel que tu n'as pas demandé", "Alerte virus alarmante", "Demande d'installer un logiciel à distance"],
      tip: "Un vrai fournisseur ne te contacte pas ainsi. Raccroche, et n'installe rien à la demande d'un inconnu."
    },
    {
      channel: "sms", from: "Santé-Remb", answer: "arnaque",
      body: "Votre organisme de santé vous doit un remboursement de 87,40 €. Mettez à jour vos informations bancaires pour le recevoir : [[http://remboursement-sante-fr.example/maj]]",
      explain: "Fausse promesse de remboursement : on t'attire avec de l'argent pour récupérer tes données bancaires et personnelles.",
      clues: ["Montant précis mais sans détail de dossier", "Demande de mise à jour bancaire par lien", "Expéditeur générique"],
      tip: "Pour vérifier un remboursement, ouvre ton espace personnel officiel en tapant l'adresse toi-même."
    },
    {
      channel: "email", from: "Directeur <direction@societe-exemple-pro.example>", subject: "Urgent et confidentiel", answer: "arnaque",
      body: "Bonjour,\n\nJe suis en réunion et ne peux pas téléphoner. J'ai besoin que tu m'achètes 4 cartes cadeaux de 100 € dès maintenant. Envoie-moi les codes par retour de mail. Je te rembourse ce soir. Reste discret.\n\nMerci,\nLe Directeur",
      explain: "Fraude « au président » : l'escroc se fait passer pour ton chef et demande des cartes cadeaux, impossibles à récupérer une fois les codes envoyés.",
      clues: ["Demande de cartes cadeaux", "Impossible de téléphoner", "Consigne de discrétion et d'urgence"],
      tip: "Vérifie par un autre canal (téléphone, en personne) avant de dépenser quoi que ce soit."
    },
    {
      channel: "reseau", from: "Support Officiel Pages", answer: "arnaque",
      body: "Votre compte a enfreint nos règles de la communauté. Faites appel dans les 12 prochaines heures pour éviter sa suppression définitive : [[http://appel-compte-support.example/verif]]",
      explain: "Faux message de plateforme sociale : la page d'« appel » vole ton mot de passe, puis ton compte est utilisé pour arnaquer tes contacts.",
      clues: ["Menace de suppression", "Délai de 12 h", "Lien externe au lieu de passer par l'appli"],
      tip: "Les vraies notifications se trouvent dans les paramètres de l'appli, pas dans un message privé."
    },
    {
      channel: "sms", from: "CT Rapide", answer: "legit",
      body: "Votre rendez-vous de contrôle technique est confirmé le 12/10 à 9 h 00 au centre CT Rapide. Pour modifier, rappelez le centre au numéro de votre convocation.",
      explain: "Message attendu si tu as pris rendez-vous. Il ne demande aucune donnée et renvoie vers le numéro que tu as déjà.",
      clues: ["Rendez-vous que tu as pris", "Pas de lien ni de demande d'argent", "Renvoi vers un numéro connu"],
      tip: "Un message qui confirme une action que tu as faite, sans rien demander de plus, est généralement fiable."
    },
    {
      channel: "email", from: "Facturation <compta@fournisseur-services.example>", subject: "Facture impayée – dernier rappel", answer: "arnaque",
      body: "Bonjour,\n\nVotre facture n° 20941 est restée impayée. Vous la trouverez en pièce jointe (Facture_20941.zip). Merci de régler sous 3 jours pour éviter des frais de recouvrement.",
      explain: "Pièce jointe piégée : le fichier .zip contient très probablement un logiciel malveillant qui s'installe quand tu l'ouvres.",
      clues: ["Aucun nom de société reconnu", "Pièce jointe .zip inattendue", "Menace de frais de recouvrement"],
      tip: "N'ouvre jamais une pièce jointe inattendue, surtout un fichier .zip ou .exe."
    },
    {
      channel: "annonce", from: "Acheteur : « Julien »", answer: "arnaque",
      body: "Bonjour, je prends ton vélo sans le voir ! Je paie via un service de paiement sécurisé. Je t'envoie un lien : tu y mets ta carte bancaire pour recevoir l'argent, et mon transporteur passe le chercher.",
      explain: "Arnaque à la petite annonce : pour recevoir de l'argent, tu n'as jamais besoin de saisir les données de ta carte. C'est un piège à données bancaires.",
      clues: ["Acheteur qui n'a pas besoin de voir l'article", "Faux « paiement sécurisé » par lien", "Transporteur imposé"],
      tip: "Pour être payé, privilégie la remise en main propre, ou un virement que tu vois arriver sur ton compte."
    },
    {
      channel: "appel", from: "Ta banque (numéro habituel)", answer: "legit",
      body: "« Bonjour, c'est Sophie, de votre agence. Vous aviez demandé un rendez-vous pour parler de votre épargne. Seriez-vous disponible jeudi à 16 h ? Rien d'urgent, vous pouvez aussi me rappeler à l'agence. »",
      explain: "Ce conseiller répond à une demande que tu as faite, propose un rendez-vous physique et ne te demande ni code ni virement. Aucune pression.",
      clues: ["C'est lié à une demande que tu avais faite", "Aucune demande de code, de mot de passe ou de virement", "Possibilité de rappeler l'agence"],
      tip: "Même dans ce cas, tu peux toujours raccrocher et rappeler l'agence toi-même, par prudence."
    },
    {
      channel: "sms", from: "+33 7 00 00 00 03", answer: "arnaque",
      body: "Gagnez 250 € par jour depuis chez vous ! Aucune expérience requise. Écrivez-nous sur WhatsApp pour commencer aujourd'hui : [[wa.example/job250]]",
      explain: "Fausse offre d'emploi : on t'attire avec un gain énorme et facile, puis on te demande de payer une « formation » ou de recevoir de l'argent illégal.",
      clues: ["Gain disproportionné sans compétence", "Contact par SMS non sollicité", "Discussion qui bascule sur une messagerie privée"],
      tip: "Un vrai recruteur ne promet pas 250 € par jour sans entretien ni contrat."
    },
    {
      channel: "email", from: "Invest Boost <contact@crypto-gains-garantis.example>", subject: "+30 % par semaine, garanti", answer: "arnaque",
      body: "Rejoignez les centaines d'investisseurs qui doublent leur capital chaque mois ! Rendement garanti de 30 % par semaine. Dépôt minimum : 250 €. Places limitées, inscrivez-vous maintenant :\n\n[[Je rejoins le programme]]",
      explain: "Aucun placement sérieux ne peut garantir un rendement pareil. C'est le schéma classique de l'escroquerie à l'investissement.",
      clues: ["« Rendement garanti » très élevé", "Places limitées pour créer de l'urgence", "Message non sollicité"],
      tip: "Plus la promesse de gain est forte et rapide, plus le risque d'arnaque est grand."
    },
    {
      channel: "email", from: "MySentinel Games <bonjour@exemple-newsletter.example>", subject: "Confirme ton inscription à la newsletter", answer: "legit",
      body: "Bonjour,\n\nTu viens de demander à recevoir notre newsletter. Pour confirmer, clique sur le bouton ci-dessous.\n\nSi ce n'est pas toi, ignore simplement ce message : tu ne recevras rien.\n\n[[Je confirme mon inscription]]",
      explain: "C'est une confirmation d'inscription classique (double opt-in) : elle n'a de sens que si c'est toi qui viens de t'inscrire, et elle ne demande aucune donnée sensible.",
      clues: ["Tu viens de t'inscrire", "Aucun mot de passe ni donnée bancaire demandés", "Possibilité d'ignorer sans conséquence"],
      tip: "Un clic de confirmation de newsletter est sans risque si tu viens de t'inscrire. Sinon, supprime le message."
    },
    {
      channel: "sms", from: "Info-Énergie", answer: "arnaque",
      body: "Votre fournisseur d'énergie vous doit un trop-perçu de 126 €. Récupérez-le avant ce soir en renseignant votre carte bancaire : [[http://trop-percu-energie.example/rembours]]",
      explain: "Faux remboursement d'énergie : on te dit que tu vas recevoir de l'argent pour te faire saisir ta carte. Les remboursements arrivent sur ton compte sans que tu aies à communiquer ta carte.",
      clues: ["Remboursement à saisir avant « ce soir »", "Demande de carte bancaire pour recevoir de l'argent", "Fournisseur non identifié"],
      tip: "Pour recevoir de l'argent, on a seulement besoin de ton IBAN, jamais de ton code de carte."
    },
    {
      channel: "appel", from: "Numéro officiel affiché", answer: "arnaque",
      body: "« Bonjour, ici la police. Votre carte bancaire est utilisée à l'étranger. Pour la sécuriser, vous allez la couper en deux, donner votre code, et un collègue passera la récupérer chez vous. »",
      explain: "Fausse police : un « collègue » vient chercher ta carte et ton code à domicile. Les numéros peuvent être falsifiés pour paraître officiels.",
      clues: ["Demande de ton code de carte", "Un coursier vient chercher la carte", "Pression et ton autoritaire"],
      tip: "Ni la police ni ta banque ne te demandera jamais ton code. Raccroche et appelle toi-même ta banque."
    },
    {
      channel: "sms", from: "TaBanque", answer: "legit",
      body: "Paiement par carte de 23,50 € chez Boulangerie du Port le 03/10. Si vous ne reconnaissez pas cette opération, contactez le numéro au dos de votre carte.",
      explain: "Alerte de paiement standard que ta banque t'envoie quand tu as activé les notifications. Elle ne contient aucun lien et renvoie vers le numéro au dos de ta carte.",
      clues: ["Pas de lien à cliquer", "Montant et commerçant précis", "Renvoi vers le numéro au dos de la carte"],
      tip: "Si tu ne reconnais pas un paiement, appelle le numéro au dos de ta carte, pas un numéro donné dans un message."
    },
    {
      channel: "email", from: "StreamBox <abonnement@streambox-service.example>", subject: "Votre paiement a échoué", answer: "arnaque",
      body: "Bonjour,\n\nNous n'avons pas pu renouveler votre abonnement StreamBox. Mettez à jour votre carte dans les 24 h pour éviter la suspension :\n\n[[Mettre à jour mon paiement]]",
      explain: "Faux e-mail d'abonnement streaming : le lien mène à une fausse page de paiement qui récupère ta carte.",
      clues: ["Délai de 24 h avant suspension", "Lien vers une mise à jour de paiement", "Adresse expéditeur qui ne correspond pas à ton vrai service"],
      tip: "Vérifie ton abonnement depuis l'appli ou le site officiel, ouvert par toi-même."
    },
    {
      channel: "rue", from: "Horodateur de la rue du Marché", answer: "arnaque",
      body: "Un autocollant « Payez votre stationnement » avec un QR code est collé sur l'horodateur, juste à côté de l'écran. Il te dit de scanner pour payer sans monnaie.",
      explain: "Faux QR code collé par-dessus (ou à côté) des vrais : il redirige vers une page de paiement frauduleuse qui capte ta carte.",
      clues: ["Autocollant visiblement ajouté, pas intégré à l'appareil", "Paiement demandé via un site inconnu", "Pas de mention d'un opérateur officiel"],
      tip: "Avant de scanner, vérifie que le QR code est bien intégré à l'horodateur, ou utilise l'appli officielle de la ville."
    },
    {
      channel: "email", from: "Service Paie <paie@entreprise-exemple.example>", subject: "Votre bulletin de septembre est disponible", answer: "legit",
      body: "Bonjour,\n\nVotre bulletin de paie de septembre est maintenant disponible dans votre espace salarié. Connectez-vous comme d'habitude depuis l'intranet de l'entreprise.\n\nLe service paie",
      explain: "Message normal : il t'invite à te connecter comme d'habitude, sans lien piégé ni demande de données. L'expéditeur correspond à ton entreprise.",
      clues: ["Tu reçois ce type d'avis chaque mois", "Pas de lien urgent ni de demande d'identifiants", "Renvoi vers ton espace habituel"],
      tip: "Même avec ce type de message, va toujours dans ton espace via le chemin que tu connais."
    },
    {
      channel: "sms", from: "Espace-Formation", answer: "arnaque",
      body: "Vos droits à la formation expirent bientôt. Activez-les gratuitement avant minuit : [[http://droits-formation-activ.example/go]]",
      explain: "Fausse alerte sur des droits personnels : elle crée une fausse urgence pour récupérer tes données (identité, numéro de sécurité sociale, banque).",
      clues: ["Urgence : « avant minuit »", "Lien vers un site inconnu", "Expéditeur sans identité claire"],
      tip: "Connecte-toi directement au service officiel concerné pour vérifier tes droits, sans passer par le lien du message."
    },
    {
      channel: "sms", from: "Pharmacie du Centre", answer: "legit",
      body: "Pharmacie du Centre : votre commande est prête, à retirer au comptoir jusqu'à samedi 19 h. Merci de vous munir de votre ordonnance.",
      explain: "Message attendu si tu as passé commande à ta pharmacie : il ne demande aucun paiement en ligne ni donnée, et te donne un retrait en magasin.",
      clues: ["Tu connais la pharmacie et ta commande", "Retrait au comptoir, pas de lien", "Aucune demande de paiement ni d'identifiants"],
      tip: "En cas de doute, appelle la pharmacie au numéro que tu connais."
    }
  ]
};

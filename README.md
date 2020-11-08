#SO-PEKOCKO Back-End 
  
## c'est quoi SO-PEKOCKO API ?
So-Pekocko API est une api backend qui permet de:
  - S'inscrir et de rejoindre la communauté SO-PEKOCKO
  - se connecter
  - ajouter une sauce
  - modifier la sauce ajouté
  - aimer ou ne pas aimer une sauce
  
 ## Comment utiliser cette API?
  clonner cet repository :
      
      - git clone https://github.com/abdelhakhamdouni/abdelhak_hamdouni_P6_03082020.git/
 
 Executez ces lignes dans le terminal:
      
      - npm install
      - npm start
  
 ## Techniqu utilise:
 Cette api est développé sur NODEJS en utilisant ExpressJS.
 la Base de donnée : MongoDB avec Mongoose
 
 ## les routes/url et endpoints: 
 
  ### - post: /api/auth/signup {email, password}
        : Chiffre le mot de passe de l'utilisateur, ajoute l'utilisateur à la base de données
        > message: string
  ### - post: /api/auth/login {email, password}
        : Vérifie les informations d'identification de l'utilisateur, en renvoyant l'identifiant userID 
          depuis la base de données et un jeton Web JSON signé (contenant également
          l'identifiant userID)
        > message:string
  ### - get: /api/sauces 
        : Renvoie le tableau de toutes les sauces dans la base de données 
        > tableau des sauces
  ### - get: /api/sauces/:id
        : renvoie la sauce avec l'ID fourni
        > sauce unique
  ### - post: /api/sauces {sauce: chaine, image: fichier}
        : Capture et enregistre l'image, analyse la sauce en utilisant une chaîne de caractères 
          et l'enregistre dans la base de données, en définissant correctement son
          image URL. Remet les sauces aimées et celles détestées à 0, 
          et les sauces usersliked et celles usersdisliked aux tableaux vides.
        > message: string 
  ### - put: /api/sauces/:id {sauce: json / sauce: string, image: fichier}
        : Met à jour la sauce avec l'identifiant fourni. Si une image est téléchargée, 
          capturez-la et mettez à jour l'image URL des sauces. Si aucun fichier n'est
          fourni, les détails de la sauce figurent directement dans le corps 
          de la demande (req.body.name, req.body.heat etc). Si un fichier est fourni, la 
          sauce avec chaîne est en req.body.sauce.
        > message: string
  ### - delete: /api/sauces/:id
        : supprimer la sauce avec l'ID fourni
        > message: string
  ### - post: /api/sauce/:id/like {userId: string, like: number}
        : Définit le statut "j'aime" pour userID fourni. Si j'aime = 1, l'utilisateur 
          aime la sauce. Si j'aime = 0, l'utilisateur annule ce qu'il aime ou ce qu'il
          n'aime pas. Si j'aime = -1, l'utilisateur n'aime pas la sauce. L'identifiant 
          de l'utilisateur doit être ajouté ou supprimé du tableau approprié, en
          gardant une trace de ses préférences et en l'empêchant d'aimer ou de ne pas aimer 
          la même sauce plusieurs fois. Nombre total de "j'aime" et de "je n'aime
          pas" à mettre à jour avec chaque "j'aime".
        > message: string
 
 ### la doc:
    - https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/Guidelines+API.pdf
 ### note de cadrage:
    - https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/P6_Note%20de%20cadrage%20So%20Pekocko_V3.pdf
 ### project backend 
    - https://github.com/OpenClassrooms-Student-Center/dwj-projet6
    
    
    

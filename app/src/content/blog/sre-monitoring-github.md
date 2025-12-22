---
title: "Comment j'ai transformé GitHub Actions en outil de Monitoring SRE Gratuit"
description: "Surveiller un site coûte cher. Voici comment j'utilise le 'Synthetic Monitoring' avec Playwright et GitHub Cron pour 0€."
pubDate: 2025-01-12
author: "Nasticks"
image: "https://miro.medium.com/v2/resize:fit:1400/1*C-22-Y_-I-fD0X8qF0Jb1Q.png"
tags: ["SRE", "Monitoring", "Playwright", "FinOps"]
---

Une fois mon portfolio en ligne, une question s'est posée : **"Comment savoir s'il tombe en panne ?"**

Je ne voulais pas payer un service SaaS comme Datadog ou Pingdom pour un projet personnel. Je ne voulais pas non plus gérer un serveur VPS dédié juste pour faire tourner Uptime Kuma.

J'ai donc adopté une approche **Serverless SRE** en utilisant les ressources que j'avais déjà : GitHub Actions.

## Le concept du "Synthetic Monitoring"

Au lieu d'attendre qu'un utilisateur se plaigne ("Ton site est cassé"), on envoie un robot visiter le site régulièrement.

J'utilise **Playwright**, un framework de test E2E (End-to-End) très puissant. Il ne se contente pas de vérifier si le serveur répond "200 OK". Il vérifie :
1.  Que la page se charge.
2.  Que le logo est visible.
3.  Que le titre est correct.

C'est ce qu'on appelle tester le **Parcours Utilisateur Réel**.

## Le Hack GitHub Actions

GitHub Actions permet de déclencher des workflows non seulement sur un `push`, mais aussi à des heures précises (Cron).

Voici ma configuration `.github/workflows/deploy.yml` :

```yaml
on:
  # Déclenchement classique au déploiement
  push:
    branches: ["main"]
  
  # 👇 La magie opère ici : Tous les jours à 08h00 UTC
  schedule:
    - cron: '0 8 * * *'
```

Ensuite, il a fallu ruser. Si c'est un monitoring du matin, je ne veux pas redéployer tout le site. Je veux juste lancer les tests.

J'ai utilisé la condition if: always() pour forcer l'exécution des tests même si l'étape de déploiement est sautée :

```YAML

  e2e-test:
    if: always() # Lance-toi même si le déploiement n'a pas eu lieu ce matin
    steps:
      - name: Run Playwright Tests
        env:
          # On teste la PROD, pas le localhost
          PLAYWRIGHT_TEST_BASE_URL: "[https://nasticks.me](https://nasticks.me)"
        run: npx playwright test
```
## Bilan FinOps
  - Coût Infrastructure : 0€ (inclus dans le Free Tier GitHub).
  - Maintenance : Nulle (Pas de serveur à patcher).
  - Fiabilité : Si le test échoue, je reçois une notification GitHub par email immédiatement.

C'est une solution élégante qui prouve qu'on peut faire du SRE (Site Reliability Engineering) sérieux sans budget, juste avec de l'ingéniosité.
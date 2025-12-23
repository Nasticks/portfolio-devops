---
title: "Pourquoi je n'ai PAS utilisé Kubernetes pour ce projet"
description: "Savoir choisir le bon outil est plus important que de choisir l'outil à la mode. Analyse critique de la complexité vs utilité."
pubDate: 2025-01-25
author: "Nasticks"
image: "https://miro.medium.com/v2/resize:fit:1400/1*d6a2f4i3i3i3i3i3.png"
tags: ["Architecture", "Kubernetes", "Opinion", "KISS"]
---

Sur mon CV, vous verrez "Kubernetes", "Helm" et "ArgoCD". J'adore ces technologies. J'ai même un cluster K3s dans mon HomeLab.

Pourtant, pour ce portfolio, j'ai choisi **AWS S3**.

En entretien, on me demande souvent : *"Pourquoi ne pas avoir montré tes compétences K8s ici ?"*
La réponse tient en un principe d'ingénierie : **KISS (Keep It Simple, Stupid)**.

## L'Over-Engineering (Sur-ingénierie)

Déployer un site statique (HTML/CSS) sur Kubernetes, c'est comme utiliser un camion 38 tonnes pour livrer une pizza.

| Critère | Kubernetes (EKS) | S3 Static Hosting |
| :--- | :--- | :--- |
| **Maintenance** | Mises à jour du cluster, patchs de sécurité des nodes, gestion des pods. | Zéro. AWS gère tout. |
| **Sécurité** | Surface d'attaque large (Container breakout, Network policies...). | Surface d'attaque minime (Juste des fichiers). |
| **Complexité** | Yaml, Ingress, Services, Deployments... | Un Bucket Policy. |

## Le "Right Tool for the Job"

Un architecte Senior ne choisit pas la technologie la plus complexe, il choisit la plus adaptée au besoin.

* **Besoin :** Servir du contenu statique rapidement.
* **Contrainte :** Coût faible, maintenance nulle.
* **Solution :** Object Storage (S3).

Kubernetes est fantastique pour les microservices, les applications d'état complexes ou les tâches de fond. Mais pour un portfolio, c'est de la dette technique immédiate.

## Conclusion

Ce n’est pas parce que je sais déployer du Kubernetes qu’il faut l’utiliser partout, mais parce que je sais quand ne pas l’utiliser. C’est exactement ça, la maturité DevOps : choisir l’outil adapté au contexte, pas celui qui fait le plus de bruit.
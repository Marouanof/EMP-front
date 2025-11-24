# Employee Management Frontend

Application Angular pour la gestion des employés.

## Fonctionnalités

- 🔐 Authentification JWT
- 📋 Liste des employés
- ➕ Création d'employés
- ✏️ Modification d'employés
- 🗑️ Suppression d'employés
- 🎨 Interface moderne avec thème bleu/jaune

## Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- Backend Spring Boot en cours d'exécution sur `http://localhost:8080`

## Installation

```bash
npm install
```

## Démarrage

```bash
npm start
```

L'application sera accessible sur `http://localhost:4200`

## Identifiants par défaut

- **Username:** admin
- **Password:** admin

## Structure du projet

```
src/
├── app/
│   ├── components/
│   │   ├── login/          # Page de connexion
│   │   ├── layout/          # Layout avec navigation
│   │   ├── employee-list/   # Liste des employés
│   │   └── employee-form/   # Formulaire d'ajout/modification
│   ├── services/
│   │   ├── auth.service.ts      # Service d'authentification
│   │   └── employee.service.ts  # Service pour les employés
│   ├── guards/
│   │   └── auth.guard.ts    # Guard d'authentification
│   ├── interceptors/
│   │   └── auth.interceptor.ts  # Interceptor pour JWT
│   └── models/
│       ├── employee.model.ts
│       └── auth.model.ts
```

## API Backend

L'application communique avec le backend Spring Boot sur `http://localhost:8080`:

- `POST /api/auth/login` - Authentification
- `GET /api/employees` - Liste des employés
- `GET /api/employees/{id}` - Détails d'un employé
- `POST /api/employees` - Créer un employé
- `PUT /api/employees/{id}` - Modifier un employé
- `DELETE /api/employees/{id}` - Supprimer un employé

## Technologies utilisées

- Angular 21
- TypeScript
- RxJS
- CSS3 (thème personnalisé bleu/jaune)

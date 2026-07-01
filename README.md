# Multi-Tenant CMS Platform – Access Control & Application Flow

## Overview

This application follows a **multi-tenant architecture** where a single platform manages multiple independent websites (**tenants**) under one system.

The platform supports three distinct user roles, each with clearly defined permissions, ownership boundaries, and access rules to ensure security, scalability, and data isolation.

```ts
Roles = ['SUPERADMIN', 'TENANT', 'EDITOR'];
```

---

## Architecture & Roles

### SUPERADMIN

The platform owner with global access across all tenants.

Responsibilities:

- Manage tenants
- Manage users
- Upload and manage shared media
- Create and assign templates
- Control headers, footers, and pages
- View analytics for any tenant

### TENANT

Represents an individual website/client.

Responsibilities:

- Manage own website configuration
- Manage internal editors
- Manage own pages/content
- Use templates created by Super Admin
- Access only own analytics

### EDITOR

Internal content manager for a tenant.

Responsibilities:

- Manage website content
- Upload media
- Update headers and footers
- Create and edit pages

---

## Permission Matrix

| Module    | SUPERADMIN  | TENANT               | EDITOR                   |
| --------- | ----------- | -------------------- | ------------------------ |
| Users     | CRUD        | CRUD (Own Editors)   | ❌                       |
| Media     | CRUD        | CRUD + Read SA Media | CRUD (Tenant + SA Media) |
| Tenants   | CRUD        | Read/Update Own      | ❌                       |
| Pages     | CRUD        | CRUD (Assigned)      | CRUD (Tenant Only)       |
| Header    | CRUD        | CRUD (Assigned)      | CRUD (Tenant Only)       |
| Footer    | CRUD        | CRUD (Assigned)      | CRUD (Tenant Only)       |
| Templates | CRUD        | Read / Use           | Read                     |
| Analytics | All Tenants | Own Only             | ❌                       |

---

## Security Rules

- Validate role on every API
- Validate tenant ownership
- Editors never access other tenants
- Templates are read-only for tenants/editors
- Super Admin bypasses tenant restrictions

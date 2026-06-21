# Data Model

Products must be rendered from JSON.

No hardcoded cards.

---

## Product

{
id: string;
name: string;
category: string;
description: string;
image: string;
price: number;
compareAtPrice?: number;
badge?: string;
variants?: Variant[];
}

---

## Variant

{
id: string;
name: string;
image?: string;
}

---

## Step

{
id: string;
title: string;
icon: string;
products: Product[];
}

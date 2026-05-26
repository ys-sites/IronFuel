const query = `query { products(first: 50) { edges { node { handle variants(first: 1) { edges { node { id } } } } } } }`;
fetch("https://76s90y-fe.myshopify.com/api/2024-04/graphql.json", {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": "665ed20ae0135838f2e0134f20e8811a" },
  body: JSON.stringify({ query })
}).then(r => r.json()).then(data => console.log(data.data.products.edges.map(e => e.node.handle).join("\n"))).catch(e => console.error(e));

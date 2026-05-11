const fetch = require('node-fetch');

async function checkShopify() {
  const query = `
    query {
      products(first: 20) {
        edges {
          node {
            id
            handle
            title
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://76s90y-fe.myshopify.com/api/2024-04/graphql.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "665ed20ae0135838f2e0134f20e8811a"
      },
      body: JSON.stringify({ query })
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e);
  }
}

checkShopify();

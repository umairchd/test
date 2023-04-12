// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const PHYLLO_CREATE_TOKEN_URL = "https://api.sandbox.getphyllo.com/v1/sdk-tokens";

// // Kindly create an env file and pass your crendentials from there.
// const PHYLLO_CLIENT_ID = "c127b69e-ec63-4000-8956-fea5be8566e3";
// const PHYLLO_SECRET_ID = "006476f7-6063-4319-aac0-fdf6a3b1cd53";

// export default async function handler(req, res) {
//   let headers = new Headers();
//   headers.set("Authorization", "Basic " + btoa(PHYLLO_CLIENT_ID + ":" + PHYLLO_SECRET_ID));
//   headers.set("Content-Type", "application/json");
//   if (req.method === "POST") {
//     try {
//       const response = await fetch(`${PHYLLO_CREATE_TOKEN_URL}`, {
//         method: "POST",
//         body: JSON.stringify(req.body),
//         headers: headers,
//       });
//       const result = await response.json();
//       return res.status(response.status).json(result);
//     } catch (err) {
//       return res.status(err.status).json(err);
//     }
//   }
// }



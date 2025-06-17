import { json } from "@remix-run/node";
import db from "../../db.server";
import  withCors from '../../cors';


// get request: accept request with request: customerId, shop, productId.
// read database and return wishlist items for that customer.
export async function loader({ request }) {
  const response = json({
    message: 'Hello from api'
  });

  return withCors(response);

}


// Expexted data comes from post request. If
// customerID, productID, shop
export async function action({ request }) {
  let data = await request.formData();
  data = Object.fromEntries(data);
  const customerId = data.customerId;
  const productId = data.productId;
  const shop = data.shop;
  // const _action = data._action;

  if(!customerId || !productId || !shop) {
    return json({
      message: "Missing data. Required data: customerId, productId, shop",
      // method: _action
    });
  }

  let response;

  switch (request.method) {
    case "POST":
      // Handle POST request logic here
      // For example, adding a new item to the wishlist
      const wishlist = await db.wishlist.create({
        data: {
          customerId,
          productId,
          shop,
        },
      });

      response = json({ message: "Product added to wishlist", method: "POST", wishlisted: true, wishlist: wishlist });
      return withCors(response);

    case "PATCH":
      return withCors({message: "PATCH request"})
    case "DELETE":
     

      response = json({ message: "Product removed from your wishlist"});
      return withCors(response)
    default:
      // Optional: handle other methods or return a method not allowed response
      return new Response("Method Not Allowed", { status: 405 });
  }

}
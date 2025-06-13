import { json } from "@remix-run/node";
import { withCors } from "../../cors";
import {db} from '../../db.server'

export async function loader() {
  return data({
    ok: true,
    message: "Hello from the API",
  });
}

export async function action({ request }) {
  const method = request.method;
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  
  console.log('DATA-------', data)

  const productId = data.productId
  const customerId = data.customerId
  const shop = data.shop

  if(!customerId || !productId || !shop) {
    return json({
      message: 'Missing data. Required data: customerId, productId and shop',
      method: method
    })
  }

  switch (method) {
    case "POST":
      const wishlist = await db?.wishlist.create({
        data: {
          customerId,
          productId,
          shop
        }
      })
      const response = json({message: 'Product added to wishlist', method: 'POST', wishlist: wishlist})
      return withCors(response)
    case "PATCH":
      return json({ message: "Success", method: "PATCH" });

    default:
      return new Response({ message: "Method not allowed" }, { status: 405 });
  }
}

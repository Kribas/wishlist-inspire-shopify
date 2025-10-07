import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
  LegacyCard,
  EmptyState,
  DataTable,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { data, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { formatDistanceToNow, parseISO } from "date-fns";

export const loader = async ({ request }) => {
  const auth = await authenticate.admin(request);
  const shop = auth.session.shop;

  const wishlists = await db.wishlist.findMany({
    where: {
      shop: shop,
    },
    orderBy: {
      id: "asc",
    },
  });

  return data(wishlists);
};

export const action = async ({ request }) => {
  return null;
};

export default function Index() {
  const wishlistData = useLoaderData();
  const rows = wishlistData.data.map((item) => {
    const createdAt = formatDistanceToNow(parseISO(item.createdAt));
    return [item.productId, item.customerId, createdAt];
  });

  return (
    <Page title="Wishlist overview dashboard">
      <ui-title-bar title="Overview"></ui-title-bar>
      <BlockStack gap={500}>
        <Layout>
          <Layout.Section>
            <Card>
              <DataTable
                columnContentTypes={["text", "text", "text"]}
                headings={["ProductId", "CustomerId", "CreatedAt"]}
                rows={rows}
              ></DataTable>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}

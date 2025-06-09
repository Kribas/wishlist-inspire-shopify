import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  Divider,
  useBreakpoints,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { useLoaderData, Form } from "@remix-run/react";
import { data } from "@remix-run/node";

//Import prisma db
import db from "../db.server";

export async function loader() {
  //Get data from database
  let settings = await db.settings.findFirst(); 
  return data(settings);
}

export async function action({ request }) {
  let settings = await request.formData();
  settings = Object.fromEntries(settings)

  await db.settings.upsert({
    where: {
      id: "1",
    },
    update: {
      id: '1',
      name: settings?.name ?? "",
      description: settings?.description ?? "",
    },
    create: {
      id: '1',
      name: settings?.name ?? "",
      description: settings?.description ?? "",
    },
  });
  return data(settings);
}

export default function Settings() {
  const settings = useLoaderData();
  const [formState, setFormState] = useState(settings.data);

  
  

  return (
    <Page>
      <TitleBar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app settings and preferences
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField
                  value={formState?.name}
                  name="name"
                  onChange={(value) => {
                    setFormState({ ...formState, name: value });
                  }}
                  label="App name"
                />
                <TextField
                  value={formState?.description}
                  name="description"
                  onChange={(value) => {
                    setFormState({ ...formState, description: value });
                  }}
                  label="Description"
                />

                <Button submit={true}>Save</Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}

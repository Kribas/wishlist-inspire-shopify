import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  CalloutCard,
  Divider,
  Grid,
  ExceptionList,
  Button,
} from "@shopify/polaris";
import { CheckIcon } from "@shopify/polaris-icons";
export default function Pricing() {
  let planData = [
    {
      title: "Free",
      description: "Free plan with basic features",
      price: "0",
      action: "Upgrade to pro",
      name: "Free",
      url: "/app/upgrade",
      features: [
        "100 wishlist per day",
        "500 Products",
        "Basic customization",
        "Basic support",
        "Basic analytics",
      ],
    },
    {
      title: "Pro",
      description: "Pro plan with advanced features",
      price: "10",
      name: "Monthly subscription",
      action: "Upgrade to pro",
      url: "/app/upgrade",
      features: [
        "Unlimted wishlist per day",
        "10000 Products",
        "Advanced customization",
        "Priority support",
        "Advanced analytics",
      ],
    },
  ];
  return (
    <Page>
      <ui-title-bar title="Pricing" />
      <CalloutCard
        title="Change your plan"
        illustration="https://cdn.shopify.com/s/files/1/0583/6465/7734/files/tag.png?v=1705280535"
        primaryAction={{
          content: "Cancel Plan",
          url: "/app/cancel",
        }}
      >
        <p>You're currently on pro plan all features are unlocked</p>
      </CalloutCard>

      <div style={{ margin: "0.5rem 0" }}>
        <Divider />
      </div>

      <Grid>
        {planData.map((plan_item, index) => (
          <Grid.Cell
            key={index}
            columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
          >
            <Card background="bg-surface-success">
              <Box padding="400">
                <Text as="h3" variant="headingMd">
                  {plan_item.title}
                </Text>
              </Box>
              <Box as="p" variant="bodyMd">
                {plan_item.description}
                <br />
                <Text as="p" variant="headingLg" fontWeight="bold">
                  {plan_item.price == 0 ? "" : `$ ${plan_item.price}`}
                </Text>
              </Box>
              <div style={{ margin: "0.5rem 0" }}>
                <Divider />
              </div>
              <BlockStack gap={100}>
                {plan_item.features.map((feature, index) => (
                  <ExceptionList
                    key={index}
                    items={[
                      {
                        icon: CheckIcon,
                        description: feature,
                      },
                    ]}
                  />
                ))}
              </BlockStack>
              <div style={{ margin: "0.5rem 0" }}>
                <Divider />
              </div>
              <Button primary url={plan_item.url}>
                {plan_item.action}
              </Button>
            </Card>
          </Grid.Cell>
        ))}
      </Grid>
    </Page>
  );
}

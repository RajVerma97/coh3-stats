import React from "react";
import {
  Burger,
  Container,
  Group,
  Header as MantineHeader,
  Title,
  Divider,
  Drawer,
  ScrollArea,
  HoverCard,
  Text,
  SimpleGrid,
  createStyles,
  Stack,
  Indicator,
  ActionIcon,
  Tooltip,
  Anchor,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import { IconBarrierBlock, IconChevronDown } from "@tabler/icons";
import { ColorSchemeToggle } from "../color-scheme-toggle";
import { SearchButton } from "../search-button/search-button";
import { OnlinePlayers } from "../online-players";
import { raceType } from "../../src/coh3/coh3-types";
import { localizedNames } from "../../src/coh3/coh3-data";

export interface HeaderProps {
  // children?: React.ReactNode;
}

const useStyles = createStyles((theme) => ({
  root: {
    marginBottom: theme.spacing.xl,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  burger: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
      textDecoration: "none",
    }),
  },
  disabledLink: {
    color: theme.colorScheme === "dark" ? theme.colors.gray[6] : theme.colors.gray[6],
  },
  subLink: {
    width: "100%",
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },
  dropdown: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
  hiddenDesktop: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
  hiddenMobile: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
}));

export const Header: React.FC<HeaderProps> = () => {
  const { classes, cx } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);

  const factionLink = (faction: raceType, gamemode: string) => (
    <Text>
      <Anchor component={Link} href={"/leaderboards?race=" + faction + "&type=" + gamemode}>
        {localizedNames[faction]}
      </Anchor>
    </Text>
  );

  const gamemodeLeaderboards = (gamemode: string) => (
    <div>
      <Text weight={700}>{gamemode}</Text>
      <Divider my="sm" />
      {factionLink("american", gamemode)}
      {factionLink("german", gamemode)}
      {factionLink("dak", gamemode)}
      {factionLink("british", gamemode)}
    </div>
  );
  return (
    <>
      <MantineHeader height={60} className={classes.root}>
        <Container className={classes.container} fluid>
          <Anchor component={Link} href={"/"}>
            <Group spacing="xs">
              <Image
                src="/logo/android-icon-36x36.png"
                width={30}
                height={30}
                alt={"COH3 Stats logo"}
              />

              <Title order={1} size="h3">
                COH3 Stats
              </Title>
            </Group>
          </Anchor>

          <Group className={classes.hiddenMobile} spacing={0}>
            <HoverCard width={800} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <div>
                  <Anchor component={Link} href="/leaderboards" className={cx(classes.link)}>
                    <Group spacing={3}>
                      Leaderboards
                      <IconChevronDown size={16} />
                    </Group>
                  </Anchor>
                </div>
              </HoverCard.Target>
              <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                <SimpleGrid cols={4} spacing={0}>
                  {gamemodeLeaderboards("1v1")}
                  {gamemodeLeaderboards("2v2")}
                  {gamemodeLeaderboards("3v3")}
                  {gamemodeLeaderboards("4v4")}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
            <Tooltip label="Coming soon" color="orange">
              <Anchor
                component={Link}
                href="#"
                className={cx(classes.link, classes.disabledLink)}
              >
                Statistics{" "}
                <ActionIcon color="orange" size="sm" radius="xl" variant="transparent">
                  <IconBarrierBlock size={16} />
                </ActionIcon>
              </Anchor>
            </Tooltip>

            <Tooltip label="Coming soon" color="orange">
              <Anchor
                component={Link}
                href="#"
                className={cx(classes.link, classes.disabledLink)}
              >
                App{" "}
                <ActionIcon color="orange" size="sm" radius="xl" variant="transparent">
                  <IconBarrierBlock size={16} />
                </ActionIcon>
              </Anchor>
            </Tooltip>
          </Group>

          <Group spacing={5} className={classes.hiddenMobile}>
            <OnlinePlayers />
            <SearchButton />
            <ColorSchemeToggle />
          </Group>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
          <Drawer
            opened={opened}
            onClose={close}
            size="100%"
            padding="md"
            title="Navigation"
            className={classes.hiddenDesktop}
            zIndex={1000000}
          >
            <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
              <Divider my="sm" />
              <Stack px="md">
                <Group grow>
                  <SearchButton onClick={() => close()} />
                </Group>
                <Anchor
                  component={Link}
                  href="/leaderboards"
                  className={classes.link}
                  onClick={() => close()}
                >
                  Leaderboards{" "}
                </Anchor>
                <Tooltip label="Coming soon" color="orange">
                  <Anchor
                    component={Link}
                    href="#"
                    className={cx(classes.link, classes.disabledLink)}
                    onClick={() => close()}
                  >
                    Statistics{" "}
                    <ActionIcon color="orange" size="sm" radius="xl" variant="transparent">
                      <IconBarrierBlock size={16} />
                    </ActionIcon>
                  </Anchor>
                </Tooltip>

                <Tooltip label="Coming soon" color="orange">
                  <Anchor
                    component={Link}
                    href="#"
                    className={cx(classes.link, classes.disabledLink)}
                    onClick={() => close()}
                  >
                    App{" "}
                    <ActionIcon color="orange" size="sm" radius="xl" variant="transparent">
                      <IconBarrierBlock size={16} />
                    </ActionIcon>
                  </Anchor>
                </Tooltip>
              </Stack>

              <Divider my="sm" />

              <Group px="md">
                <ColorSchemeToggle onClick={() => close()} />
              </Group>
            </ScrollArea>
          </Drawer>
        </Container>
      </MantineHeader>
    </>
  );
};

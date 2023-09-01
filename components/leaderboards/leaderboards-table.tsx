import { DataTable } from "mantine-datatable";
import ErrorCard from "../error-card";
import RankIcon from "../rank-icon";
import { Anchor, Group, Text } from "@mantine/core";
import CountryFlag from "../country-flag";
import DynamicTimeAgo from "../other/dynamic-timeago";
import Link from "next/link";
import React from "react";
import { Top1v1LeaderboardsData } from "../../src/coh3/coh3-types";

interface Props {
  leaderBoardData: Top1v1LeaderboardsData | null;
  loading: boolean;
  error: any;
}

const LeaderboardsTable = ({ leaderBoardData, loading, error }: Props) => {
  if (error) {
    return <ErrorCard title={"Error getting the leaderboards"} body={JSON.stringify(error)} />;
  } else {
    return (
      <DataTable
        highlightOnHover
        striped
        // verticalSpacing="xs"
        minHeight={300}
        // provide data
        idAccessor={"statgroup_id"}
        records={leaderBoardData?.data || []}
        fetching={loading}
        // define columns
        columns={[
          {
            accessor: "rank",
            textAlignment: "center",
          },
          {
            title: "ELO",
            accessor: "rating",
            textAlignment: "center",
          },
          {
            title: "Tier",
            accessor: "rating",
            textAlignment: "center",
            render: ({ rank, rating }: any) => {
              return <RankIcon size={28} rank={rank} rating={rating} />;
            },
          },
          // // {
          // //     accessor: "change",
          // //     textAlignment: "center",
          // // },
          {
            accessor: "alias",
            width: "100%",
            // @ts-ignore
            render: ({ members }) => {
              return members.map((member: any) => {
                const { alias, profile_id, country } = member;
                const path = `/players/${profile_id}`;

                return (
                  <Anchor key={profile_id} component={Link} href={path}>
                    <Group spacing="xs">
                      <CountryFlag countryCode={country} />
                      {alias}
                    </Group>
                  </Anchor>
                );
              });
            },
          },
          {
            accessor: "streak",
            // sortable: true,
            textAlignment: "center",
            // @ts-ignore
            render: ({ streak }) =>
              streak > 0 ? (
                <Text color={"green"}>+{streak}</Text>
              ) : (
                <Text color={"red"}>{streak}</Text>
              ),
          },
          {
            accessor: "wins",
            // sortable: true,
            textAlignment: "center",
          },
          {
            accessor: "losses",
            textAlignment: "center",
          },
          {
            accessor: "ratio",
            // sortable: true,
            textAlignment: "center",
            render: ({ wins, losses }: any) => {
              return `${Math.round((wins / (wins + losses)) * 100)}%`;
            },
          },
          {
            accessor: "total",
            // sortable: true,
            textAlignment: "center",
            render: ({ wins, losses }: any) => {
              return `${wins + losses}`;
            },
          },
          // // {
          // //     accessor: "drops",
          // //     sortable: true,
          // //     textAlignment: "center",
          // // },
          // // {
          // //     accessor: "disputes",
          // //     sortable: true,
          // //     textAlignment: "center",
          // // },
          {
            accessor: "lastmatchdate",
            title: "Last Game",
            textAlignment: "right",
            width: 125,
            // @ts-ignore
            render: ({ lastmatchdate }) => {
              return <DynamicTimeAgo timestamp={lastmatchdate} />;
            },
          },
        ]}
        // sortStatus={sortStatus}
        // onSortStatusChange={setSortStatus}
      />
    );
  }
};

export default LeaderboardsTable;

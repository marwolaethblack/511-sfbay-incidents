import { Button, Table, TableProps } from "antd";
import { format, isBefore } from "date-fns";
import React, { FunctionComponent } from "react";
import {
  IPointGeography,
  IRoad,
  ITrafficEvent,
  TrafficEventSeverity,
  TrafficEventSubtypes,
} from "../Api/types";
import { useTrafficEvents } from "../Hooks/useTrafficEvents";
import { ErrorDisplay } from "./ErrorDisplay";

export const TrafficEventsTable: FunctionComponent = () => {
  const { loading, error, trafficEvents, refetch } = useTrafficEvents();

  if (error) {
    return <ErrorDisplay error={error} retry={refetch} />;
  }

  return (
    <>
      <Button
        type="primary"
        className="ml-auto my-3 bg-blue-500"
        size="large"
        onClick={() => refetch()}
      >
        Refresh
      </Button>
      <Table
        loading={loading}
        dataSource={filterInactiveEvents(groupEventsBySeverity(trafficEvents))}
        rowKey={"id"}
        columns={columns}
        rowClassName={(row) => getClassBySeverity(row.severity)}
      />
    </>
  );
};

const filterInactiveEvents = (events: ITrafficEvent[]) => {
  return events.filter((e) => e.status === "ACTIVE");
};

const groupEventsBySeverity = (events: ITrafficEvent[]) => {
  const grouped = events.reduce(
    (acc, e) => {
      acc[e.severity].push(e);
      return acc;
    },
    {
      Severe: [],
      Major: [],
      Minor: [],
      Moderate: [],
      Unknown: [],
    } as Record<TrafficEventSeverity, ITrafficEvent[]>
  );

  return [
    ...grouped.Severe,
    ...grouped.Major,
    ...grouped.Moderate,
    ...grouped.Minor,
    ...grouped.Unknown,
  ];
};

const getClassBySeverity = (severity: TrafficEventSeverity) => {
  switch (severity) {
    case "Severe":
      return "bg-red-600 text-white hover:text-black";
    case "Major":
      return "bg-red-400";
    case "Moderate":
      return "bg-yellow-400";
    case "Minor":
      return "bg-yellow-200";
    default:
      return "";
  }
};

// Looks like antd has a visual bug on sort where it overrides background color set in rowClassName on sort
const sortDates = (a: ITrafficEvent, b: ITrafficEvent) => {
  return isBefore(new Date(a.created), new Date(b.created)) ? 1 : -1;
};

const renderDate = (val: string) => {
  return format(new Date(val), "kk:mm MM/dd/yyyy");
};

const columns: TableProps<ITrafficEvent>["columns"] = [
  {
    title: "Headline",
    dataIndex: "headline" as keyof ITrafficEvent,
  },
  {
    title: "Roads affected",
    dataIndex: "roads" as keyof ITrafficEvent,
    render: (val: IRoad[]) => {
      return val
        .map((r) => r.name + " " + r.from + " " + r.direction)
        .join(", ");
    },
  },
  {
    title: "Event Type",
    dataIndex: "event_type" as keyof ITrafficEvent,
  },
  {
    title: "Event sub type",
    dataIndex: "event_subtypes" as keyof ITrafficEvent,
    render: (val: TrafficEventSubtypes[]) => val.map((v) => <div>{v}</div>),
  },
  {
    title: "Location",
    dataIndex: "geography" as keyof ITrafficEvent,
    render: (val: IPointGeography) => {
      if (val.type === "Point" && val.coordinates) {
        return (
          <Button
            className={"bg-white"}
            onClick={() =>
              window.open(
                `https://maps.google.com/?q=${val.coordinates[1]},${val.coordinates[0]}`
              )
            }
          >
            See location on map
          </Button>
        );
      }
      return "Location unavailable";
    },
  },
  {
    title: "Last updated",
    dataIndex: "updated" as keyof ITrafficEvent,
    render: renderDate,
    sorter: sortDates,
  },
  {
    title: "Created",
    dataIndex: "created" as keyof ITrafficEvent,
    render: renderDate,
    sorter: sortDates,
  },
  {
    title: "Severity",
    dataIndex: "severity" as keyof ITrafficEvent,
  },
];

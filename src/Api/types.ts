export interface ITrafficEventsResponse {
  events: ITrafficEvent[];
  pagination: {
    offset: number;
  };
  meta: {
    url: string;
    up_url: string;
    version: string;
  };
}

export interface ITrafficEvent {
  url: string;
  jurisdiction_url: string;
  id: string;
  status: "ACTIVE" | "ARCHIVED";
  headline: string;
  event_type:
    | "CONSTRUCTION"
    | "SPECIAL_EVENT"
    | "INCIDENT"
    | "WEATHER_CONDITION"
    | "ROAD_CONDITION";
  event_subtypes: TrafficEventSubtypes[];
  severity: TrafficEventSeverity;
  created: string;
  updated: string;
  areas: IAreaAffected[];
  geography: IPointGeography;
  ["+source_type"]: string;
  ["+source_id"]: string;
  roads: IRoad[];
  schedule: {
    /**
     * String of 2 dates seperated by "/"
     */
    intervals: string[];
  };
}

export type TrafficEventSeverity =
  | "Minor"
  | "Moderate"
  | "Major"
  | "Severe"
  | "Unknown";

export interface IRoad {
  name: string;
  from: string;
  direction: string;
  state: string;
  ["+lane_type"]: string;
  ["+lane_status"]: string;
  ["+road_advisory"]: string;
  ["+article"]: string;
}

export interface IAreaAffected {
  name: string;
  id: number;
  url: string;
}

export interface IPointGeography {
  type: "Point";
  crs: {
    type: string;
    properties: Record<string, any>;
  };
  coordinates: ICoordinate;
}

/**
 * Longitude, Latitude
 * */
type ICoordinate = [number, number];

export type TrafficEventSubtypes =
  | "unknown"
  | "Construction"
  | "Emergency construction"
  | "Scheduled roadwork"
  | "Overnight roadwork"
  | "Street sweeping"
  | "Utility work"
  | "Repaving"
  | "Bridge work"
  | "Drawbridge testing"
  | "Guard rail repairs"
  | "Tree trimming"
  | "Mowing"
  | "Watermain break repairs"
  | "Long-term construction"
  | "Weekend long construction"
  | "Traffic signal repairs"
  | "Overhead sign repair"
  | "CCTV repairs"
  | "Gas main repairs"
  | "Tunnel washing"
  | "CMS repairs"
  | "Bridge painting"
  | "Line striping"
  | "Barrier repairs"
  | "Deck work"
  | "Bridge cable repairs"
  | "FasTrak toll lane repairs"
  | "Toll lane repairs"
  | "Toll plaza repairs"
  | "Crack sealing"
  | "Expansion joint repairs"
  | "Attenuator repairs"
  | "Tunnel repairs"
  | "Rock blasting"
  | "Installation of fiber optics"
  | "Renovation"
  | "Structure repair"
  | "Road widening"
  | "Intersection improvements"
  | "Drainage improvements"
  | "Installation of sign structure"
  | "Noise wall construction"
  | "Installation of traffic monitoring systems"
  | "Safety improvements"
  | "Steel repairs"
  | "Installation of conduits"
  | "Installation of traffic management systems"
  | "Culvert repairs"
  | "Viaduct repairs"
  | "Test message"
  | "Seismic retrofit";

// /**
//  * Event Data Type Definitions
//  * Single source of truth for event data structure
//  * Comprehensive types to match events.jsx structure
//  */

// export interface EventInfoSection {
//   name: string;
//   content?: string | object[] | unknown;
//   image?: string;
//   icon?: unknown;
//   prize?: string;
//   entry?: string;
// }

// export interface EventDetail {
//   name: string;
//   email: string;
//   isEventOpened: boolean;
//   type: string;
//   code: string;
//   to: string;
//   tag: string;
//   eventInfo: EventInfoSection[];
// }

// export interface SimpleEvent {
//   name: string;
//   description: string;
//   image?: string;
//   prizepool: string;
// }

// export interface CategoryEvent {
//   category: string;
//   description: string;
//   icon: unknown;
//   events: SimpleEvent[];
// }

// export interface AllEventsDetail {
//   name: string;
//   description: string;
//   to: string;
//   icon: unknown;
//   events: EventDetail[];
// }

// export interface EventCategory {
//   label: string;
//   description: string;
//   events: string[];
// }

// export type EventDetailsRecord = Record<string, EventDetail>;
// export type EventCategoriesRecord = Record<string, EventCategory>;
// export type AllEventsDetailsRecord = AllEventsDetail[];


export interface EventDetail {
  title: string;
  description: string;
  participation: string;
  image?: string;
  registrationLink?: string;
  rounds: string[];
  rules: string[];
  prize: string[];
  schedule: string[];
  contact: string[];
}
export type EventDetailsRecord = Record<string, EventDetail>;
export interface EventCategory {
  label: string;
  description: string;
  events: string[];
}

export type EventCategoriesRecord = Record<string, EventCategory>;

export const EVENTS_CATEGORIES: EventCategoriesRecord = {};

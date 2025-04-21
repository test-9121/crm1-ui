import { Organization } from "@/modules/organizations/types";
import { User } from "@/modules/users/types";
import { ILead } from "@/modules/leads/types";

export interface Event {
  id: string;
  createdDateTime: string;
  lastUpdatedDateTime: string | null;
  title: string;
  description: string;
  notes?: string;
  startDate?: string;
  endDate?: string;
  allDay?: boolean;
  color?: string;
  additionalNote?: string | null;
  leadId?: string;
  userId?: string;
  user?: User;
  lead?: ILead;
  organization?: Organization;
}

export interface EventFormValues {
  title: string;
  description: string;
  notes?: string;
  startDate: string;
  endDate: string;
  allDay?: boolean;
  color?: string;
  leadId?: string;
  userId?: string;
}

export type CalendarView = "month" | "week" | "day" | "agenda";

export interface CalendarProps {
  events: Event[];
  view: CalendarView;
  date: Date;
  onDateChange: (date: Date) => void;
  onEventSelect: (event: Event) => void;
  onDateSelect: (selectInfo: { start: Date; end: Date }) => void;
  loading: boolean;
}

export interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  isCreating: boolean;
  onCreateEvent: (eventData: EventFormValues) => Promise<void>;
  onUpdateEvent: (id: string, eventData: EventFormValues) => Promise<void>;
  onDeleteEvent: (id: string) => Promise<void>;
}

import { ServiceResponse } from "../utils/serviceResponse";
import { Controller } from "tsoa";
import { EventResponse } from "../types/responses";
export declare class EventCreateRequest {
    title: string;
    description?: string | null;
    hoster?: string;
    eventDate?: string;
    eventTime?: string;
    expectedAttendees?: string;
    timeDuration?: string;
    eventLocation?: string;
    status?: string;
}
export declare class EventUpdateRequest {
    title?: string;
    description?: string | null;
    eventDate?: string;
    hoster?: string;
    eventTime?: string;
    expectedAttendees?: string;
    timeDuration?: string;
    eventLocation?: string;
    status?: string;
}
export declare class EventController extends Controller {
    createEvent(data: EventCreateRequest): Promise<ServiceResponse<EventResponse | null>>;
    getAllEvents(): Promise<ServiceResponse<EventResponse[] | null>>;
    getEventById(eventId: string): Promise<ServiceResponse<EventResponse | null>>;
    updateEvent(eventId: string, data: EventUpdateRequest): Promise<ServiceResponse<EventResponse | null>>;
    confirmEvent(eventId: string): Promise<ServiceResponse<EventResponse | null>>;
    cancelEvent(eventId: string): Promise<ServiceResponse<EventResponse | null>>;
    makeCompletedEvent(eventId: string): Promise<ServiceResponse<EventResponse | null>>;
    deleteEvent(eventId: string): Promise<ServiceResponse<EventResponse | null>>;
}

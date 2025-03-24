export interface Announcement {
    _id: string;
    type: {
        [key: string]: string;
    };
    title: {
        [key: string]: string;
    };
    description: {
        [key: string]: string;
    };
    event_type: {
        [key: string]: string;
    }
    date: string;
}

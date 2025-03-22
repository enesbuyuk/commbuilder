export interface Announcement {
    _id: string;
    announcement_type: string;
    announcement_title: {
        [key: string]: string;
    };
    announcement_description: {
        [key: string]: string;
    };
    event_type: {
        [key: string]: string;
    }
    announcement_date: string;
    announcement_url: string;
}

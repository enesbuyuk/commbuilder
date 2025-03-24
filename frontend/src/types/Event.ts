export interface Event {
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
    date: string;
    url: string;
}

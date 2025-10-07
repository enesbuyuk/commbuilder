export interface Speaker {
    _id: string;
    name: {
        [key: string]: string;
    };
    title: {
        [key: string]: string;
    };
}

export interface ScheduleItem {
    time: string;
    topic: {
        [key: string]: string;
    };
    description: {
        [key: string]: string;
    };
    speakerId: string;
}

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
    image?: string;
    speakers?: Speaker[];
    schedule?: ScheduleItem[];
}

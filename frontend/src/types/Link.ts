export interface LinkType {
    _id: string;
    title: {
        [key: string]: string;
    };
    description: {
        [key: string]: string;
    };
    url: string;
    icon: string;
}

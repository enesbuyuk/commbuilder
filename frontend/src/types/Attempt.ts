export type Attempt = {
    ip: string;
    timestamp: Date;
    status: "failed" | "success";
};

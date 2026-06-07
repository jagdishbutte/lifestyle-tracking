export interface Journal {
    id: number;
    title: string;
    content: string;
    mood: "Happy" | "Neutral" | "Sad";
    date: string;
}
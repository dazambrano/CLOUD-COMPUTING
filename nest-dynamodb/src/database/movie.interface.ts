export interface MovieKey {
    id: string;
}

export interface Movie extends MovieKey {
    name: string;
    authors?: Array<any>;
}
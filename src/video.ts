export interface Video {
    id: number;
    title: string;
    description: string;
    views: number;
    src: string;
    creator: Creator;
}

export interface Creator {
    id: number;
    name: string;
    email: string;
}

export const videos: Video[] = [
    {
        id: 324393,
        title: "Video awesome",
        description: "This is something I love",
        views: 24,
        src:
            "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        creator: {
            id: 121212,
            name: "Nicolas",
            email: "nico@las.com"
        }
    },
    {
        id: 1212121,
        title: "Video super",
        description: "This is something I love",
        views: 24,
        src:
            "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        creator: {
            id: 121212,
            name: "Nicolas",
            email: "nico@las.com"
        }
    },
    {
        id: 55555,
        title: "Video nice",
        description: "This is something I love",
        views: 24,
        src:
            "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        creator: {
            id: 121212,
            name: "Nicolas",
            email: "nico@las.com"
        }
    },
    {
        id: 11111,
        title: "Video perfect",
        description: "This is something I love",
        views: 24,
        src:
            "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        creator: {
            id: 121212,
            name: "Nicolas",
            email: "nico@las.com"
        }
    }
];

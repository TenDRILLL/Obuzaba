export class TwitchStream {
    id: string;
    user_id: string;
    user_login: string;
    user_name: string;
    game_id: string;
    game_name: string;
    type: string;
    title: string;
    viewer_count: number;
    started_at: string;
    language: string;
    thumbnail_url: string;
    tag_ids: Array<string>;
    is_mature: boolean;
    getThumbnailUrl: (ThumbnailUrlOptions?) => string;
}

class ThumbnailUrlOptions {
    width?: number;
    height?: number;
}

export class StreamerObject {
    name: string;
    guilds: Array<string>;
}
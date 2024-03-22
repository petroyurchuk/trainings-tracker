export type VideoT = {
  contents: ContentsT[];
  estimatedResults: string;
  next: string;
};

type ContentsT = {
  video: {
    channelId: string;
    channelName: string;
    description: string;
    lengthText: string;
    publishedTimeText: string;
    thumbnails: ThumbnailsT[];
    title: string;
    videoId: string;
    viewCountText: string;
  };
};

type ThumbnailsT = {
  height: number;
  width: number;
  url: string;
};

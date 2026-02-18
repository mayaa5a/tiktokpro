export type VideoItem = {
  id: string;
  uri: string;
  caption: string;
  creator: string;
  tags: string[];
  category: string;
};

export const seedVideos: VideoItem[] = [
  {
    id: 'v1',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    caption: 'Best matcha in SoHo NYC…',
    creator: '@citybites',
    tags: ['#nyc', '#matcha', '#soho'],
    category: 'Food Finds',
  },
  {
    id: 'v2',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    caption: 'NYC itinerary: hidden pizza…',
    creator: '@slicequest',
    tags: ['#nyc', '#pizza', '#itinerary'],
    category: 'Food Finds',
  },
  {
    id: 'v3',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    caption: 'Austin coffee shops you NEED…',
    creator: '@brewtrail',
    tags: ['#austin', '#coffee', '#cafes'],
    category: 'Coffee Spots',
  },
  {
    id: 'v4',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    caption: 'Thrift spots in Austin…',
    creator: '@thriftclub',
    tags: ['#austin', '#thrift', '#vintage'],
    category: 'Thrift Austin',
  },
  {
    id: 'v5',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    caption: 'Shopping in Soho…',
    creator: '@streetstyle',
    tags: ['#soho', '#shopping', '#nyc'],
    category: 'Shopping',
  },
  {
    id: 'v6',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    caption: 'Best vintage stores…',
    creator: '@retrofinds',
    tags: ['#vintage', '#thrift', '#style'],
    category: 'Thrift Austin',
  },
  {
    id: 'v7',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    caption: 'Top 3 brunch spots NYC…',
    creator: '@brunchbunch',
    tags: ['#nyc', '#brunch', '#foodie'],
    category: 'Food Finds',
  },
  {
    id: 'v8',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    caption: 'Cozy study cafes…',
    creator: '@studyfuel',
    tags: ['#cafe', '#study', '#cozy'],
    category: 'Coffee Spots',
  },
  {
    id: 'v9',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    caption: 'Weekend in NYC…',
    creator: '@weekendwanders',
    tags: ['#nyc', '#weekend', '#travel'],
    category: 'NYC Trip',
  },
  {
    id: 'v10',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    caption: 'Best budget eats…',
    creator: '@cheapbites',
    tags: ['#budget', '#food', '#city'],
    category: 'Food Finds',
  },
];

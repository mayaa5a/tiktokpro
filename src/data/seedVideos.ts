export type VideoItem = {
  id: string;
  title: string;
  caption: string;
  tags: string[];
  cityTag?: string;
  category?: string;
  videoUri: string;
  creator?: string;
};

export const seedVideos: VideoItem[] = [
  {
    id: 'vid_nyc_coffee_1',
    title: 'NYC Coffee Run',
    videoUri: 'https://www.pexels.com/download/video/5081884/',
    caption: 'NYC coffee: SoHo Matcha Bar + East Village Espresso…',
    creator: '@citybites',
    tags: ['#nyc', '#coffee', '#matcha'],
    cityTag: 'NYC',
    category: 'Food Finds',
  },
  {
    id: 'vid_nyc_pizza_1',
    title: 'Little Italy Slice',
    videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    caption: 'NYC itinerary: Little Italy Pizza Spot…',
    creator: '@slicequest',
    tags: ['#nyc', '#pizza', '#itinerary'],
    cityTag: 'NYC',
    category: 'Food Finds',
  },
  {
    id: 'vid_austin_coffee_1',
    title: 'Austin Coffee Crawl',
    videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    caption: 'Austin coffee shops you NEED…',
    creator: '@brewtrail',
    tags: ['#austin', '#coffee', '#cafes'],
    cityTag: 'Austin',
    category: 'Coffee Spots',
  },
  {
    id: 'vid_austin_thrift_1',
    title: 'Austin Thrift Finds',
    videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    caption: 'Thrift spots in Austin…',
    creator: '@thriftclub',
    tags: ['#austin', '#thrift', '#vintage'],
    cityTag: 'Austin',
    category: 'Thrift Austin',
  },
  {
    id: 'vid_nyc_shopping_1',
    title: 'SoHo Shopping',
    videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    caption: 'Shopping in SoHo…',
    creator: '@streetstyle',
    tags: ['#soho', '#shopping', '#nyc'],
    cityTag: 'NYC',
    category: 'Shopping',
  },
  {
    id: 'vid_austin_thrift_2',
    title: 'Vintage Austin',
    videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    caption: 'Best vintage stores…',
    creator: '@retrofinds',
    tags: ['#vintage', '#thrift', '#style'],
    cityTag: 'Austin',
    category: 'Thrift Austin',
  },
  {
    id: 'vid_nyc_brunch_1',
    title: 'NYC Brunch Crawl',
    videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    caption: 'Top 3 brunch spots NYC…',
    creator: '@brunchbunch',
    tags: ['#nyc', '#brunch', '#foodie'],
    cityTag: 'NYC',
    category: 'Food Finds',
  },
  {
    id: 'vid_cafe_cozy_1',
    title: 'Cozy Study Cafes',
    videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    caption: 'Cozy study cafes…',
    creator: '@studyfuel',
    tags: ['#cafe', '#study', '#cozy'],
    category: 'Coffee Spots',
  },
  {
    id: 'vid_nyc_day_1',
    title: 'Weekend in NYC',
    videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    caption: 'Weekend in NYC…',
    creator: '@weekendwanders',
    tags: ['#nyc', '#weekend', '#travel'],
    cityTag: 'NYC',
    category: 'NYC Trip',
  },
  {
    id: 'vid_budget_eats_1',
    title: 'Budget Eats',
    videoUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    caption: 'Best budget eats…',
    creator: '@cheapbites',
    tags: ['#budget', '#food', '#city'],
    category: 'Food Finds',
  },
];

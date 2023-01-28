export type User = {
  email: string;
  password: string;
  name: string;
  id: number;
};

export type Camp = {
  id: number;
  title: string;
  content: string;
  image: string;
  rating: number;
  createdAt: number;
  authorId: number;
};

export type Comments = {
  body: string;
  userId: string;
  campId: string;
  createdAt: number;
  id: string;
};

const DB: {
  users: User[];
  comments: Comments[];
  camps: Camp[];
} = {
  users: [
    {
      email: "testuser2@email.com",
      password: "$2a$10$Z13UXGKjiYckGu3vPXm86ehI3Jxe0e/19ZPsvdtzfyp6T8RIKJI/W",
      name: "testuser2",
      id: "BdKRZlc",
    },
    {
      email: "olivier@mail.com",
      password: "$2a$10$Z13UXGKjiYckGu3vPXm86ehI3Jxe0e/19ZPsvdtzfyp6T8RIKJI/W",
      name: "Olivier Monge",
      id: "4qeHDdb",
    },
    {
      email: "fakeuser@email.com",
      password: "$2a$10$k2b77voEJy9ev.C.kqFyk.K0TgRGbFV.3AkyBnTS4zrRC1ezcwxgy",
      name: "Olivier Monge",
      id: "ys8Fvor",
    },
    {
      email: "foobar@email.com",
      password: "$2a$10$nFtKR33hbSvcU7SSqQXdt.jqBiRim194NL7LCkCt4dEPTH3P5SszO",
      name: "Foo Bar",
      id: "5nvBfp1",
    },
    {
      email: "fakeuser1@email.com",
      password: "$2a$10$ntLXAfAAbaJtGGg2K3IzNer7sMOpzTirINsOwyl8KDqvTtVh7WO/i",
      name: "Fake User",
      id: "duJbjLy",
    },
    {
      email: "fakeuser17@email.com",
      password: "$2a$10$HoobcSjpLSL7iwrZl60WSO9UHpLUNr4YyDRWNDARE4h6O1wQXwBVW",
      name: "my name",
      id: "pDRjeju",
    },
  ],
  camps: [
    {
      id: "1",
      title: "Random Camp",
      content: "This was a great campsite",
      image:
        "https://www.planetware.com/wpimages/2020/08/canada-ontario-best-campgrounds-algonquin-provincial-park-fog.jpg",
      rating: "4",
      createdAt: 1667645046044,
      userId: "BdKRZlc",
    },
    {
      id: "2",
      title: "Pacific Rim National Park, B.C.",
      content:
        "The main draw: Long Beach is the ultimate Pacific experience—22 kilometres of sand with a horizon that disappears into the ocean. Green Point marks the lone campground along its length. The campsites here sit on a ledge above the beach, close enough to the ocean that the sound of surf lulls campers to sleep. A short path descends to the sand. Most of the 113 sites are drive-in but there are 18 walk-in spots that are somewhat secluded.",
      image: "https://www.explore-mag.com/media/image/56883_max.jpg",
      rating: "3",
      createdAt: 1667645046044,
      userId: "BdKRZlc",
    },
    {
      id: "3",
      title: "Cathedral Provincial Park, B.C.",
      content:
        "The main draw: It takes a day of hiking to get to this campground at the centre of Cathedral Provincial Park, in the Cascade Mountains west of B.C.’s Okanagan, but the park’s interior is worth it: a subalpine plateau of fish-filled lakes, unique geology, alpine meadows and, most importantly, plenty of hikeable summits and ridges. Day hikes project like spokes on a wheel from the campground, which sits on a turquoise lake across from impressive granite walls.",
      image: "https://www.explore-mag.com/media/image/56927_max.jpg",
      rating: "4",
      createdAt: 1667745046044,
      userId: "BdKRZlc",
    },
    {
      title: "Alice Lake Provincial Park, B.C.",
      content:
        "The main draw: What this small park lacks in size it makes up for in location, sitting just north of Squamish—“Canada’s Outdoor Recreation Capital.” Campground paths link into the area’s world-class mountain-biking network. Nearby hiking is steep but spectacular with mountain-to-ocean views. And of course there’s the rock climbing that put Squamish on the map. When you get tired—and you will—hop in Alice Lake for a refreshing dip and then relax on the sandy beach.\n\nThings to do: A good warm-up to Squamish mountain biking is Wonderland, a three-kilometre roller-coaster ride starting just outside the campground. Link it with Brackendale trails and Cheshire Cat and White Rabbit for an intermediate loop. Forgo hiking in the park itself for better trails a short drive away: the hike to the three summits of the Stawamus Chief, the trek to the alpine meadows on the way to Elfin Shelter, and the stiff but rewarding climb to Garibaldi Lake in Garibaldi Provincial Park. Get a feel for the local granite at the one-pitch-rich Smoke Bluffs climbing area before getting high on a Squamish multi-pitch classic, such as Snake or Diedre.\n",
      rating: "4",
      userId: "BdKRZlc",
      image: "https://www.explore-mag.com/media/image/56884_max.jpg",
      createdAt: 1667745046044,
      id: "-hWzHOa",
    },
    {
      title: "A camp",
      content: "a content filler",
      rating: "2",
      userId: "5nvBfp1",
      image: "https://www.explore-mag.com/media/image/56884_max.jpg",
      createdAt: 1668745056032,
      id: "T1bmP9B",
    },
    {
      title: "a new camp",
      content: "asfsafa",
      rating: "2",
      userId: "5nvBfp1",
      image: "https://www.explore-mag.com/media/image/56884_max.jpg",
      createdAt: 1668746467600,
      id: "R9ZJ6hN",
    },
    {
      title: " Waterton Lakes National Park, Alberta",
      content:
        "The main draw: You might wonder why a campground in the middle of a village—on a vast grassy field mowed by fearless mule deer into putting-green perfection—qualifies for this list. The reason is that Waterton Lakes is by far the smallest of our Rocky Mountain national parks, so that even when you’re camping in town, you’re still within easy striking range of the park’s day hikes and other activities. Plus, you’re just down the road from restaurants and stores.\n\nThings to do: The jewel of Waterton is the one-way, 18-kilometre Carthew-Alderson Trail. Take one of the morning shuttle buses to the trailhead at Cameron Lake. The trail meanders uphill for the first eight kilometres to Carthew Ridge, with its imperial views, and then descends all the way back to town. Another excellent choice is the 17-kilometre (return) Crypt Lake Trail, which begins with a boat ride to the east side of Upper Waterton Lake and then climbs past waterfalls, through a tunnel and along cliff faces until you reach the trail’s namesake lake. While in town, check out the stately Prince of Wales Hotel, dramatically positioned on a high bench overlooking the Waterton Lakes.",
      rating: "3",
      userId: "pDRjeju",
      image: "https://www.explore-mag.com/media/image/56887_max.jpg",
      createdAt: 1668997179276,
      id: "9BSLHHG",
    },
    {
      title: "Nopiming Provincial Park, Manitoba",
      content:
        "The main draw: Quiet Nopiming Provincial Park possesses all the qualities of its southern neighbour, the Whiteshell, except for one—it doesn’t have too many visitors. The park’s lakes and rivers combine into excellent canoe routes through the Canadian Shield on the Manitoba-Ontario border. A woodland caribou herd wanders its northern reaches and moose and wolves are commonly seen. With only 36 sites, Tulabi is not only the closest campground in the park to Winnipeg but also the most private, with its own beach right on the Bird River canoe route.\n\nThings to do: Launch your canoe at the campground and spend a day paddling up the Bird River to Elbow Lake via a series of portages. The next day, head in the other direction and fish for walleye, pike and bass in Bird Lake’s many bays. The Walking on Ancient Mountains Trail may be a bit of a drive, but this short hike provides an excellent view from the top of a rocky outcrop. You’ll also see evidence of the peaks that once towered above, and witness how the forest is returning after a major fire 30 years ago. Or just hang your camping hammock among the spruce trees and stargaze late into the night.",
      rating: "3",
      userId: "5nvBfp1",
      image: "https://www.explore-mag.com/media/image/56891_max.jpg",
      createdAt: 1668997695124,
      id: "4ZZYhyN",
    },
    {
      title: "A camp",
      content: "content",
      rating: "2",
      userId: "5nvBfp1",
      image: "https://www.explore-mag.com/media/image/56884_max.jpg",
      createdAt: 1668998313921,
      id: "GDhSEfm",
    },
  ],
  comments: [
    {
      body: "Great camp to visit.",
      userId: "4qeHDdb",
      campId: "1",
      createdAt: 1668746522922,
      id: "i-zMDLa",
    },
    {
      body: "I liked it!!!",
      userId: "5nvBfp1",
      createdAt: 1668747779396,
      campId: "1",
      id: "Bt-WILL",
    },
    {
      body: "Great Camp. I enjoyed it :)",
      userId: "5nvBfp1",
      createdAt: 1668747863490,
      campId: "1",
      id: "l3DdmW7",
    },
    {
      body: "Bad Camp",
      userId: "5nvBfp1",
      createdAt: 1668974281362,
      campId: "1",
      id: "CYW2muy",
    },
    {
      body: "I wrote this post",
      userId: "pDRjeju",
      createdAt: 1668997246411,
      campId: "9BSLHHG",
      id: "PWBEeqF",
    },
    {
      body: "Hello....",
      userId: "pDRjeju",
      createdAt: 1668997262626,
      campId: "1",
      id: "p5TtZdX",
    },
    {
      body: "Hello World!!!!!!!!!!!",
      userId: "pDRjeju",
      createdAt: 1668997274572,
      campId: "1",
      id: "TVoutCv",
    },
  ],
};

export default DB;

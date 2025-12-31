export type Event = {
  image: string; // path under /images in public
  title: string;
  slug: string;
  location: string;
  date: string; // human-friendly date
  time: string;
};

export const events: Event[] = [
  {
    image: '/images/event1.png',
    title: 'Google I/O 2026',
    slug: 'google-io-2026',
    location: 'Mountain View, CA / Online',
    date: 'May 14-16, 2026',
    time: '09:00 PST',
    
  },
  {
    image: '/images/event2.png',
    title: 'React Conf 2026',
    slug: 'react-conf-2026',
    location: 'San Francisco, CA / Online',
    date: 'April 7-8, 2026',
    time: '10:00 PST',
  },
  {
    image: '/images/event3.png',
    title: 'KubeCon + CloudNativeCon 2026',
    slug: 'kubecon-2026',
    location: 'Barcelona, Spain / Online',
    date: 'June 2-5, 2026',
    time: '09:00 CEST',
  },
  {
    image: '/images/event4.png',
    title: 'Next.js Conf 2026',
    slug: 'nextjs-conf-2026',
    location: 'Online',
    date: 'September 10, 2026',
    time: '10:00 UTC',
  },
  {
    image: '/images/event5.png',
    title: 'JSConf EU 2026',
    slug: 'jsconf-eu-2026',
    location: 'Berlin, Germany',
    date: 'May 21-22, 2026',
    time: '09:30 CEST',
  },
  {
    image: '/images/event6.png',
    title: 'HackMIT 2026',
    slug: 'hackmit-2026',
    location: 'Cambridge, MA',
    date: 'February 1-2, 2026',
    time: '08:00 EST',
  }
];

export default events;

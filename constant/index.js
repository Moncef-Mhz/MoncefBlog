import {
  Container,
  Dribbble,
  Factory,
  LayoutGrid,
  Tag,
  Facebook,
  Instagram,
  User,
  Flame,
} from "lucide-react";
// import Facebook from "next-auth/providers/facebook";

const NavLinks = [
  {
    name: "Home",
    href: "/",
  },
  { name: "Posts", href: "/posts" },
  { name: "About", href: "/about" },
  {
    name: "Portfolio",
    href: "https://moncefmeharzi.netlify.app/",
  },
];
const items = [
  { label: "Dashboard", icon: <LayoutGrid />, key: "/admin/dashboard" },
  { label: "Posts", icon: <Container />, key: "/admin/posts" },
  { label: "Tags", icon: <Tag />, key: "/admin/tags" },
  { label: "Trending", icon: <Flame />, key: "/admin/trending" },
  { label: "Users", icon: <User />, key: "/admin/users" },
];
const Category = [
  {
    id: 1,
    title: "All",
  },
  {
    id: 2,
    title: "Programming",
  },
  {
    id: 3,
    title: "Design",
  },
  {
    id: 4,
    title: "Gaming",
  },
  {
    id: 5,
    title: "Finance",
  },
];
const SocialMedia = [
  {
    id: 1,
    name: "Dribble",
    icon: <Dribbble />,
    link: "https://dribbble.com/DesignByMoncef",
  },
  {
    id: 2,
    name: "Facebook",
    icon: <Facebook />,
    link: "https://dribbble.com/DesignByMoncef",
  },
  {
    id: 3,
    name: "Instagram",
    icon: <Instagram />,
    link: "https://dribbble.com/DesignByMoncef",
  },
];
const trendingPosts = [
  {
    id: 1,
    title: "Essentials Apps for Boosting your productivity",
    image:
      "https://designobit.com/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Fdjbkujkg%2Fimage%2Fupload%2Fv1721992404%2Fnukp6rg3xzqvpecxhcwt.png&w=1920&q=75",
    author: "Moncef",
    slug: "essentials-apps-for-boosting-your-productivity",
    date: "2024/07/26",
  },
  {
    id: 2,
    title: "Implementing Analytics in Next.js: A Step-by-Step Guide",
    image:
      "https://designobit.com/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Fdjbkujkg%2Fimage%2Fupload%2Fv1719835225%2Fvrrjffj2o3gwejc8f5rb.png&w=1920&q=75",
    slug: "implementing-analytics-in-nextjs-a-step-by-step-guide",
    author: "Moncef",
    date: "2024/07/01",
  },
  {
    id: 3,
    title: "4 Pro CSS tricks will blow your mind",
    image:
      "https://designobit.com/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Fdjbkujkg%2Fimage%2Fupload%2Fv1720624652%2Feh5sx736bhix6lwnhqp5.png&w=1920&q=75",
    author: "Moncef",
    slug: "4-pro-css-tricks-will-blow-your-mind",
    date: "2024/07/10",
  },
  {
    id: 4,
    title:
      "why do you need to know data structure and algorithms as a self-thought programmer",
    image:
      "https://designobit.com/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Fdjbkujkg%2Fimage%2Fupload%2Fv1718892974%2Fqlnoqgsm2mnbb0qozrz7.jpg&w=1920&q=75",
    author: "Moncef",
    slug: "why-do-you-need-to-know-data-structure-and-algorithms-as-a-self-thought-programmer",
    date: "2024/06/20",
  },
];
export { NavLinks, items, SocialMedia, Category, trendingPosts };

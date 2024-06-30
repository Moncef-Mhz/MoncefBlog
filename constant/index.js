import { Container, Dribbble, LayoutGrid, Tag, User } from "lucide-react";
import Instagram from "next-auth/providers/instagram";
import Twitter from "next-auth/providers/twitter";

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
  { label: "Users", icon: <User />, key: "/admin/users" },
  // { label: "Media", icon: <Image />, key: "/admin/media" },
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
  { id: 2, name: "Twitter", icon: <Twitter />, link: "" },
  { id: 3, name: "Instagram", icon: <Instagram />, link: "" },
];
export { NavLinks, items, SocialMedia, Category };

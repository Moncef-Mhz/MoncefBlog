import { Container, Image, LogOut, Tag, User } from "lucide-react";

const NavLinks = [
  {
    name: "Home",
    href: "/",
  },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  {
    name: "Contact",
    href: "/contact",
  },
];
const items = [
  { label: "Posts", icon: <Container />, key: "/admin/posts" },
  { label: "Tags", icon: <Tag />, key: "/admin/tags" },
  { label: "Users", icon: <User />, key: "/admin/users" },
  { label: "Media", icon: <Image />, key: "/admin/media" },
];
export { NavLinks, items };

import { Gutter } from "@/components/layout/Gutter";
import Hero from "@/components/layout/Hero/page";
import NewsLatter from "@/components/layout/NewsLetter";
import RecentPosts from "@/components/layout/Posts";
import Search from "@/components/ui/Search";

export default function Home() {
  return (
    <>
      <Search />
      <Hero />
      <NewsLatter />
      <Gutter>
        <RecentPosts />
      </Gutter>
    </>
  );
}

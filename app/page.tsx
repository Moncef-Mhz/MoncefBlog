import { Gutter } from "@/components/layout/Gutter";
import Hero from "@/components/layout/Hero/page";
import NewsLatter from "@/components/layout/NewsLetter";
import RecentPosts from "@/components/layout/Posts";

export default function Home() {
  return (
    <>
      <Hero />
      <NewsLatter />
      <Gutter>
        <RecentPosts />
      </Gutter>
    </>
  );
}

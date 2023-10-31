import Header from "@/components/Header";
import Main from "@/components/Main";
import Search from "@/components/Search";
import Section from "@/components/Section";

export default function Home() {
  return (
    <main>
      { /* Header */}
      <Header />
      {/* Search */}
      <Search />
      { /* Main */ }
      <Main />
      { /* Sub */}
      <Section name="STYLES" />
    </main>
  )
}

import Image from "next/image";

export function HomeHeroBackground() {
  return (
    <div className="home-hub-page__hero-bg" aria-hidden="true">
      <Image
        src="/heder-light.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="home-hub-page__hero-bg-img home-hub-page__hero-bg-img--light object-cover object-top"
      />
      <Image
        src="/heder-dark.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="home-hub-page__hero-bg-img home-hub-page__hero-bg-img--dark object-cover object-top"
      />
      <div className="home-hub-page__hero-bg-overlay" />
    </div>
  );
}

/** Full-page galaxy starfield for the homepage (hero through footer) */
export function HomeGalaxyBackdrop() {
  return (
    <div
      className="home-galaxy-backdrop pointer-events-none fixed inset-0 z-0 opacity-0 dark:opacity-100"
      aria-hidden
    >
      <div className="home-hero__cosmos absolute inset-0" />
      <div className="home-hero__galaxy-mist absolute inset-0" />
      <div className="home-hero__galaxy-teal absolute inset-0" />
      <div className="home-hero__stars-fine absolute inset-0" />
      <div className="home-hero__stars-dense absolute inset-0" />
      <div className="home-hero__stars-mid absolute inset-0" />
      <div className="home-hero__stars-color absolute inset-0" />
      <div className="home-hero__stars-glow absolute inset-0" />
    </div>
  );
}

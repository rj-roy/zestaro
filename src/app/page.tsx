import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone, Quote, Star } from "lucide-react";
import AddToCart from "@/components/pages/Menu/AddToCart";
import { getDataByQueryParams } from "@/lib/api/getData";
import { userSession } from "@/lib/core/session";
import type { MenuItem } from "@/types/MenuPage";

export const metadata: Metadata = {
  title: "Zestaro — Fresh Flavor, Made to Order",
  description:
    "Seasonal plates and wood-fired classics at Zestaro. Order online for delivery or pickup, or reserve a table tonight.",
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop";

const FALLBACK_DISHES: MenuItem[] = [
  {
    _id: "citrus-glazed-salmon",
    name: "Citrus-Glazed Salmon",
    description:
      "Wood-fired Atlantic salmon with charred orange, honey glaze and crisp seasonal greens.",
    price: 24,
    imageUrl:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop",
    dietaryTags: ["Gluten-Free"],
  },
  {
    _id: "zestaro-margherita",
    name: "Zestaro Margherita",
    description:
      "San Marzano tomatoes, fior di latte and torn basil on our 48-hour sourdough base.",
    price: 16,
    imageUrl:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1200&auto=format&fit=crop",
    dietaryTags: ["Vegetarian"],
  },
  {
    _id: "harvest-burrata-bowl",
    name: "Harvest Burrata Bowl",
    description:
      "Creamy burrata over roasted heirloom squash, pomegranate and toasted pumpkin seeds.",
    price: 14,
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
    dietaryTags: ["Vegetarian"],
  },
  {
    _id: "dark-chocolate-tart",
    name: "Dark Chocolate Tart",
    description:
      "Silky 70% dark chocolate ganache, sea salt flakes and a whisper of espresso cream.",
    price: 9,
    imageUrl:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1200&auto=format&fit=crop",
    dietaryTags: ["Vegetarian"],
  },
];

const NAV_LINKS = [
  { name: "Menu", href: "/menu" },
  { name: "Reservations", href: "/reservations" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const ADDRESS = "42 Cardamom Lane, Banani, Dhaka 1213";
const PHONE = "+880 1700 112 233";
const EMAIL = "hello@zestaro.com";

const OPENING_HOURS = [
  { days: "Monday – Thursday", time: "11:00 AM – 10:00 PM" },
  { days: "Friday – Saturday", time: "11:00 AM – 11:00 PM" },
  { days: "Sunday", time: "12:00 PM – 9:00 PM" },
];

const TESTIMONIALS = [
  {
    quote:
      "The citrus-glazed salmon alone is worth the trip. Warm light, warmer people — Zestaro feels like dinner at a friend's place.",
    name: "Ayesha K.",
    detail: "Regular guest",
  },
  {
    quote:
      "Ordered delivery on a rainy night and everything arrived hot, boxed beautifully, and still crisp. This is how it should be done.",
    name: "Daniel M.",
    detail: "Delivery regular",
  },
  {
    quote:
      "Booked a table for eight and every plate came out perfectly timed. The staff remembered our names by dessert.",
    name: "Farhana & Rafi",
    detail: "Anniversary dinner",
  },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
      </svg>
    ),
  },
];

async function getFeaturedDishes(): Promise<MenuItem[]> {
  try {
    const response = await getDataByQueryParams<MenuItem[]>(
      "/api/v1/get/menu/query?limit=4&page=1"
    );
    const items = response.data ?? [];
    return items.length > 0 ? items : FALLBACK_DISHES;
  } catch {
    return FALLBACK_DISHES;
  }
}

async function getUserId(): Promise<string | undefined> {
  try {
    const session = await userSession();
    return session?.user.id;
  } catch {
    return undefined;
  }
}

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex items-center gap-0.5" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} fill-primary text-primary`} />
      ))}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-serif text-3xl font-bold text-secondary dark:text-tertiary sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

async function Home() {
  const [featuredDishes, userId] = await Promise.all([
    getFeaturedDishes(),
    getUserId(),
  ]);

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative isolate flex min-h-[600px] items-center overflow-hidden bg-bl-p">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bl-p via-bl-p/70 to-bl-p/30" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Zestaro · Kitchen &amp; Table
          </p>
          <h1 className="max-w-3xl font-serif text-5xl font-bold leading-tight text-tertiary sm:text-6xl">
            Fresh flavor, <span className="text-primary">made to order</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-tertiary/80">
            Seasonal plates and wood-fired classics, cooked to order and served
            with care. Dine in, pick up, or let us bring the warmth to your door.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-tertiary shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl active:scale-95"
            >
              Order Online
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/reservations"
              className="inline-flex items-center gap-2 rounded-xl border border-tertiary/40 px-6 py-3 font-semibold text-tertiary transition-colors hover:border-tertiary hover:bg-tertiary/10"
            >
              Reserve a Table
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-sm text-tertiary/80">
            <span className="flex items-center gap-2">
              <Stars />
              4.9 from 600+ reviews
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Open today until 10 PM
            </span>
          </div>
        </div>
      </section>

      {/* Featured dishes */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="From the kitchen" title="Featured dishes" />
          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            View full menu
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {featuredDishes.map((dish, index) => (
            <article
              key={dish._id ?? index}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral/10 bg-wh-s shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-neutral/10"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={
                    dish.imageUrl && dish.imageUrl.trim().length > 0
                      ? dish.imageUrl
                      : FALLBACK_DISHES[index % FALLBACK_DISHES.length]
                          .imageUrl ?? HERO_IMAGE
                  }
                  alt={dish.name ?? "Featured dish"}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {dish.dietaryTags && dish.dietaryTags.length > 0 && (
                  <div className="absolute right-4 top-4 flex gap-2">
                    {dish.dietaryTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/90 px-2 py-1 text-xs font-semibold text-secondary backdrop-blur-sm dark:bg-secondary/90 dark:text-tertiary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-xl font-bold text-secondary dark:text-tertiary">
                    {dish.name}
                  </h3>
                  <span className="text-lg font-bold text-primary">
                    ${dish.price}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm text-neutral">
                  {dish.description}
                </p>
                <AddToCart
                  itemId={dish._id ?? ""}
                  itemName={dish.name ?? ""}
                  itemPrice={dish.price ?? 0}
                  itemDesc={dish.description ?? ""}
                  userId={userId}
                  imageUrl={
                    dish.imageUrl && dish.imageUrl.trim().length > 0
                      ? dish.imageUrl
                      : FALLBACK_DISHES[index % FALLBACK_DISHES.length]
                          .imageUrl ?? ""
                  }
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Hours & location */}
      <section className="w-full bg-tertiary dark:bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Find us"
            title="Hours & Location"
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-neutral/15 bg-wh-s p-8 dark:bg-bl-p">
              <h3 className="font-serif text-2xl font-bold text-secondary dark:text-tertiary">
                Visit us
              </h3>
              <ul className="mt-6 space-y-5 text-sm text-neutral">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-secondary dark:text-tertiary">
                    {ADDRESS}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <a
                    href={`tel:${PHONE.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-primary"
                  >
                    {PHONE}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <a
                    href={`mailto:${EMAIL}`}
                    className="transition-colors hover:text-primary"
                  >
                    {EMAIL}
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-neutral/15 bg-wh-s p-8 dark:bg-bl-p">
              <h3 className="font-serif text-2xl font-bold text-secondary dark:text-tertiary">
                Opening hours
              </h3>
              <ul className="mt-6 space-y-4">
                {OPENING_HOURS.map((slot) => (
                  <li
                    key={slot.days}
                    className="flex items-center justify-between gap-4 border-b border-dashed border-neutral/20 pb-4 text-sm last:border-none last:pb-0"
                  >
                    <span className="font-medium text-secondary dark:text-tertiary">
                      {slot.days}
                    </span>
                    <span className="text-right text-neutral">{slot.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-xs font-medium text-primary">
                <Clock className="h-4 w-4" />
                Kitchen closes 30 minutes before doors.
              </p>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Zestaro+Banani+Dhaka"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex min-h-64 items-center justify-center overflow-hidden rounded-2xl border border-neutral/15 bg-bl-p p-8"
              aria-label="Open Zestaro location in Google Maps"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(210,105,30,0.25),transparent_65%)] transition-opacity group-hover:opacity-80" />
              <div className="relative flex flex-col items-center gap-3 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/40">
                  <MapPin className="h-6 w-6 text-primary" />
                </span>
                <p className="font-serif text-xl font-bold text-tertiary">
                  Zestaro, Banani
                </p>
                <p className="text-sm text-tertiary/70">{ADDRESS}</p>
                <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Open in Google Maps
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Guest book"
          title="What our guests say"
          align="center"
        />
        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col gap-5 rounded-2xl border border-neutral/10 bg-wh-s p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg dark:bg-neutral/10"
            >
              <Quote className="h-8 w-8 fill-primary/20 text-primary" />
              <blockquote className="flex-1 text-sm leading-relaxed text-secondary dark:text-tertiary/85">
                {testimonial.quote}
              </blockquote>
              <figcaption className="space-y-1">
                <Stars className="h-3.5 w-3.5" />
                <p className="pt-1 text-sm font-semibold text-secondary dark:text-tertiary">
                  {testimonial.name}
                </p>
                <p className="text-xs uppercase tracking-wider text-neutral">
                  {testimonial.detail}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-bl-p text-tertiary">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div className="space-y-4">
            <p className="font-serif text-3xl font-bold text-primary">
              Zestaro
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-tertiary/70">
              A warm little kitchen with big flavor. Cooked to order, served
              with care, since 2019.
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-tertiary/60">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-tertiary/80 transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-tertiary/60">
              Visit
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-tertiary/80">
              <li>{ADDRESS}</li>
              <li>{PHONE}</li>
              <li>{EMAIL}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-tertiary/60">
              Stay in the loop
            </h3>
            <p className="mt-5 text-sm text-tertiary/70">
              Seasonal specials and early access to events, once a month.
            </p>
            <form className="mt-4 flex overflow-hidden rounded-xl border border-tertiary/20 focus-within:border-primary">
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
                className="w-full min-w-0 bg-transparent px-4 py-3 text-sm text-tertiary placeholder:text-tertiary/40 focus:outline-none"
              />
              <button
                type="button"
                aria-label="Subscribe to newsletter"
                className="shrink-0 cursor-pointer bg-primary px-4 text-tertiary transition-colors hover:bg-primary/90 active:scale-95"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-tertiary/10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-xs text-tertiary/50">
              © {new Date().getFullYear()} Zestaro. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Zestaro on ${social.label}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-tertiary/20 text-tertiary/70 transition-colors hover:border-primary hover:text-primary"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;

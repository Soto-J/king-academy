import { Star, Trophy, Users, Target, Calendar, Medal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import HeroCarousel from "../components/hero-carousel";
import Link from "next/link";

export const HomePageView = async () => {
  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="bg-primary/5 absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl" />
      <div className="bg-brand-red/5 absolute top-1/2 -left-40 h-60 w-60 rounded-full blur-2xl" />
      <div className="bg-primary/5 absolute -right-20 bottom-0 h-40 w-40 rounded-full blur-2xl" />

      {/* Hero Section */}
      <div className="from-primary/15 via-secondary to-primary/15 border-border/10 relative mb-16 overflow-hidden rounded-3xl border bg-gradient-to-br p-8 shadow-xl backdrop-blur-sm">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent" />

        <div className="relative z-10 pb-8 text-center">
          <div className="bg-primary/10 text-primary border-primary/20 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium">
            <Trophy className="h-4 w-4" />
            Premier Baseball Academy
          </div>

          <h1 className="from-foreground/5 via-primary to-foreground bg-gradient-to-r bg-clip-text pb-4 text-4xl font-bold text-transparent sm:text-6xl lg:text-7xl">
            King Academy
          </h1>

          <h2 className="text-foreground/80 mx-auto max-w-2xl text-lg font-medium sm:text-xl lg:text-2xl">
            Where Young Athletes Grow and Shine
          </h2>

          <p className="text-muted-foreground mx-auto mt-6 max-w-xl">
            Building champions on and off the field through expert coaching,
            character development, and love for the game.
          </p>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="mb-20">
        <HeroCarousel />
      </div>

      {/* Stats Section */}
      <div className="mb-20 grid grid-cols-2 gap-6 md:grid-cols-4">
        {[
          { icon: Users, label: "Active Players", value: "150+" },
          { icon: Trophy, label: "Championships", value: "25" },
          { icon: Star, label: "Years Experience", value: "15" },
          { icon: Medal, label: "Success Rate", value: "95%" },
        ].map(({ icon: Icon, label, value }, idx) => (
          <Card
            key={idx}
            className="from-primary/10 to-primary/5 border-border/20 bg-gradient-to-br backdrop-blur-sm"
          >
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full">
                <Icon className="text-primary h-6 w-6" />
              </div>
              <div className="text-foreground text-2xl font-bold">{value}</div>
              <div className="text-foreground/60 text-sm">{label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <div className="mb-20">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold">
            Why Choose King Academy?
          </h2>
          <p className="text-foreground/70 mx-auto max-w-2xl">
            We provide comprehensive training programs designed to develop both
            athletic skills and character in a supportive environment.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Expert Coaching",
              description:
                "Learn from experienced coaches who have played and coached at the highest levels of baseball.",
            },
            {
              icon: Users,
              title: "Team Building",
              description:
                "Develop lasting friendships and learn the value of teamwork through our structured programs.",
            },
            {
              icon: Calendar,
              title: "Flexible Programs",
              description:
                "Choose from various training programs that fit your schedule and skill level.",
            },
          ].map(({ icon: Icon, title, description }, idx) => (
            <Card
              key={idx}
              className="from-muted/50 to-primary/10 border-border/20 bg-gradient-to-br backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-8">
                <div className="bg-primary/10 mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full">
                  <Icon className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-4 text-xl font-semibold">
                  {title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="from-primary/10 via-secondary/5 to-primary/10 border-border/20 relative mb-20 overflow-hidden rounded-3xl border bg-gradient-to-br p-8 shadow-xl backdrop-blur-sm md:p-12">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="text-foreground mb-6 text-3xl font-bold">
            Our Mission
          </h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed">
            At King Academy, we are passionate about creating a dynamic and
            enjoyable environment where young athletes can learn, play, and
            excel in the sport of baseball. Our dedicated team is committed to
            fostering teamwork, sportsmanship, and skill development in a
            supportive and family-friendly atmosphere.
          </p>

          <p className="text-foreground/70 mb-8 leading-relaxed">
            Whether your child is a seasoned player or just starting their
            baseball journey, we offer opportunities for everyone to
            participate, make new friends, and experience the joy of the game.
            Join us for an exciting season full of unforgettable moments and
            plenty of home runs!
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white shadow-lg"
            >
              <Link href="/sign-up">Enroll Now</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-border hover:bg-muted/50"
            >
              <Link href="/about-us">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

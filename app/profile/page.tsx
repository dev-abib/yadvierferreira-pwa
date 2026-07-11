"use client";

import ProfileStats from "@/app/components/profile/ProfileStats";
import ProfileHeader from "@/app/components/profile/ProfileHeader";
import ProfileAvatar from "@/app/components/profile/ProfileAvatar";
import ProfileBioSection from "@/app/components/profile/ProfileBioSection";
import ProfileCoffeeSection from "@/app/components/profile/ProfileCoffeeSection";
import ProfileCampusSection from "@/app/components/profile/ProfileCampusSection";
import ProfileIndustrySection from "@/app/components/profile/ProfileIndustrySection";
import ProfilePortfolioSection from "@/app/components/profile/ProfilePortfolioSection";

export default function Page() {
  return (
    <div className="app-glow min-h-dvh px-5 pt-6 pb-10">
      <ProfileHeader />
      <ProfileAvatar />
      <ProfileStats />
      <ProfileCoffeeSection />
      <ProfileBioSection />
      <ProfileIndustrySection />
      <ProfileCampusSection />
      <ProfilePortfolioSection />
    </div>
  );
}

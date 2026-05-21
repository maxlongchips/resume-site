"use client";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { personalData } from "@/data/personal";

export function SkillsSection() {
  const skillItems = personalData.skills.map((skill) => ({
    title: skill.name,
    description: `熟练度：${skill.level}%`,
    link: "#",
  }));

  return (
    <section id="skills" className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">技术栈</h2>
        <HoverEffect items={skillItems} className="mx-auto max-w-5xl" />
      </div>
    </section>
  );
}
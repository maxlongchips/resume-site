"use client";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { personalData } from "@/data/personal";
import Image from "next/image";

export function HeroSection() {
  return (
    <section id="hero" className="relative">
      <HeroHighlight containerClassName="min-h-screen">
        <div className="flex flex-col items-center justify-center gap-8 px-4 text-center">
          {/* 头像 */}
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white/20 shadow-xl">
            <Image
              src={personalData.avatar}
              alt={personalData.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* 名字 */}
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            <Highlight>{personalData.name}</Highlight>
          </h1>

          {/* 标题 */}
          <h2 className="text-xl font-medium text-neutral-300 md:text-2xl">
            {personalData.title}
          </h2>

          {/* 介绍文字 */}
          <div className="max-w-2xl">
            <TextGenerateEffect
              words={personalData.bio}
              className="text-lg text-neutral-400"
            />
          </div>

          {/* 社交链接按钮 */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {personalData.socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/10"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* 向下滚动提示 */}
          <div className="absolute bottom-10 animate-bounce">
            <svg
              className="h-6 w-6 text-white/50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </HeroHighlight>
    </section>
  );
}
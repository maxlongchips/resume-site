"use client";
import { useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import { personalData } from "@/data/personal";
import { articleCategories } from "@/data/categories";

export function ContentSection() {
  const [activeCategory, setActiveCategory] = useState("全部");

  const filteredArticles =
    activeCategory === "全部"
      ? personalData.articles
      : personalData.articles.filter(
          (article) => article.category === activeCategory
        );

  const timelineData = filteredArticles.map((article) => ({
    title: article.date,
    content: (
      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
        <h3 className="mb-2 text-xl font-bold text-white">{article.title}</h3>
        <p className="mb-4 text-neutral-400">{article.summary}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-white">
              {article.category}
            </span>
            <span className="text-sm text-neutral-500">{article.readTime}</span>
          </div>
          <a
            href={article.link}
            className="text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            阅读全文 →
          </a>
        </div>
      </div>
    ),
  }));

  return (
    <section id="content" className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">文章 / 视频动态</h2>

        {/* 分类筛选 */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {articleCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-white text-black"
                  : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 视频部分 */}
        <div className="mb-16">
          <h3 className="mb-8 text-2xl font-bold">最新视频</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {personalData.videos.map((video) => (
              <div
                key={video.id}
                className="group overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all hover:border-white/20"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500">
                    <svg
                      className="h-16 w-16 text-white/80 transition-transform group-hover:scale-110"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="mb-2 text-lg font-bold text-white">
                    {video.title}
                  </h4>
                  <p className="mb-4 text-sm text-neutral-400">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-white">
                        {video.platform}
                      </span>
                      <span className="text-sm text-neutral-500">
                        {video.views}次播放
                      </span>
                    </div>
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-400 hover:text-blue-300"
                    >
                      观看视频 →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 文章时间线 */}
        <div>
          <h3 className="mb-8 text-2xl font-bold">最新文章</h3>
          <Timeline data={timelineData} />
        </div>
      </div>
    </section>
  );
}
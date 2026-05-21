"use client";
import { useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { personalData } from "@/data/personal";
import { projectCategories } from "@/data/categories";
import Image from "next/image";

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("全部");

  const filteredProjects =
    activeCategory === "全部"
      ? personalData.projects
      : personalData.projects.filter(
          (project) => project.category === activeCategory
        );

  return (
    <section id="projects" className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">项目作品集</h2>

        {/* 分类筛选 */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {projectCategories.map((category) => (
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

        {/* 项目网格 */}
        <BentoGrid className="mx-auto max-w-6xl">
          {filteredProjects.map((project) => (
            <BentoGridItem
              key={project.id}
              title={project.title}
              description={project.description}
              header={
                <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              }
              icon={
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-2 py-1 text-xs text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              }
              className="md:col-span-1"
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
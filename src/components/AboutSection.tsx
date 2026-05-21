"use client";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { personalData } from "@/data/personal";
import {
  IconCode,
  IconArticle,
  IconVideo,
  IconMapPin,
  IconMail,
  IconBrandWechat,
} from "@tabler/icons-react";

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">关于我</h2>
        <BentoGrid className="mx-auto max-w-4xl">
          {/* 个人简介 */}
          <BentoGridItem
            title="个人简介"
            description={personalData.bio}
            header={
              <div className="flex h-32 items-center justify-center rounded-t-xl bg-gradient-to-br from-violet-500 to-purple-500">
                <IconCode className="h-10 w-10 text-white" />
              </div>
            }
            className="md:col-span-2"
          />

          {/* 技术方向 */}
          <BentoGridItem
            title="技术方向"
            description="专注于前端全栈开发，精通Vue3、React、Next.js、Node.js等技术栈，同时具备小程序和桌面应用开发能力。"
            header={
              <div className="flex h-32 items-center justify-center rounded-t-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <IconArticle className="h-10 w-10 text-white" />
              </div>
            }
          />

          {/* 内容创作 */}
          <BentoGridItem
            title="内容创作"
            description="活跃于B站和YouTube，分享编程知识和项目实战经验，累计粉丝超过10万。"
            header={
              <div className="flex h-32 items-center justify-center rounded-t-xl bg-gradient-to-br from-red-500 to-orange-500">
                <IconVideo className="h-10 w-10 text-white" />
              </div>
            }
          />

          {/* 联系方式 */}
          <BentoGridItem
            title="联系方式"
            description={`邮箱：${personalData.contactInfo.email} | 微信：${personalData.contactInfo.wechat}`}
            header={
              <div className="flex h-32 items-center justify-center rounded-t-xl bg-gradient-to-br from-green-500 to-emerald-500">
                <IconMail className="h-10 w-10 text-white" />
              </div>
            }
          />

          {/* 所在地 */}
          <BentoGridItem
            title="所在地"
            description={personalData.contactInfo.location}
            header={
              <div className="flex h-32 items-center justify-center rounded-t-xl bg-gradient-to-br from-pink-500 to-rose-500">
                <IconMapPin className="h-10 w-10 text-white" />
              </div>
            }
          />
        </BentoGrid>
      </div>
    </section>
  );
}
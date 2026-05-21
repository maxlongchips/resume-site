<template>
  <section id="about" class="relative overflow-hidden py-20">
    <div class="mx-auto max-w-7xl px-4">
      <h2 class="mb-12 text-center text-4xl font-bold">关于我</h2>
      <div class="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
        <!-- 个人简介 -->
        <div class="rounded-lg border border-white/10 bg-white/5 p-6 md:col-span-2">
          <div class="mb-4 flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
            <IconCode class="h-10 w-10 text-white" />
          </div>
          <h3 class="mb-2 text-xl font-bold">个人简介</h3>
          <p class="text-neutral-400">{{ personalData.bio }}</p>
        </div>

        <!-- 技术方向 -->
        <div class="rounded-lg border border-white/10 bg-white/5 p-6">
          <div class="mb-4 flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
            <IconArticle class="h-10 w-10 text-white" />
          </div>
          <h3 class="mb-2 text-lg font-bold">技术方向</h3>
          <p class="text-sm text-neutral-400">
            专注于前端全栈开发，精通Vue3、React、Next.js、Node.js等技术栈，同时具备小程序和桌面应用开发能力。
          </p>
        </div>

        <!-- 内容创作 -->
        <div class="rounded-lg border border-white/10 bg-white/5 p-6">
          <div class="mb-4 flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-500">
            <IconVideo class="h-10 w-10 text-white" />
          </div>
          <h3 class="mb-2 text-lg font-bold">内容创作</h3>
          <p class="text-sm text-neutral-400">
            活跃于B站和YouTube，分享编程知识和项目实战经验，累计粉丝超过10万。
          </p>
        </div>

        <!-- 联系方式 -->
        <div class="rounded-lg border border-white/10 bg-white/5 p-6">
          <div class="mb-4 flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
            <IconMail class="h-10 w-10 text-white" />
          </div>
          <h3 class="mb-2 text-lg font-bold">联系方式</h3>
          <p class="text-sm text-neutral-400">
            邮箱：{{ personalData.contactInfo.email }} | 微信：{{ personalData.contactInfo.wechat }}
          </p>
        </div>

        <!-- 所在地 -->
        <div class="rounded-lg border border-white/10 bg-white/5 p-6">
          <div class="mb-4 flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-rose-500">
            <IconMapPin class="h-10 w-10 text-white" />
          </div>
          <h3 class="mb-2 text-lg font-bold">所在地</h3>
          <p class="text-sm text-neutral-400">{{ personalData.contactInfo.location }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { personalData } from '@/data/personal'
import { IconCode, IconArticle, IconVideo, IconMail, IconMapPin } from '@tabler/icons-vue'
</script>

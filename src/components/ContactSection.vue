<template>
  <section id="contact" class="relative overflow-hidden py-20">
    <div class="mx-auto max-w-7xl px-4">
      <h2 class="mb-12 text-center text-4xl font-bold">联系方式</h2>

      <div class="mx-auto max-w-2xl">
        <div class="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <div class="mb-8 text-center">
            <h3 class="mb-2 text-2xl font-bold text-white">与我联系</h3>
            <p class="text-neutral-400">{{ personalData.contactInfo.availableFor }}</p>
          </div>

          <div class="space-y-6">
            <!-- 邮箱 -->
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <svg
                  class="h-6 w-6 text-white"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-neutral-400">邮箱</p>
                <a
                  :href="`mailto:${personalData.contactInfo.email}`"
                  class="text-lg font-medium text-white hover:text-blue-400 transition-colors"
                >
                  {{ personalData.contactInfo.email }}
                </a>
              </div>
            </div>

            <!-- 微信 -->
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <svg
                  class="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.952-7.062-6.122zM14.57 13.39c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-neutral-400">微信</p>
                <p class="text-lg font-medium text-white">{{ personalData.contactInfo.wechat }}</p>
              </div>
            </div>

            <!-- 所在地 -->
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <svg
                  class="h-6 w-6 text-white"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-neutral-400">所在地</p>
                <p class="text-lg font-medium text-white">{{ personalData.contactInfo.location }}</p>
              </div>
            </div>
          </div>

          <!-- 社交链接 -->
          <div class="mt-8 flex justify-center gap-4">
            <a
              v-for="link in personalData.socialLinks"
              :key="link.name"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              :title="link.name"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-white transition-all hover:border-white/20 hover:bg-white/10"
            >
              {{ link.name[0] }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { personalData } from '@/data/personal'
</script>

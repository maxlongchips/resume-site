"use client";
import { personalData } from "@/data/personal";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* 版权信息 */}
          <div className="text-center md:text-left">
            <p className="text-lg font-bold text-white">
              {personalData.name}
            </p>
            <p className="mt-2 text-sm text-neutral-400">
              © {new Date().getFullYear()} {personalData.name}. All rights
              reserved.
            </p>
          </div>

          {/* 社交链接 */}
          <div className="flex gap-4">
            {personalData.socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-white/20 hover:bg-white/10"
                title={link.name}
              >
                <span className="text-xs text-white">{link.name[0]}</span>
              </a>
            ))}
          </div>

          {/* 备案信息 */}
          <div className="text-center md:text-right">
            <p className="text-sm text-neutral-400">
              京ICP备XXXXXXXX号-1
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              使用 Next.js + Aceternity UI 构建
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
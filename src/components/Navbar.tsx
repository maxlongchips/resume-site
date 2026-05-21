"use client";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconHome, IconUser, IconCode, IconArticle, IconVideo, IconMail } from "@tabler/icons-react";

export function Navbar() {
  const navItems = [
    {
      name: "首页",
      link: "#hero",
      icon: <IconHome className="h-4 w-4" />,
    },
    {
      name: "关于我",
      link: "#about",
      icon: <IconUser className="h-4 w-4" />,
    },
    {
      name: "技术栈",
      link: "#skills",
      icon: <IconCode className="h-4 w-4" />,
    },
    {
      name: "项目作品",
      link: "#projects",
      icon: <IconArticle className="h-4 w-4" />,
    },
    {
      name: "文章视频",
      link: "#content",
      icon: <IconVideo className="h-4 w-4" />,
    },
    {
      name: "联系方式",
      link: "#contact",
      icon: <IconMail className="h-4 w-4" />,
    },
  ];

  return <FloatingNav navItems={navItems} />;
}
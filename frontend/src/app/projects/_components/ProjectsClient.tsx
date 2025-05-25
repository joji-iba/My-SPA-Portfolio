'use client';

import { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import ReduxBoardApp from '../../../../public/images/ReduxBoardApp.jpg';
import ChatGPTClone from '../../../../public/images/chatgptclone.jpg';
import Coming from '../../../../public/images/coming.jpg';
import BestProject from '../../../../public/images/myportfolio.jpg';
import BestProject02 from '../../../../public/images/myportfolioDark.jpg';
import Project1 from '../../../../public/images/project1.jpg';
import Project2 from '../../../../public/images/project2.jpg';
import { FeaturedProject } from './FeaturedProject';
import { Project } from './Project';
import { Project as ProjectType } from '@/types/project';

// 静的画像のマッピング
const staticImages: { [key: string]: StaticImageData } = {
  '/images/myportfolio.jpg': BestProject,
  '/images/myportfolioDark.jpg': BestProject02,
  '/images/ReduxBoardApp.jpg': ReduxBoardApp,
  '/images/chatgptclone.jpg': ChatGPTClone,
  '/images/project1.jpg': Project1,
  '/images/project2.jpg': Project2,
};

export function ProjectsClient() {
  const [mounted, setMounted] = useState(false);
  const [imgSrc, setImgSrc] = useState(BestProject);

  const {
    data: projects,
    error,
    isLoading,
  } = useSWR<ProjectType[]>('http://localhost:8080/api/projects');

  useEffect(() => {
    setMounted(true);
    const theme = localStorage.getItem('theme') || 'light';
    setImgSrc(theme === 'dark' ? BestProject : BestProject02);
  }, []);

  if (!mounted) return null;
  if (isLoading) return <div className="text-center">読み込み中...</div>;
  if (error)
    return <div className="text-center text-red-500">エラーが発生しました</div>;
  if (!projects) return null;

  const featuredProjects = projects.filter((project) => project.featured);
  const regularProjects = projects.filter((project) => !project.featured);

  return (
    <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
      {featuredProjects.map((project) => (
        <div key={project.id} className="col-span-12">
          <FeaturedProject
            title={project.title}
            img={staticImages[project.image] || Coming}
            summary={project.description}
            link={project.link}
            github={project.github}
            type={project.type}
          />
        </div>
      ))}

      {regularProjects.map((project) => (
        <div key={project.id} className="col-span-6 sm:col-span-12">
          <Project
            title={project.title}
            img={staticImages[project.image] || Coming}
            link={project.link}
            github={project.github}
            type={project.type}
          />
        </div>
      ))}

      <div className="col-span-6 sm:col-span-12">
        <Project
          title="Coming Soon!!"
          img={Coming}
          link="/"
          github="/"
          type="Coming Soon!!"
        />
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';

interface SkillProps {
  name: string;
  x: string;
  y: string;
}

// スキルのアニメーション実装
const Skill = ({ name, x, y }: SkillProps) => {
  return (
    <motion.div
      className="flex items-center justify-center rounded-full font-semibold bg-dark text-light py-3 px-6 shadow-sm cursor-pointer absolute dark:text-dark dark:bg-light max-lg:py-2 max-lg:px-4 max-md:text-sm max-md:py-1.5 max-md:px-3 max-xs:bg-transparent max-xs:dark:bg-transparent max-xs:text-dark max-xs:dark:text-light max-xs:font-bold"
      whileHover={{ scale: 1.05 }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: x, y: y, transition: { duration: 1.5 } }}
      viewport={{ once: true }}
    >
      {name}
    </motion.div>
  );
};

export function Skills() {
  return (
    <>
      <h2 className="font-bold text-8xl mt-64 w-full text-center max-md:text-6xl max-md:mt-32">
        Skills
      </h2>
      <div className="w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark max-lg:h-[80vh] max-sm:h-[60vh] max-xs:h-[50vh] max-lg:bg-circularLightLg max-lg:dark:bg-circularDarkLg max-md:bg-circularLightMd max-md:dark:bg-circularDarkMd max-sm:bg-circularLightSm max-sm:dark:bg-circularDarkSm">
        <motion.div
          className="flex items-center justify-center rounded-full font-semibold bg-dark text-light p-8 shadow-sm cursor-pointer dark:text-dark dark:bg-light max-lg:p-6 max-md:p-4 max-xs:text-xs max-xs:p-2"
          whileHover={{ scale: 1.05 }}
        >
          Web
        </motion.div>
        <Skill name="HTML" x="-22vw" y="2vw" />
        <Skill name="CSS" x="-5vw" y="-10vw" />
        <Skill name="Sass" x="15vw" y="-12vw" />
        <Skill name="jQuery" x="-25vw" y="14vw" />
        <Skill name="JavaScript" x="15vw" y="-4vw" />
        <Skill name="TypeScript" x="-30vw" y="-5vw" />
        <Skill name="PHP" x="0vw" y="12vw" />
        <Skill name="AWS" x="3vw" y="25vw" />
        <Skill name="ReactJS" x="0vw" y="-20vw" />
        <Skill name="NextJS" x="-20vw" y="-15vw" />
        <Skill name="Tailwind CSS" x="18vw" y="18vw" />
        <Skill name="WordPress" x="-10vw" y="18vw" />
        <Skill name="Illustrator/Photoshop" x="25vw" y="6vw" />
        <Skill name="SEO" x="32vw" y="-5vw" />
      </div>
    </>
  );
}

import { motion } from 'framer-motion';
import { useProjects } from '../hooks/usePortfolio';
import ProjectCard from './ProjectCard';
import ScrollFloat from './ScrollFloat';
import SectionMotion from './SectionMotion';

export default function ProjectsSection() {
  const projects = useProjects();

  // Sort: highlight projects first
  const sorted = [...projects].sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0));

  return (
    <SectionMotion id="projects" className="section-anchor py-24 px-6 relative overflow-hidden">

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <ScrollFloat
            variant="fade"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            containerClassName="text-sm tracking-[0.2em] mb-2"
            textClassName="text-slate-300"
          >
            PROJECTS
          </ScrollFloat>
          <ScrollFloat
            variant="float"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            containerClassName="text-4xl md:text-5xl font-bold"
            textClassName="text-white"
          >
            My Work
          </ScrollFloat>
        </motion.div>

        <div className="space-y-8">
          {sorted.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </SectionMotion>
  );
}

import React from 'react';
import { Sparkles, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../../types';
import { Tag } from '../common/Badge';
import { Button } from '../common/Button';

interface ProjectCardProps {
  project: ProjectItem;
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelectProject }) => {
  return (
    <div className="group bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 hover:border-brand-500/50 dark:hover:border-brand-700/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Cover Image */}
      <div
        className="relative aspect-[16/10] overflow-hidden bg-charcoal-950 cursor-pointer"
        onClick={() => onSelectProject(project)}
      >
        <img
          src={project.beforeAfter?.beforeImage || project.primaryImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Category Tag */}
        <div className="absolute top-3 left-3">
          <Tag variant="crimson">{project.category}</Tag>
        </div>

        {/* Before/After badge if present */}
        {project.beforeAfter && (
          <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-mono font-bold bg-black/80 border border-brand-600 text-brand-400 px-2.5 py-1 rounded-md backdrop-blur-sm shadow-md">
            <Sparkles className="w-3 h-3 text-brand-400" />
            <span>Before & After</span>
          </div>
        )}

        {/* Base container badge at bottom */}
        <div className="absolute bottom-3 left-3 text-[11px] font-mono text-white bg-black/70 px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5 backdrop-blur-sm">
          <Layers className="w-3 h-3 text-brand-400" />
          <span>Base: {project.baseContainerType}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <h3
            className="text-base sm:text-lg font-bold text-charcoal-950 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors cursor-pointer leading-snug"
            onClick={() => onSelectProject(project)}
          >
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Key Modifications preview */}
          {project.modificationsMade && project.modificationsMade.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-500 font-bold">
                Modifications Executed:
              </span>
              <ul className="text-xs text-charcoal-700 dark:text-charcoal-300 space-y-1">
                {project.modificationsMade.slice(0, 2).map((mod, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 truncate">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
                    <span className="truncate">{mod}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* View Project Details Button */}
        <div className="pt-3 border-t border-charcoal-100 dark:border-charcoal-800">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => onSelectProject(project)}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            View Project Case Study
          </Button>
        </div>
      </div>
    </div>
  );
};

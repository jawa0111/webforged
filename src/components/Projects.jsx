import { useState } from 'react';
import { projectFilters, projects } from '../data.js';
import { useReveal, useTilt } from '../hooks.js';
import { Icon } from './Icons.jsx';

/**
 * Styled placeholder shown when a project has no screenshot:
 * a mock browser window tinted with the project's accent colors.
 */
function ProjectPlaceholder({ project }) {
  const [c1, c2] = project.accent;
  return (
    <div
      className="project-card__placeholder"
      style={{ '--pa-1': c1, '--pa-2': c2 }}
      aria-hidden="true"
    >
      <div className="project-card__chrome">
        <span />
        <span />
        <span />
      </div>
      <div className="project-card__mock">
        <span className="project-card__mock-title">{project.name}</span>
        <span className="project-card__mock-line" style={{ width: '72%' }} />
        <span className="project-card__mock-line" style={{ width: '48%' }} />
        <span className="project-card__mock-btn" />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const tiltRef = useTilt(5);
  return (
    <li className="reveal" style={{ '--stagger': index }}>
      <a
        className="glass-card project-card"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        ref={tiltRef}
        aria-label={`${project.name} — ${project.description} (opens live site in a new tab)`}
      >
        <div className="project-card__media">
          {project.image ? (
            <img
              src={project.image}
              alt={`Screenshot of the ${project.name} website`}
              loading="lazy"
              width="640"
              height="400"
            />
          ) : (
            <ProjectPlaceholder project={project} />
          )}
          <div className="project-card__overlay">
            <span className="project-card__visit">
              Visit Site <Icon name="arrowUpRight" size={18} />
            </span>
          </div>
        </div>
        <div className="project-card__body">
          <div className="project-card__row">
            <h3>{project.name}</h3>
            <span className="project-card__tag">{project.tag}</span>
          </div>
          <p>{project.description}</p>
        </div>
      </a>
    </li>
  );
}

function ProjectsGrid({ filter }) {
  // Re-mounts when `filter` changes (via key) so the staggered
  // reveal replays, giving the filter a smooth entrance animation.
  const gridRef = useReveal({ threshold: 0.05 });
  const visible = projects.filter((p) => filter === 'all' || p.category === filter);

  return (
    <ul className="projects-grid reveal-group" role="list" ref={gridRef}>
      {visible.map((project, i) => (
        <ProjectCard key={project.name} project={project} index={i} />
      ))}
    </ul>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const headRef = useReveal();

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section__head reveal" ref={headRef}>
          <span className="section__eyebrow">Our work</span>
          <h2 className="section__title">
            Projects we're <span className="text-gradient">proud of</span>
          </h2>
          <p className="section__lead">
            A selection of recent launches. Every card opens the live site — go ahead, click around.
          </p>

          <div className="filter-bar" role="group" aria-label="Filter projects by category">
            {projectFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`filter-btn${filter === f.id ? ' is-active' : ''}`}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <ProjectsGrid key={filter} filter={filter} />
      </div>
    </section>
  );
}

import {
  BookOpen,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  Cloud,
  Code2,
  Container,
  ExternalLink,
  GitBranch,
  Infinity as InfinityIcon,
  ListTodo,
  Target,
} from "lucide-react";
import {
  learningSkills,
  currentFocus,
  nextUp,
  lastUpdated,
  statusLabels,
  type LearningSkill,
  type LearningStatus,
  type SkillIcon,
} from "@/content/learning";

const SKILL_ICONS: Record<SkillIcon, typeof Code2> = {
  git: GitBranch,
  docker: Container,
  devops: InfinityIcon,
  mlops: BrainCircuit,
  cloud: Cloud,
  code: Code2,
};

const STATUS_ORDER: LearningStatus[] = ["completed", "in-progress", "learning"];

const STATUS: Record<
  LearningStatus,
  { icon: typeof Code2; badge: string; dot: string; iconWrap: string; description: string }
> = {
  completed: {
    icon: CheckCircle2,
    badge: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300",
    dot: "border-emerald-600 bg-emerald-600 dark:border-emerald-400 dark:bg-emerald-400",
    iconWrap: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
    description: "Skills I use in my projects.",
  },
  "in-progress": {
    icon: CircleDashed,
    badge: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-300",
    dot: "border-amber-500 bg-white dark:border-amber-400 dark:bg-zinc-950",
    iconWrap: "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
    description: "Started and practising.",
  },
  learning: {
    icon: BookOpen,
    badge: "border-brand-200 bg-brand-50 text-brand-800 dark:border-brand-900 dark:bg-brand-950/50 dark:text-brand-300",
    dot: "border-brand-500 bg-white dark:border-brand-400 dark:bg-zinc-950",
    iconWrap: "bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300",
    description: "Studying now.",
  },
};

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

function StatusBadge({ status }: { status: LearningStatus }) {
  const Icon = STATUS[status].icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS[status].badge}`}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {statusLabels[status]}
    </span>
  );
}

function SkillCard({ skill }: { skill: LearningSkill }) {
  const Icon = SKILL_ICONS[skill.icon ?? "code"];
  const hasProgress = typeof skill.progress === "number";
  const progress = hasProgress ? Math.min(100, Math.max(0, skill.progress as number)) : 0;
  return (
    <li className="card card-hover flex flex-col gap-4 p-5">
      <div className="flex items-start gap-3">
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${STATUS[skill.status].iconWrap}`} aria-hidden="true">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-zinc-900 dark:text-white">{skill.name}</h4>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <StatusBadge status={skill.status} />
            {skill.note && <span className="text-xs text-zinc-600 dark:text-zinc-400">{skill.note}</span>}
          </div>
        </div>
      </div>
      {hasProgress && (
        <div>
          <div className="mb-1 flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div
            role="progressbar"
            aria-label={`${skill.name} progress`}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800"
          >
            <div className="h-full rounded-full bg-brand-600 dark:bg-brand-400" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
      {skill.evidence && skill.evidence.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 border-t border-zinc-200 pt-3 text-sm dark:border-zinc-800" aria-label={`${skill.name} work`}>
          {skill.evidence.map((e) => (
            <li key={e.href}>
              <a href={e.href} target="_blank" rel="noopener noreferrer" className="btn-link">
                {e.label}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function LearningPath() {
  return (
    <div className="card p-5 sm:p-6">
      <h3 id="learning-path-heading" className="text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
        Learning path
      </h3>
      <ol aria-labelledby="learning-path-heading" className="relative mt-5 grid gap-5 sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))] sm:gap-3">
        {learningSkills.map((skill, i) => (
          <li key={skill.name} className="relative flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
            {i < learningSkills.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-[7px] top-5 h-[calc(100%+0.25rem)] w-px bg-zinc-200 dark:bg-zinc-800 sm:left-5 sm:top-[7px] sm:h-px sm:w-[calc(100%-0.5rem)]"
              />
            )}
            <span aria-hidden="true" className={`relative z-10 h-4 w-4 shrink-0 rounded-full border-2 ${STATUS[skill.status].dot}`} />
            <span className="text-sm">
              <span className="font-medium text-zinc-900 dark:text-white">{skill.name}</span>
              <span className="block text-xs text-zinc-600 dark:text-zinc-400">{statusLabels[skill.status]}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function SkillsLearningTracker() {
  const groups = STATUS_ORDER.map((status) => ({
    status,
    skills: learningSkills.filter((s) => s.status === status),
  })).filter((g) => g.skills.length > 0);
  const focus = currentFocus.trim();

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {focus && (
          <div className="card flex items-center gap-4 border-brand-200 p-5 dark:border-brand-900 sm:p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white dark:bg-brand-500" aria-hidden="true">
              <Target className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-300">Current focus</p>
              <p className="mt-1 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">{focus}</p>
            </div>
          </div>
        )}
        <div className="card p-5 sm:p-6">
          <dl className="grid grid-cols-3 gap-3 text-center">
            {STATUS_ORDER.map((status) => (
              <div key={status} className="rounded-xl bg-zinc-50 px-2 py-3 dark:bg-zinc-950/60">
                <dt className="text-xs text-zinc-600 dark:text-zinc-400">{statusLabels[status]}</dt>
                <dd className="mt-0.5 text-2xl font-semibold tabular-nums text-zinc-900 dark:text-white">
                  {learningSkills.filter((s) => s.status === status).length}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Last updated <time dateTime={lastUpdated} className="font-medium text-zinc-900 dark:text-zinc-200">{formatDate(lastUpdated)}</time>
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {groups.map(({ status, skills }) => {
          const headingId = `learning-group-${status}`;
          const Icon = STATUS[status].icon;
          return (
            <section key={status} aria-labelledby={headingId} className="reveal flex flex-col">
              <div className="mb-3 flex items-baseline justify-between gap-2 border-b border-zinc-200 pb-2 dark:border-zinc-800">
                <h3 id={headingId} className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-white">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {statusLabels[status]}
                  <span className="text-sm font-normal text-zinc-600 dark:text-zinc-400">({skills.length})</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">{STATUS[status].description}</p>
              </div>
              <ul className="grid content-start gap-4">
                {skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <LearningPath />

      {nextUp.length > 0 && (
        <div className="card p-5 sm:p-6">
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
            <ListTodo className="h-4 w-4" aria-hidden="true" />
            Next up
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {nextUp.map((item) => (
              <li key={item} className="chip">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

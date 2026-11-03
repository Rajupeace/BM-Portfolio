
import {
  BookOpen,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  Cloud,
  Code2,
  Container,
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

const STATUS: Record<
  LearningStatus,
  { icon: typeof CheckCircle2; description: string; badge: string; dot: string; ring: string; tile: string; bar: string }
> = {
  completed: {
    icon: CheckCircle2,
    description: "Finished learning",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300",
    dot: "bg-emerald-500",
    ring: "border-emerald-500 bg-emerald-500 text-white",
    tile: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    bar: "from-emerald-500/70 to-emerald-500/0",
  },
  "in-progress": {
    icon: CircleDashed,
    description: "Started, still working through it",
    badge: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300",
    dot: "bg-amber-500",
    ring: "border-amber-500 bg-white text-amber-600 dark:bg-zinc-950 dark:text-amber-400",
    tile: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
    bar: "from-amber-500/70 to-amber-500/0",
  },
  learning: {
    icon: BookOpen,
    description: "Currently studying",
    badge: "border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300",
    dot: "bg-violet-500",
    ring: "border-violet-400 bg-white text-violet-600 dark:border-violet-400/70 dark:bg-zinc-950 dark:text-violet-300",
    tile: "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
    bar: "from-violet-500/70 to-violet-500/0",
  },
};

const ORDER: LearningStatus[] = ["completed", "in-progress", "learning"];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function formatDate(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return { label: iso, dateTime: undefined };
  const [year, monthNum, day] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const month = MONTHS[monthNum - 1];
  const daysInMonth = new Date(Date.UTC(year, monthNum, 0)).getUTCDate();
  if (!month || day < 1 || day > daysInMonth) return { label: iso, dateTime: undefined };
  return { label: `${day} ${month} ${year}`, dateTime: iso.trim() };
}

function StatusBadge({ status }: { status: LearningStatus }) {
  const s = STATUS[status];
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${s.badge}`}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {statusLabels[status]}
    </span>
  );
}

function SkillCard({ skill, index }: { skill: LearningSkill; index: number }) {
  const s = STATUS[skill.status];
  const Icon = SKILL_ICONS[skill.icon ?? "code"];
  const hasProgress = typeof skill.progress === "number";
  const pct = hasProgress ? Math.min(100, Math.max(0, skill.progress as number)) : 0;
  return (
    <li
      className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-tranzinc-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/70"
    >
      <span className={`pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${s.bar}`} aria-hidden="true" />
      <div className="flex items-start gap-3">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${s.tile}`} aria-hidden="true">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-display text-base font-semibold text-zinc-900 dark:text-white">{skill.name}</h4>
            <StatusBadge status={skill.status} />
          </div>
          {skill.note && <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{skill.note}</p>}
          {hasProgress && (
            <div className="mt-3">
              <div
                className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
                role="progressbar"
                aria-label={`${skill.name} progress`}
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className={`h-full rounded-full ${s.dot}`} style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{pct}%</p>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

function LearningPath() {
  if (learningSkills.length < 2) return null;
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white/80 p-5 backdrop-blur sm:p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
      <h3 id="learning-path-heading" className="text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
        Learning path
      </h3>
      <ol aria-labelledby="learning-path-heading" className="relative mt-5 grid gap-5 sm:grid-flow-col sm:auto-cols-fr sm:gap-3">
        <span
          className="absolute left-[19px] top-5 bottom-5 w-px bg-gradient-to-b from-emerald-400 via-amber-400 to-violet-400 opacity-60 sm:left-5 sm:right-5 sm:top-5 sm:bottom-auto sm:h-px sm:w-auto sm:bg-gradient-to-r"
          aria-hidden="true"
        />
        {learningSkills.map((skill) => {
          const s = STATUS[skill.status];
          const Icon = s.icon;
          return (
            <li key={skill.name} className="relative flex items-center gap-3 sm:flex-col sm:items-center sm:gap-2 sm:text-center">
              <span className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 ${s.ring}`} aria-hidden="true">
                <Icon className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-zinc-900 dark:text-white">{skill.name}</span>
                <span className="block text-xs text-zinc-600 dark:text-zinc-400">{statusLabels[skill.status]}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function SkillsLearningTracker() {
  const hasFocus = currentFocus.trim().length > 0;
  const hasNext = nextUp.length > 0;
  const updated = formatDate(lastUpdated);
  const counts = ORDER.map((status) => ({ status, count: learningSkills.filter((s) => s.status === status).length }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-2" aria-label="Summary">
          {counts.map(({ status, count }) => (
            <li
              key={status}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300"
            >
              <span className={`h-2 w-2 rounded-full ${STATUS[status].dot}`} aria-hidden="true" />
              <span className="font-semibold text-zinc-900 dark:text-white">{count}</span> {statusLabels[status]}
            </li>
          ))}
        </ul>
        {lastUpdated.trim() && (
          <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Last updated <time dateTime={updated.dateTime} className="font-semibold text-zinc-900 dark:text-white">{updated.label}</time>
          </p>
        )}
      </div>

      {hasFocus && (
        <div
          className="relative overflow-hidden rounded-2xl border border-brand-200 bg-brand-50/60 p-6 sm:p-8 dark:border-brand-500/30 dark:bg-brand-500/10"
        >
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-600 text-white shadow-sm" aria-hidden="true">
              <Target className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-300">Current focus</h3>
              <p className="mt-1 font-display text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-white">{currentFocus}</p>
            </div>
          </div>
        </div>
      )}

      <LearningPath />

      <div className="grid gap-6 md:grid-cols-3">
        {ORDER.map((status) => {
          const items = learningSkills.filter((s) => s.status === status);
          const s = STATUS[status];
          const headingId = `tracker-${status}`;
          return (
            <section
              key={status}
              aria-labelledby={headingId}
              className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-4 sm:p-5 dark:border-zinc-800 dark:bg-zinc-950/40"
            >
              <header className="mb-4 px-1">
                <h3 id={headingId} className="flex items-center gap-2 font-display text-lg font-semibold text-zinc-900 dark:text-white">
                  <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} aria-hidden="true" />
                  {statusLabels[status]}
                  <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {items.length}
                    <span className="sr-only"> {items.length === 1 ? "skill" : "skills"}</span>
                  </span>
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{s.description}</p>
              </header>
              {items.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-zinc-300 p-4 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                  Nothing here yet.
                </p>
              ) : (
                <ul className="space-y-3">
                  {items.map((skill, i) => (
                    <SkillCard key={skill.name} skill={skill} index={i} />
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      {hasNext && (
        <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
          <ListTodo className="mt-0.5 h-5 w-5 shrink-0 text-zinc-600 dark:text-zinc-300" aria-hidden="true" />
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-300">Next up</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {nextUp.map((item) => (
                <li key={item} className="rounded-lg bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

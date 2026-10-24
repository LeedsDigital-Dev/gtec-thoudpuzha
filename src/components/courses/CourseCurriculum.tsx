import { Layers, ChevronDown, CheckCircle, ListOrdered } from "lucide-react";
import type { CurriculumModule } from "@/lib/course-detail-helpers";
import type { CourseListBlock } from "@/lib/course-content.types";

interface CourseCurriculumProps {
  modules: CurriculumModule[];
  courseLists?: CourseListBlock[];
  locale: string;
}

export function CourseCurriculum({
  modules,
  courseLists = [],
  locale,
}: CourseCurriculumProps) {
  const isMl = locale === "ml";
  const title = isMl ? "കോഴ്‌സ് പാഠ്യപദ്ധതി & സിലബസ്" : "Course Curriculum & Syllabus";
  const subtitle = isMl
    ? "തിയറിയും ലാബ് പ്രോജക്ടുകളും ഉൾപ്പെടുന്ന ഘടനാപരമായ പരിശീലന ഘട്ടങ്ങൾ"
    : "Structured practical modules with step-by-step lab exercises and project milestones";

  return (
    <section className="space-y-6 rounded-3xl border border-border/80 bg-card p-6 sm:p-8 lg:p-10 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/60 pb-5">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
          <Layers className="size-5" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {/* If CMS Course List Tables are configured, render them with full responsiveness */}
      {courseLists.length > 0 && (
        <div className="space-y-6">
          {courseLists.map((list, idx) => (
            <div key={idx} className="space-y-3">
              {list.heading && (
                <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                  <ListOrdered className="size-4.5 text-primary shrink-0" />
                  <span>{list.heading}</span>
                </h3>
              )}
              <div className="w-full max-w-full rounded-2xl border border-border overflow-x-auto shadow-2xs">
                <table className="w-full min-w-[340px] border-collapse text-sm">
                  <thead className="bg-muted/70 text-foreground font-semibold">
                    <tr>
                      <th className="border-b border-border px-4 py-3 text-left font-bold w-1/4 whitespace-nowrap">
                        {isMl ? "കോഡ്" : "Module Code"}
                      </th>
                      <th className="border-b border-border px-4 py-3 text-left font-bold">
                        {isMl ? "വിഷയം / മോഡ്യൂൾ" : "Module / Topic"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.items.map((item, itemIdx) => (
                      <tr
                        key={itemIdx}
                        className="even:bg-muted/20 hover:bg-muted/40 transition-colors"
                      >
                        <td className="border-b border-border/60 px-4 py-2.5 font-mono text-xs sm:text-sm font-semibold text-primary whitespace-nowrap">
                          {item.code || `MOD-${itemIdx + 1}`}
                        </td>
                        <td className="border-b border-border/60 px-4 py-2.5 text-sm font-medium text-foreground/90 break-words">
                          {item.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modular Curriculum Cards (01, 02, 03...) */}
      {modules.length > 0 && (
        <div className="space-y-4 pt-2">
          {modules.map((mod) => (
            <div
              key={mod.index}
              className="group rounded-2xl border border-border/80 bg-muted/20 p-5 sm:p-6 transition-all duration-300 hover:bg-muted/40 hover:border-primary/40 hover:shadow-2xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-sm sm:text-base shadow-xs">
                    {mod.index}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {mod.title}
                    </h3>
                    {mod.code && (
                      <span className="text-xs font-mono font-semibold text-muted-foreground">
                        {mod.code}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {mod.description && (
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {mod.description}
                </p>
              )}

              {mod.topics && mod.topics.length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {mod.topics.map((topic, tIdx) => (
                    <div
                      key={tIdx}
                      className="flex items-center gap-2 text-xs sm:text-sm text-foreground/80 font-medium"
                    >
                      <CheckCircle className="size-3.5 text-primary shrink-0" />
                      <span className="truncate">{topic}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

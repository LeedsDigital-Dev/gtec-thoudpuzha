import { Phone, ShieldCheck, Clock, CheckCircle2, Award, Headphones } from "lucide-react";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import type { PublicCourse } from "@/lib/courses";

interface CourseQuickEnquiryProps {
  courseId: string;
  courseTitle: string;
  courses: PublicCourse[];
  locale: string;
  whatsappNumber?: string | null;
}

export function CourseQuickEnquiry({
  courseId,
  courseTitle,
  courses,
  locale,
  whatsappNumber = "919544229992",
}: CourseQuickEnquiryProps) {
  const isMl = locale === "ml";

  return (
    <div id="admission-enquiry" className="space-y-5 scroll-mt-24">
      {/* Quick Admission Form Card */}
      <div className="relative rounded-3xl border border-primary/25 bg-card/95 backdrop-blur-xl shadow-xl overflow-hidden">
        {/* Top Decorative Banner */}
        <div className="bg-gradient-to-r from-primary via-primary/90 to-amber-500 py-3 px-6 text-primary-foreground">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider">
              {isMl ? "അഡ്മിഷൻ അന്വേഷണം" : "Direct Admission Enquiry"}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
              {isMl ? "ഓപ്പൺ" : "Live"}
            </span>
          </div>
        </div>

        <div className="p-1 sm:p-2">
          <EnquiryForm
            source={`course-detail-${courseId}`}
            courses={courses}
            defaultCourseId={courseId}
            customTitle={isMl ? "അഡ്മിഷൻ കൗൺസിലിംഗ്" : "Get Free Career Counseling"}
            customSubtitle={
              isMl
                ? "നിങ്ങളുടെ വിവരങ്ങൾ നൽകുക, ഞങ്ങളുടെ അക്കാദമിക് കൗൺസിലർ ഉടൻ ബന്ധപ്പെടും."
                : "Fill out the form below to receive syllabus details, fee structure & batch timings."
            }
          />
        </div>
      </div>

      {/* Quick Assistance Help Card */}
      <div className="rounded-2xl border border-border/80 bg-muted/40 p-5 space-y-3.5 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
            <Headphones className="size-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground">
              {isMl ? "നേരിട്ട് സംസാരിക്കണോ?" : "Need Immediate Assistance?"}
            </h4>
            <p className="text-[11px] text-muted-foreground">
              {isMl ? "കൗൺസിലറുമായി നേരിട്ട് സംസാരിക്കാം" : "Speak directly with our academic advisor"}
            </p>
          </div>
        </div>

        <a
          href={`tel:+${whatsappNumber || "919544229992"}`}
          className="flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-card py-2.5 px-4 text-xs sm:text-sm font-bold text-primary shadow-2xs transition-all hover:bg-primary hover:text-primary-foreground"
        >
          <Phone className="size-3.5" />
          <span>+91 95442 29992</span>
        </a>

        {/* Guarantee points */}
        <div className="space-y-1.5 pt-1 text-xs text-muted-foreground border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{isMl ? "100% സൗജന്യ കൗൺസിലിംഗ്" : "100% Free Career Guidance"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-primary shrink-0" />
            <span>{isMl ? "2 മണിക്കൂറിനുള്ളിൽ മറുപടി" : "Instant Callback within 2 Hours"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="size-3.5 text-amber-500 shrink-0" />
            <span>{isMl ? "സ്കോളർഷിപ്പ് വിവരങ്ങൾ" : "Batch & Scholarship Details"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

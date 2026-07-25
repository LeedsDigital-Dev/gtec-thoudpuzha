"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { enrollStudentInCourses, unenrollStudentFromCourse } from "./actions";

interface Candidate {
  id: string;
  fullName: string | null;
  studentRecordId: string | null;
}

interface Course {
  id: string;
  titleEn: string;
}

interface CurrentEnrollment {
  id: string;
  courseId: string;
  enrolledAt: Date;
  course: { id: string; titleEn: string };
}

interface Props {
  candidates: Candidate[];
  courses: Course[];
  currentEnrollments: CurrentEnrollment[];
  enrolledCourseIds: string[];
  studentProfileId: string | null;
  locale: string;
}

export default function EnrollmentForm({
  candidates,
  courses,
  currentEnrollments,
  enrolledCourseIds,
  studentProfileId,
  locale,
}: Props) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourseIds, setSelectedCourseIds] = useState<Set<string>>(
    new Set(),
  );

  const filteredCandidates = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return candidates.filter((c) => {
      const name = (c.fullName || "").toLowerCase();
      const recordId = (c.studentRecordId || "").toLowerCase();
      return name.includes(q) || recordId.startsWith(q);
    });
  }, [candidates, searchQuery]);

  const enrolledSet = new Set(enrolledCourseIds);

  function toggleCourse(courseId: string) {
    setSelectedCourseIds((prev) => {
      const next = new Set(prev);
      if (next.has(courseId)) {
        next.delete(courseId);
      } else {
        next.add(courseId);
      }
      return next;
    });
  }

  function selectAll() {
    setSelectedCourseIds(new Set(courses.map((c) => c.id)));
  }

  function deselectAll() {
    setSelectedCourseIds(new Set());
  }

  const selectedStudent = candidates.find(
    (c) => c.id === studentProfileId,
  );

  return (
    <div className="space-y-8">
      {/* Student Search / Select */}
      <section className="rounded border border-border p-4">
        <h2 className="text-lg font-medium">Select Student</h2>

        {selectedStudent ? (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm font-medium">
              {selectedStudent.fullName || "Unknown"}
            </span>
            {selectedStudent.studentRecordId && (
              <span className="text-xs text-muted-foreground">
                ({selectedStudent.studentRecordId})
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                router.push(
                  `/${locale}/admin/students/course-enrollment`,
                )
              }
            >
              Change
            </Button>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Search by name or student ID…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
            />
            {filteredCandidates.length > 0 && (
              <ul className="max-h-60 overflow-y-auto rounded border border-border">
                {filteredCandidates.map((candidate) => (
                  <li key={candidate.id}>
                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/${locale}/admin/students/course-enrollment?studentProfileId=${encodeURIComponent(candidate.id)}`,
                        )
                      }
                      className="w-full px-3 py-2 text-left text-sm hover:bg-muted"
                    >
                      {candidate.fullName || "Unknown"}
                      {candidate.studentRecordId && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          {candidate.studentRecordId}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {searchQuery.length > 0 && filteredCandidates.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No students found.
              </p>
            )}
          </div>
        )}
      </section>

      {/* Course Enrollment Form */}
      {studentProfileId && (
        <section className="rounded border border-border p-4">
          <h2 className="text-lg font-medium">Enroll in Courses</h2>

          <form action={enrollStudentInCourses} className="mt-4 space-y-4">
            <input
              type="hidden"
              name="studentProfileId"
              value={studentProfileId}
            />
            <input type="hidden" name="locale" value={locale} />

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={selectAll}
              >
                Select All
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={deselectAll}
              >
                Deselect All
              </Button>
            </div>

            <div className="max-h-80 space-y-1 overflow-y-auto rounded border border-border p-3">
              {courses.map((course) => {
                const isAlreadyEnrolled = enrolledSet.has(course.id);
                return (
                  <label
                    key={course.id}
                    className={`flex items-center gap-2 rounded px-2 py-1 text-sm ${
                      isAlreadyEnrolled
                        ? "text-muted-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="courseIds"
                      value={course.id}
                      checked={
                        isAlreadyEnrolled ||
                        selectedCourseIds.has(course.id)
                      }
                      disabled={isAlreadyEnrolled}
                      onChange={() => toggleCourse(course.id)}
                      className="h-4 w-4"
                    />
                    {course.titleEn}
                    {isAlreadyEnrolled && (
                      <span className="text-xs text-amber-600">
                        (already enrolled)
                      </span>
                    )}
                  </label>
                );
              })}
            </div>

            <Button type="submit">
              Enroll Selected Courses
            </Button>
          </form>
        </section>
      )}

      {/* Current Enrollments */}
      {studentProfileId && (
        <section className="rounded border border-border p-4">
          <h2 className="text-lg font-medium">
            Current Enrollments ({currentEnrollments.length})
          </h2>

          {currentEnrollments.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              This student is not enrolled in any courses yet.
            </p>
          ) : (
            <table className="mt-4 w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Course
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Enrolled
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentEnrollments.map((enrollment) => (
                  <tr key={enrollment.id}>
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      {enrollment.course.titleEn}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      {new Date(enrollment.enrolledAt).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <form action={unenrollStudentFromCourse}>
                        <input
                          type="hidden"
                          name="enrollmentId"
                          value={enrollment.id}
                        />
                        <input
                          type="hidden"
                          name="studentProfileId"
                          value={studentProfileId}
                        />
                        <input
                          type="hidden"
                          name="courseTitle"
                          value={enrollment.course.titleEn}
                        />
                        <input type="hidden" name="locale" value={locale} />
                        <Button
                          type="submit"
                          variant="destructive"
                          size="sm"
                        >
                          Unenroll
                        </Button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}
    </div>
  );
}

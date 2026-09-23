import CourseMount from '@/course/Mount';

/**
 * The course. It is a client application with hash routes (#/en/m03/...), so a
 * lesson link saved from the old site keeps working unchanged.
 */
export default function CoursePage() {
  return <CourseMount />;
}

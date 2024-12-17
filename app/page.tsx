import CourseItem from "@/components/CourseItem";
import { Suspense } from "react";

const Home = async () => {
  const fetchCourses = async () => {
    const courses = await fetch("http://localhost:3000/api/", {
      cache: "no-store",
    });
    return await courses.json();
  };

  const courses = await fetchCourses();
  console.log(courses);

  return (
    <Suspense>
      <div className="px-5">
        {courses.filter((item) => item.selected === false).length !== 0 && (
          <div className="space-y-4">
            <h2 className="font-semibold">Available Courses</h2>
            <div className="flex flex-col gap-4 border-2 rounded-xl px-12 py-6 max-sm:px-5 max-sm:py-5">
              {courses.map(
                (item) =>
                  !item.selected && (
                    <CourseItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      type="available"
                    />
                  )
              )}
            </div>
          </div>
        )}

        {courses.filter((item) => item.selected === true).length > 0 && (
          <div className="space-y-4 mt-4">
            <h2 className="font-semibold">Selected Courses</h2>
            <div className="flex flex-col gap-4 border-2 rounded-xl px-12 py-6 max-sm:px-5 max-sm:py-5">
              {courses.map(
                (item) =>
                  item.selected && (
                    <CourseItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      type="selected"
                    />
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
};
export default Home;

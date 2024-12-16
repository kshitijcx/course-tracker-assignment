import CourseItem from "@/components/CourseItem";
const courses = [
  {
    id: 1,
    name: "Database Management System",
    selected: false,
  },
  {
    id: 2,
    name: "Computer Networks",
    selected: true,
  },
  {
    id: 3,
    name: "Data Stuctures and Algorithms",
    selected: false,
  },
  {
    id: 4,
    name: "Operating Systems",
    selected: false,
  },
];

const Home = () => {
  return (
    <div className="px-5">
      <div className="space-y-4">
        <h2 className="font-semibold">Available Courses</h2>
        <div className="flex flex-col gap-4 border-2 rounded-xl px-3 py-4">
          {courses.map(
            (item) =>
              !item.selected && (
                <CourseItem key={item.id} name={item.name} type="available" />
              )
          )}
        </div>
      </div>
      <div className="space-y-4 mt-4">
        <h2 className="font-semibold">Selected Courses</h2>
        <div className="flex flex-col gap-4 border-2 rounded-xl px-3 py-4">
          {courses.map(
            (item) =>
              item.selected && (
                <CourseItem key={item.id} name={item.name} type="selected" />
              )
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;

import { Button } from "./ui/button";

function CourseItem({ name, type }: { name: string; type: string }) {
  if (type === "available") {
    return (
      <div className="flex justify-between text-sm">
        <h2>{name}</h2>
        <Button>Add</Button>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between text-sm">
        <h2 className="text-sm">{name}</h2>
        <div className="flex gap-3 items-center">
          <p>10%</p>
          <Button>View</Button>
        </div>
      </div>
    );
  }
}
export default CourseItem;

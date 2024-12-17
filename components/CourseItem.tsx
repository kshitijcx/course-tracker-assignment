"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const CourseItem = ({
  id,
  name,
  type,
}: {
  id: number;
  name: string;
  type: string;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAdd = async (id: number) => {
    setLoading(true);
    const data = { id };
    const response = await axios.post("http://localhost:3000/api/", { id });
    setLoading(false);
    router.refresh();
  };

  if (type === "available") {
    return (
      <div className="flex justify-between text-sm items-center">
        <h2>{name}</h2>
        <Button onClick={() => handleAdd(id)}>{loading ? (<Loader2 className="animate-spin"/>):"Add"}</Button>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between text-sm items-center">
        <h2 className="text-sm">{name}</h2>
        <div className="flex gap-3 items-center">
          <p>10%</p>
          <Button>View</Button>
        </div>
      </div>
    );
  }
};
export default CourseItem;

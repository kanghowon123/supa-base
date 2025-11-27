"use client";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

import { FaTrashAlt } from "react-icons/fa";

export default function DeleteBtn({ id }: any) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const router = useRouter();

  const deleteBtn = async () => {
    await supabase.from("posts").delete().eq("id", id);
    alert("삭제");

    router.push("/post/list");
  };

  return (
    <>
      <FaTrashAlt
        onClick={() => deleteBtn()}
        size={25}
        className="text-red-500 cursor-pointer"
      />
    </>
  );
}

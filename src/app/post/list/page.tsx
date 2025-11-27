import DeleteBtn from "@/components/DeleteBtn";
import EditBtn from "@/components/EditBtn";
import { createClient } from "@/app/utils/supabase/server";
import Link from "next/link";

export default async function ListPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    console.log(error);
    console.log("list에러");
    return;
  }

  if (data.length === 0) {
    return (
      <div>
        <p>입력 된 글이 없습니다</p>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {data.map((post) => (
          <li key={post.id} className="p-2 border">
            <div className="flex flex-col">
              <p>{post.created_at}</p>
              <p>{post.title}</p>
            </div>
            <p>{post.content}</p>
            <div className="flex gap-3 justify-end">
              <Link href={`/post/list/${post.id}`}>
                <EditBtn />
              </Link>
              <DeleteBtn id={post.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

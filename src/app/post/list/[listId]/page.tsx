import { createClient } from "@/app/utils/supabase/server";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";

export default async function ListIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    console.log("list/id에러");
    return;
  }

  const handleEdit = () => {
    alert("수정 테스트");
  };

  return (
    <div className="max-w-[1000px] w-full bg-gray-100 py-20 px-10 rounded-2xl shadow-2xl">
      <div className="text-center text-2xl py-4">
        <p>글 수정 해주세요</p>
      </div>
      <div>{post.title}</div>
      <div>{post.content}</div>

      {/* <div className="flex flex-col gap-5">
        <Input placeholder="제목을 입력해 주세요" value={post.title} />
        <Textarea placeholder="내용을 입력해 주세요" value={post.content} />
        <div className="ml-auto">
          <Button onClick={handleEdit} className="py-3 px-6 text-lg">
            수정
          </Button>
        </div>
      </div> */}
    </div>
  );
}

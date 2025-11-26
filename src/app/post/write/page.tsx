"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// import { Post } from "@/app/types/post";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // const [posts, setPosts] = useState<Post[]>([]);
  const writeBtn = async () => {
    if (!title.trim() || !content.trim()) return;

    const { error } = await supabase.from("post").insert({
      title,
      content,
    });

    if (error) {
      console.log(error);
      alert("글 저장 중 에러 발생!");
      return;
    }
    // // const postId = posts[posts.length - 1]?.id || 0;

    // setPosts((post) => [
    //   ...post,
    //   {
    //     id: postId + 1,
    //     title,
    //     content,
    //   },
    // ]);

    setTitle("");
    setContent("");

    alert("글이 작성되었습니다");
    router.push("/");
  };

  return (
    <div className="max-w-[1000px] w-full bg-gray-100 py-20 px-10 rounded-2xl shadow-2xl">
      <div className="text-center text-2xl py-4">
        <p>글 작성 해주세요</p>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <Input
            placeholder="제목을 입력해 주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Input>
        </div>
        <div>
          <Textarea
            placeholder="내용을 입력해 주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></Textarea>
        </div>
        <div className="ml-auto">
          <Button onClick={writeBtn} className="py-3 px-6 text-lg">
            추가
          </Button>
        </div>
      </div>
      {/* <div>{JSON.stringify(posts)}</div> */}
    </div>
  );
}

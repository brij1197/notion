import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import React from "react";
import { $notes } from "@/lib/db/schema";
import { and, eq, param } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { clerk } from "@/lib/clerk-server";

type Props = {
  params: {
    noteId: string;
  };
};

const NotebookPage = async (props: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/dashboard");
  }

  const params = await props.params;
  const noteId = params.noteId;
  const user = clerk.users.getUser(userId);

  const notes = await db
    .select()
    .from($notes)
    .where(and(eq($notes.id, parseInt(noteId)), eq($notes.userId, userId)));

  if (notes.length != 1) {
    return redirect("/dashboard");
  }
  const note = notes[0];
  return (
    <div className="min-h-screen grainy p-8">
      <div className="max-4xl max-auto">
        <div className="border shadow-xl border-stone-200 rounded-lg p-4 flex items-center">
          <Link href="/dashboard">
            <Button className="bg-green-600" size={"sm"}>
              Back
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold">
            {(await user).firstName} {(await user).lastName}
          </span>
          <span className="inline-block mx-1">/</span>
          <span className="text-stone-500 font-semibold">{note.name}</span>
          <div className="ml-auto">DELETE BUTTON</div>
        </div>

        <div className="h-4"></div>
        <div className="border-stone-200 shadow-xl border rounded-lg px-18 py-8 w-full">
          {/*Editor*/}
        </div>
      </div>
    </div>
  );
};

export default NotebookPage;

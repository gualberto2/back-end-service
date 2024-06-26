"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { AuthorColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface AuthorClientProps {
  data: AuthorColumn[];
}

export const AuthorsClient: React.FC<AuthorClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Authors (${data.length})`}
          description="Manage authors for your blog"
        />
        <Button onClick={() => router.push(`/${params.besId}/blog/author/add`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading
        title="API"
        description="
      API calls for Authors"
      />
      <ApiList entityName="blog/author" entityIdName="authorId" />
    </>
  );
};

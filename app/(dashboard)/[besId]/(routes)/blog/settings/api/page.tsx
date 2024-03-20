"use client";

import { ApiAlert } from "@/components/ui/api-alert";
import { ApiList } from "@/components/ui/api-list";
import { Heading } from "@/components/ui/heading";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();

  return (
    <section>
      <div className="flex flex-col my-6 gap-3">
        <Heading
          title="API"
          description="
              API calls for the entire blog"
        />
        <div className="flex flex-col my-6 gap-3">
          <ApiList entityName="apipis" entityIdName="api" />
        </div>
      </div>
    </section>
  );
};
export default Page;

// import { format } from "date-fns";
// import { AuthorColumn } from "./components/columns";
// import { AuthorsClient } from "./components/client";
// import { createClient } from "@/lib/supabase/client";
// import { useState } from "react";

// const AddAuthorPage = async ({ params }: { params: { besId: string } }) => {
//   const [authors, setAuthors] = useState("");

//   const supabase = createClient();
//   //   const getAuthors = async() =>{
//   //     let { data: besData, error } = await supabase
//   //     .from("authors")
//   //     .select("*")
//   //     .eq("id", params.besId)
//   //     .single();

//   //   if (error) {
//   //     console.error("Error fetching data:", error);
//   //   } else {
//   //     setAuthors(authors);
//   //   }
//   // } catch (error) {
//   //   console.error("Error fetching data:", error);
//   // }

//   return (
//     <div className="flex-col">
//       <div className="flex-1 space-y-4 p-8 pt-6">
//         {/* <AuthorsClient data={authors} /> */}
//       </div>
//     </div>
//   );
// };

// export default AddAuthorPage;

const Page = () => {
  return <div>hello</div>;
};
export default Page;

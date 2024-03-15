// "use client";

import { Tabs } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

// import { Skeleton } from "@/components/ui/skeleton";
// import { Tabs } from "@/components/ui/tabs";
// import { createClient } from "@/lib/supabase/client";
// import { useEffect, useState } from "react";

interface Tab {
  title: string;
  value: string;
  content: string;
}

// const SetupPage = () => {
//   const [tabs, setTabs] = useState<Tab[]>([]);
//   const [active, setActive] = useState<Tab | undefined>(undefined);
//   const [loading, setLoading] = useState(true);
//   const supabase = createClient();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true); // Start loading
//       let { data: besData, error } = await supabase
//         .from("bes")
//         .select("name, id");

//       if (!error && besData && besData.length > 0) {
//         const formattedTabs = besData.map((bes) => ({
//           title: bes.name,
//           value: bes.id.toString(),
//           content: "",
//         }));
//         setTabs(formattedTabs);
//         setActive(formattedTabs[0]);
//       } else {
//         console.error(error);
//       }
//       setLoading(false); // Stop loading
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto my-8">
//       {!loading ? (
//         tabs.length > 0 ? (
//           <Tabs tabs={tabs} />
//         ) : (
//           <div className="text-center my-4">
//             <p className="text-lg font-semibold">Please Create BES</p>
//           </div>
//         )
//       ) : (
//         <div>
//           <div className="flex flex-col space-y-3">
//             <Skeleton className="h-[125px] w-[250px] rounded-xl" />
//             <div className="space-y-2">
//               <Skeleton className="h-4 w-[250px]" />
//               <Skeleton className="h-4 w-[200px]" />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SetupPage;

const SetupPage = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      let { data: besData, error } = await supabase
        .from("bes")
        .select("name, id");

      if (!error && besData) {
        // Assuming you want to create tabs based on the fetched data
        const formattedTabs = besData.map((bes) => ({
          title: bes.name,
          value: bes.id.toString(), // Ensure the value is a string
          content: `Content for ${bes.name}`, // This is just an example
        }));
        setTabs(formattedTabs);
      } else {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {tabs.length > 0 ? (
        <Tabs
          tabs={tabs}
          // Optionally, you can pass other props like className here
        />
      ) : (
        <div>Loading...</div> // Or any other placeholder you prefer
      )}
    </div>
  );
};

export default SetupPage;

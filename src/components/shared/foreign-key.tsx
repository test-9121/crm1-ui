// // // components/PaginatedSelect.tsx
// // import { useEffect, useState, useRef } from "react";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import { FormControl } from "@/components/ui/form";
// // import axios from "axios";
// // import { api } from "@/lib/api";

// // interface PaginatedSelectProps {
// //   value: string;
// //   onChange: (value: string) => void;
// //   placeholder?: string;
// //   endpoint: string; // API URL
// //   getLabel: (item: any) => string;
// //   getValue: (item: any) => string;
// //   pageSize?: number;
// // }

// // const PaginatedSelect = ({
// //   value,
// //   onChange,
// //   placeholder = "Select an option",
// //   endpoint,
// //   getLabel,
// //   getValue,
// //   pageSize = 0,
// // }: PaginatedSelectProps) => {
// //   const [items, setItems] = useState<any[]>([]);
// //   const [page, setPage] = useState(0);
// //   const [hasMore, setHasMore] = useState(true);
// //   const contentRef = useRef<HTMLDivElement | null>(null);
// //   const loadingRef = useRef(false);

// //   const fetchItems = async (pageIndex: number) => {
// //     if (!hasMore || loadingRef.current) return;
// //     loadingRef.current = true;

// //     try {
// //     //   const response = await axios.get(endpoint, {
// //     //     params: {
// //     //       page: pageSize,
// //     //       size: 500,
// //     //     },
// //     //   });

// //     console.log("pageDetails", pageSize, page)

// //     const response = await api.get(`${endpoint}?page=${page}&size=500`);
// //     const data = response.data.leads.content;

// //       console.log("hshshhs", data)
// //       const newItems = data || [];
// //       setItems((prev) => [...prev, ...newItems]);
// //       setHasMore(newItems.length === pageSize);
// //       setPage((prev) => prev + 1);
// //     } catch (error) {
// //       console.error("Failed to fetch items:", error);
// //     } finally {
// //       loadingRef.current = false;
// //     }
// //   };

// //   useEffect(() => {
// //     setItems([]);
// //     setPage(0);
// //     setHasMore(true);
// //     fetchItems(0);
// //   }, [endpoint]);

// //   const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
// //     const target = e.currentTarget;
// //     if (target.scrollTop + target.clientHeight >= target.scrollHeight - 50) {
// //       fetchItems(page);
// //     }
// //   };

// //   return (
// //     <Select value={value} onValueChange={onChange}>
// //       <FormControl>
// //         <SelectTrigger>
// //           <SelectValue placeholder={placeholder} />
// //         </SelectTrigger>
// //       </FormControl>
// //       <SelectContent onScroll={handleScroll} ref={contentRef}>
// //         {items.map((item) => (
// //           <SelectItem key={getValue(item)} value={getValue(item)}>
// //             {getLabel(item)}
// //           </SelectItem>
// //         ))}
// //       </SelectContent>
// //     </Select>
// //   );
// // };

// // export default PaginatedSelect;


// import { useEffect, useState, useRef } from "react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { FormControl } from "@/components/ui/form";
// import { api } from "@/lib/api";

// interface PaginatedSelectProps {
//   value: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
//   endpoint: string; // API URL
//   getLabel: (item: any) => string;
//   getValue: (item: any) => string;
//   pageSize?: number;
// }

// const PaginatedSelect = ({
//   value,
//   onChange,
//   placeholder = "Select an option",
//   endpoint,
//   getLabel,
//   getValue,
//   pageSize = 500,
// }: PaginatedSelectProps) => {
//   const [items, setItems] = useState<any[]>([]);
//   const [hasMore, setHasMore] = useState(true);
//   const contentRef = useRef<HTMLDivElement | null>(null);
//   const loadingRef = useRef(false);
//   const pageRef = useRef(0); // ✅ Track current page

//   const fetchItems = async () => {
//     console.log("hasmore",hasMore, "ref", loadingRef.current)
//     if (!hasMore || loadingRef.current) return;
//     loadingRef.current = true;

//     try {
//       const currentPage = pageRef.current;
//       const response = await api.get(`${endpoint}?page=${currentPage}&size=${pageSize}`);
//       const data = response.data.leads?.content ?? [];

//       setItems((prev) => [...prev, ...data]);
//       setHasMore(data.length === pageSize);

//       pageRef.current += 1; // ✅ Increment current page ref
//     } catch (error) {
//       console.error("Failed to fetch items:", error);
//     } finally {
//       loadingRef.current = false;
//     }
//   };

//   useEffect(() => {
//     setItems([]);
//     setHasMore(true);
//     pageRef.current = 0;
//     fetchItems();
//   }, [endpoint]);

//   const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
//     const target = e.currentTarget;
//     console.log("meta",target.scrollTop, target.clientHeight, target.scrollHeight)
//     console.log("check",target.scrollTop + target.clientHeight >= target.scrollHeight - 50)

//     if (target.scrollTop + target.clientHeight >= target.scrollHeight - 50) {
//       fetchItems();
//     }
//   };

//   return (
//     <Select value={value} onValueChange={onChange}>
//       <FormControl>
//         <SelectTrigger>
//           <SelectValue placeholder={placeholder} />
//         </SelectTrigger>
//       </FormControl>
//       <SelectContent>
//         {items.map((item) => (
//           <SelectItem onScroll={handleScroll} ref={contentRef} key={getValue(item)} value={getValue(item)}>
//             {getLabel(item)}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   );
// };

// export default PaginatedSelect;






// import { useEffect, useState, useRef, forwardRef } from "react";
// import {
//   Autocomplete,
//   TextField,
//   CircularProgress,
//   Popper,
//   autocompleteClasses,
// } from "@mui/material";
// import { api } from "@/lib/api";

// interface PaginatedAutocompleteProps {
//   value: string | null;
//   onChange: (value: string | null) => void;
//   placeholder?: string;
//   endpoint: string;
//   getLabel: (item: any) => string;
//   getValue: (item: any) => string;
//   pageSize?: number;
// }

// const PaginatedAutocomplete = ({
//   value,
//   onChange,
//   placeholder = "Select an option",
//   endpoint,
//   getLabel,
//   getValue,
//   pageSize = 50,
// }: PaginatedAutocompleteProps) => {
//   const [options, setOptions] = useState<any[]>([]);
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const listboxRef = useRef<HTMLUListElement | null>(null);

//   const fetchOptions = async (pageIndex: number) => {
//     if (loading || !hasMore) return;
//     setLoading(true);
//     try {
//       const response = await api.get(`${endpoint}?page=${pageIndex}&size=${pageSize}`);
//       const data = response.data.leads?.content || [];

//       setOptions((prev) => {
//         const merged = [...prev, ...data];
//         return Array.from(new Map(merged.map((item) => [getValue(item), item])).values());
//       });

//       setHasMore(data.length === pageSize);
//       setPage((prev) => prev + 1);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setOptions([]);
//     setPage(0);
//     setHasMore(true);
//     fetchOptions(0);
//   }, [endpoint]);

//   const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
//     const target = event.currentTarget;
//     if (target.scrollTop + target.clientHeight >= target.scrollHeight - 50) {
//       fetchOptions(page);
//     }
//   };

//   // Custom Listbox with scroll handling
//   const ListboxComponent = forwardRef<HTMLUListElement, any>((props, ref) => (
//     <ul
//       {...props}
//       ref={(node) => {
//         listboxRef.current = node;
//         if (typeof ref === "function") ref(node);
//         else if (ref) ref.current = node;
//       }}
//       onScroll={handleScroll}
//       style={{
//         maxHeight: 300,
//         overflowY: "auto",
//         padding: 0,
//         margin: 0,
//       }}
//     />
//   ));
//   ListboxComponent.displayName = "PaginatedListbox";

//   return (
//     <Autocomplete
//       value={options.find((opt) => getValue(opt) === value) || null}
//       onChange={(_, newValue) => onChange(newValue ? getValue(newValue) : null)}
//       options={options}
//       getOptionLabel={getLabel}
//       loading={loading}
//       filterOptions={(x) => x}
//       ListboxComponent={ListboxComponent}
//       renderOption={(props, option) => (
//         <li {...props} key={getValue(option)}>
//           {getLabel(option)}
//         </li>
//       )}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label={placeholder}
//           variant="outlined"
//           InputProps={{
//             ...params.InputProps,
//             endAdornment: (
//               <>
//                 {loading && <CircularProgress color="inherit" size={20} />}
//                 {params.InputProps.endAdornment}
//               </>
//             ),
//           }}
//         />
//       )}
//     />
//   );
// };

// export default PaginatedAutocomplete;


// import { useEffect, useState, useRef } from "react";
// import { Autocomplete, TextField, CircularProgress } from "@mui/material";
// import { api } from "@/lib/api";

// interface PaginatedAutocompleteProps {
//   value: string | null;
//   onChange: (value: string | null) => void;
//   placeholder?: string;
//   endpoint: string; // API endpoint
//   getLabel: (item: any) => string;
//   getValue: (item: any) => string;
//   pageSize?: number;
// }

// const PaginatedAutocomplete = ({
//   value,
//   onChange,
//   placeholder = "Select an option",
//   endpoint,
//   getLabel,
//   getValue,
//   pageSize = 50,
// }: PaginatedAutocompleteProps) => {
//   const [options, setOptions] = useState<any[]>([]);
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const listRef = useRef<HTMLUListElement>(null);

//   const fetchOptions = async (pageIndex: number) => {
//     if (loading || !hasMore) return;

//     setLoading(true);
//     try {
//       const response = await api.get(`${endpoint}?page=${pageIndex}&size=${pageSize}`);
//       const data = response.data.leads?.content || [];

//       setOptions((prev) => {
//         const merged = [...prev, ...data];
//         // Remove duplicates by ID
//         const unique = Array.from(new Map(merged.map(item => [getValue(item), item])).values());
//         return unique;
//       });

//       setHasMore(data.length === pageSize);
//       setPage((prev) => prev + 1);
//     } catch (error) {
//       console.error("Failed to fetch items:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setOptions([]);
//     setPage(0);
//     setHasMore(true);
//     fetchOptions(0);
//   }, [endpoint]);

//   const handleScroll = (event: React.SyntheticEvent) => {
//     const listboxNode = listRef.current;
//     if (!listboxNode || !hasMore || loading) return;

//     const { scrollTop, scrollHeight, clientHeight } = listboxNode;
//     if (scrollTop + clientHeight >= scrollHeight - 50) {
//       fetchOptions(page);
//     }
//   };

//   return (
//     <Autocomplete
//       value={options.find((opt) => getValue(opt) === value) || null}
//       onChange={(_, newValue) => onChange(newValue ? getValue(newValue) : null)}
//       options={options}
//       getOptionLabel={getLabel}
//       loading={loading}
//       filterOptions={(x) => x} // prevent local filtering
//       ListboxProps={{
//         ref: listRef,
//         onScroll: handleScroll,
//       }}
//       renderOption={(props, option) => (
//         <li {...props} key={getValue(option)}>
//           {getLabel(option)}
//         </li>
//       )}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label={placeholder}
//           variant="outlined"
//           InputProps={{
//             ...params.InputProps,
//             endAdornment: (
//               <>
//                 {loading ? <CircularProgress color="inherit" size={20} /> : null}
//                 {params.InputProps.endAdornment}
//               </>
//             ),
//           }}
//         />
//       )}
//     />
//   );
// };

// export default PaginatedAutocomplete;




import { useEffect, useState, useRef } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { api } from "@/lib/api";

interface PaginatedAutocompleteProps {
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  endpoint: string; // API endpoint
  getLabel: (item: any) => string;
  getValue: (item: any) => string;
  pageSize?: number;
  dataField?: string; // dynamic field name for data
  contentField?: string; // dynamic field name for content
}

const PaginatedAutocomplete = ({
  value,
  onChange,
  placeholder = "Select an option",
  endpoint,
  getLabel,
  getValue,
  pageSize = 50,
  dataField = "data", // default value for data field
  contentField = "content", // default value for content field
}: PaginatedAutocompleteProps) => {
  const [options, setOptions] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const fetchOptions = async (pageIndex: number) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await api.get(`${endpoint}?page=${pageIndex}&size=${pageSize}`);
      const data = response.data?.[dataField]?.[contentField || "content"] || response.data?.[dataField] || [];

      console.log(response.data)

      console.log("hhhs",)

      setOptions((prev) => {
        const merged = [...prev, ...data];
        // Remove duplicates by ID
        const unique = Array.from(new Map(merged.map(item => [getValue(item), item])).values());
        return unique;
      });

      setHasMore(data.length === pageSize);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOptions([]);
    setPage(0);
    setHasMore(true);
    fetchOptions(0);
  }, [endpoint, dataField, contentField]);

  const handleScroll = (event: React.SyntheticEvent) => {
    const listboxNode = listRef.current;
    if (!listboxNode || !hasMore || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = listboxNode;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      fetchOptions(page);
    }
  };

  return (
    <Autocomplete
      size="small"
      value={options.find((opt) => getValue(opt) === value) || null}
      onChange={(_, newValue) => onChange(newValue ? getValue(newValue) : null)}
      options={options}
      getOptionLabel={getLabel}
      loading={loading}
      filterOptions={(x) => x} // prevent local filtering
      ListboxProps={{
        ref: listRef,
        onScroll: handleScroll,
      }}
      renderOption={(props, option) => (
        <li {...props} key={getValue(option)}>
          {getLabel(option)}
        </li>
      )}
      renderInput={(params) => (
        <TextField
        
          {...params}
          label={placeholder}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default PaginatedAutocomplete;
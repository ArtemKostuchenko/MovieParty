import { useEffect, useRef, useState } from "react";

const useSearch = ({ limit: lm = 1000, queryFn }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(lm);
  const [page, setPage] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});

  const observer = useRef();
  const containerRef = useRef(null);
  const lastItemRef = useRef();
  const listRef = useRef(null);

  const { data, isLoading, isFetching } = queryFn({
    name: searchTerm,
    limit: limit * page,
  });

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(handleObserver, {
      root: containerRef.current,
      rootMargin: "20px",
      threshold: 0.1,
    });

    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }

    return () => {
      if (lastItemRef.current) {
        observer.current.unobserve(lastItemRef.current);
      }
    };
  }, [lastItemRef]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value.trim());
    setPage(1);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleDocumentClick = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const handleCheckboxChange = (item) => {
    const newSelectedItems = {
      ...selectedItems,
      [item._id]: !selectedItems[item._id],
    };
    setSelectedItems(newSelectedItems);
  };

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight && !isFetching) {
        if (limit * page < data.totalCount) {
          setPage((prev) => prev + 1);
        }
      }
    }
  };

  const handleUnCheckItem = (item) => {
    const newSelectedItems = { ...selectedItems };
    delete newSelectedItems[item._id];
    setSelectedItems(newSelectedItems);
  };

  return {
    selectedItems,
    searchTerm,
    page,
    isFocused,
    containerRef,
    lastItemRef,
    data,
    isFetching,
    isLoading,
    handleInputChange,
    handleFocus,
    handleCheckboxChange,
    handleScroll,
    listRef,
    handleUnCheckItem,
  };
};

export default useSearch;

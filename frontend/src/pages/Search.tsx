import { useMutation, useQuery, useQueryClient } from "react-query";
import CreatePost from "../components/CreatePost";
import * as apiClient from "../api-client";
import SearchBar from "../components/SearchBar";
import Post from "../components/Post";
import { useSearchContext } from "../context/SearchContext";
import { useState } from "react";

const Search = () => {
  const queryClient = useQueryClient();

  const search = useSearchContext();
  const [page] = useState<number>(1);
  const searchParams = {
    name: search.name,
    page: page.toString(),
  };
  const { data: posts } = useQuery(["searchParams", searchParams], () =>
    apiClient.searchPostByName(searchParams)
  );

  const { mutate, isLoading } = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
    },
    onError: () => {},
  });
  const handleLogout = () => {
    mutate();
  };

  return (
    <div>
      <div className="pb-12">
        <button
          disabled={isLoading}
          onClick={handleLogout}
          className="fixed top-4 right-4 bg-black shadow text-white px-4 py-2 disabled:bg-gray-500"
        >
          {isLoading ? "Logging Out..." : "LogOut "}
        </button>
      </div>
      <div className="container mx-auto flex  flex-col gap-5 ">
        <SearchBar />
        <CreatePost />
        <div className=" mt-5 flex mx-auto    flex-col gap-5  max-w-md">
          {posts?.map((post) => (
            <Post key={post._id} name={post.name} img={post.img} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;

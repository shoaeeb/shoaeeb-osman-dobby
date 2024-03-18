import { useMutation, useQuery, useQueryClient } from "react-query";
import CreatePost from "../components/CreatePost";
import * as apiClient from "../api-client";
import SearchBar from "../components/SearchBar";
import Post from "../components/Post";
import { useState } from "react";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);

  const queryParams = {
    page: page.toString(),
  };
  const { data: posts } = useQuery(["fetchAllPosts", queryParams], () =>
    apiClient.fetchAllPosts(queryParams.page.toString())
  );
  const { mutate } = useMutation(apiClient.logout, {
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
          onClick={handleLogout}
          className="fixed top-4 right-4 bg-black shadow text-white px-4 py-2"
        >
          LogOut
        </button>
      </div>
      <div className="container mx-auto flex  flex-col gap-5 ">
        <SearchBar />
        <CreatePost />
        <div className=" mt-5 flex mx-auto    flex-col gap-5  max-w-md">
          {posts?.data?.map((post) => (
            <Post key={post._id} name={post.name} img={post.img} />
          ))}
        </div>
        <Pagination pages={posts?.pagination.pages || 0} setPage={setPage} />
      </div>
    </div>
  );
};

export default HomePage;

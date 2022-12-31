import { useContext, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";
import { Context } from "../../context/Context";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const { user } = useContext(Context);
  useEffect(() => {

    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      const allPosts = res.data;
      const validPost = [];
      if( user ){
        allPosts.forEach(addRelevant);
        function addRelevant(item) {
          if( item.userCategory !== user.userCategory ){
            validPost.push(item);
          }
        }
        setPosts(validPost)
      } else{
        setPosts(allPosts);
      }
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}

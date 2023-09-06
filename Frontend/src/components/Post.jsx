import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Post() {
  const { id } = useParams();
  const [loading, setLoaing] = useState(true);

  const getPost = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/post/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return <div className="px-8 py-8"></div>;
}

export default Post;

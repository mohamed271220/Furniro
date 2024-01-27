import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { getPostById } from "../../constants/Http";

const Post = () => {
  const { id } = useParams();
  const { data, refetch, isPending, isError, error } = useQuery({
    queryKey: ['post', id],
    queryFn: ({ signal }) => getPostById({ signal, id: id })
  })
  return (
    <div>Post</div>
  )
}

export default Post
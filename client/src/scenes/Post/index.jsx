import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { getPostById, getPosts } from "../../constants/Http";
import LoadingSpinner from "../../constants/Loading/LoadingSpinner/LoadingSpinner";
import ErrorBlock from "../../components/ErrorBlock";
import Posts from "../../components/Posts";
import { BsPersonFill } from "react-icons/bs";
import { AiFillCalendar, AiFillTag } from "react-icons/ai";

const Post = () => {

  const { id } = useParams();
  const { data, refetch, isPending, isError, error } = useQuery({
    queryKey: ['post', id],
    queryFn: ({ signal }) => getPostById({ signal, id: id })
  })
  const { data: newestData, isError: newestError, isPending: newestIsPending, error: newestErrorInfo, refetch: newestRefetch } = useQuery({
    queryKey: ['newestPosts'], queryFn: ({ signal }) => getPosts({ signal, limit: 3 })
  });
  const date = new Date(data?.post.createdAt);
  const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;


  // console.log(data);
  return (
    <div className="px-[3vh] md:px-[10vh] flex flex-col gap-[2vh] justify-center">
      {isPending && !isError && <LoadingSpinner />}
      {isError && !isPending && <ErrorBlock title="An error occurred while fetching the post" error={error?.message || "failed"} />}

      {
        data && !isError && !isPending && <>

          <div className=" flex flex-col justify-between gap-[0.7vh] pb-[2vh] border-b-2">
            <div className="flex flex-row flex-wrap text-[1.7vh] text-gray-400  gap-[3vh]" >
              <p className="flex flex-row"> <BsPersonFill /> <span className="m-0 ml-1">{data?.post.author}</span></p>
              <p className="flex flex-row"> <AiFillCalendar /> <span className="m-0 ml-1">{formattedDate}</span></p>
              <p className="flex flex-row"> <AiFillTag /><span className="m-0 ml-1">{data?.post.tag}</span></p>
            </div>
            <h1 className=" font-bold text-[3.5vh]  md:text-[4.4vh]" >{data.post.title}</h1>
          </div>
          <div className="flex flex-col gap-[1vh]">
            {data?.post.body.map((item, index) => {
              switch (item.type) {
                case 'title':
                  return <h1 className="font-semibold text-[3vh] md:text-[4vh]" key={index}>{item.content}</h1>;
                case 'paragraph':
                  return <p className="text-[2vh]" key={index}>{item.content}</p>;
                case 'image':
                  return <img className="w-[70%] max-h-[70vh] object-cover mt-1" key={index} src={item.content} alt="" />;
                default:
                  return null;
              }
            })}
          </div>
        </>
      }

      <div className="w-full h-fit rounded-lg">
        <h2 className="text-[2.5vh] font-semibold pb-[2vh] border-black">Newest Posts</h2>
        {newestIsPending && !isError && <LoadingSpinner />}
        {newestError && !newestIsPending && <ErrorBlock title="An error occurred while fetching the posts" error={newestErrorInfo?.message || "failed"} />}
        {newestData && !newestError && <div className="bg-primary m-auto p-5 rounded-lg"> <Posts isPost={true} isWidget={true} posts={newestData?.posts} /> </div>}
      </div>
    </div>
  )
}

export default Post
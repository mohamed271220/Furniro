import React from 'react'
import PostCard from '../PostCard'

const Posts = ({ posts }) => {
    return (
        <section className=" md:pb-[56px] pb-[37px]   flex flex-col gap-3 justify-center items-center w-full">
            <div className="flex flex-col justify-center items-start gap-[5vh]  w-full ">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}

            </div>
        </section>
    )
}

export default Posts
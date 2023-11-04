import React from 'react'
import PostCard from '../PostCard'

const Posts = ({ posts }) => {
    return (
        <section className=" md:py-[56px] py-[37px] md:px-[121px] px-[4vh] flex flex-col gap-3 justify-center items-center">

            <div className="flex flex-wrap justify-center items-start  flex-row  gap-5 ">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}

            </div>
        </section>
    )
}

export default Posts
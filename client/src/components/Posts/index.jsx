import React from 'react'
import PostCard from '../PostCard'

const Posts = ({posts, isWidget, isPost}) => {
    return (
        <section className={` ${!isPost && 'md:pb-[56px]  pb-[37px]'}   flex flex-col gap-3 justify-center items-center w-full`}>
            <div className={`flex ${isPost ? 'flex-row' : 'flex-col'} justify-center items-start   ${isWidget ? 'gap-[2vh]' : 'gap-[5vh]'}  w-full`}>
                {posts.map((post) => (
                    <PostCard isWidget={isWidget} key={post.id} post={post} />
                ))}
            </div>
        </section>
    )
}

export default Posts
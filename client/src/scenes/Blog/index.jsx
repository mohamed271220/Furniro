import Banner from "../../components/Banner"
import CertiBanner from "../../components/CertiBanner"

const Blog = () => {
  return (
    <div>
      <Banner title={'Blog'} />


      {/* blog made into two columns */}

      <div className="flex flex-col gap-3 justify-center items-center 
      bg-[#f2f2f2] p-5 rounded-lg shadow-lg md:flex-row md:gap-0 md:justify-between md:items-center md:p-10 
      lg:p-20 xl:p-40 2xl:p-60 
      
      ">

        {/* search bar and categories under it and recent posts under that -pass them as query params like what we did with products  */}
        {/* thinking search param should stay here also data should be fetched here and passed to the other component */}

        <div className="w-[70%] bg-[#f2f2f2] p-5 rounded-lg shadow-lg md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] 
        ">
          md
          {/* loop over posts and paginate them -separate component */}
        </div>



        <div className="w-[30%] bg-[#f2f2f2] p-5 rounded-lg shadow-lg md:w-[40%] lg:w-[30%] xl:w-[20%] 2xl:w-[10%] 
        " >
          sm
        </div>

      </div>
      
      <CertiBanner />
    </div>
  )
}

export default Blog
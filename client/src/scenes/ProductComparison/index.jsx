import { useSelector } from "react-redux"
import Banner from "../../components/Banner"
import { useEffect, useState } from "react"
import { AiFillStar } from 'react-icons/ai'
import './index.css'
const ProductComparison = () => {
  const [loading, setLoading] = useState(false)

  const [firstItem, setFirstItem] = useState()
  const [secondItem, setSecondItem] = useState()

  const { itemOneId, itemTwoId } = useSelector(state => state.compare)

  useEffect(() => {

    getProducts()

  }, [])

  const getProducts = async () => {
    setLoading(true)
    if (itemOneId && itemTwoId) {
      // fetch both products
      const response1 = await fetch(`http://localhost:4000/shop/products/${itemOneId}`)
      const data1 = await response1.json()
      setFirstItem(data1)
      const response2 = await fetch(`http://localhost:4000/shop/products/${itemTwoId}`)
      const data2 = await response2.json()
      setSecondItem(data2)
      setLoading(false)

    }
    else if (itemOneId && !itemTwoId) {
      // fetch only first product
      const response1 = await fetch(`http://localhost:4000/shop/products/${itemOneId}`)

      const data1 = await response1.json()

      setFirstItem(data1)
      setLoading(false)

    }
    else if (!itemOneId && itemTwoId) {
      // fetch 2nd

      const response2 = await fetch(`http://localhost:4000/shop/products/${itemTwoId}`)
      const data2 = await response2.json()

      setSecondItem(data2)
      setLoading(false)

    }
    else {
      setLoading(false)

      return false
    }
    setLoading(false)

  }
  //http request to get the data for both products



  return (
    <div className="w-full flex flex-col items-center">
      <Banner title="Product Comparison" path={["Home", "Comparison"]} />


      <div className="header">

      </div>
      {loading && <div className="loader">Loading</div>}
      {!loading && <>


        <div className="w-full">
          <table className="w-[70%]
        m-[6vh]
        ">


            <tr className="border-none">
              <td className="border-none w-[33%]">
                <h3 className="font-semibold text-[4vh] pb-[4vh]">
                  Go to Product page for more
                  Products
                </h3>
                <span className="text-[#727272] text-[2.5vh] border-b-4 font-semibold ">
                  view more
                </span>
              </td>

              <td className="border-none">
                <img className="h-[30vh] w-[30vh] rounded-md " src={`http://localhost:4000/uploads${firstItem?.images[0]}`} alt="" />
                <h4 className="font-semibold text-[3vh] pt-[3vh] ">{firstItem?.title}</h4>
                <p className="font-semibold text-[2.5vh] ">$ {firstItem?.price}</p>
                <p className=" pt-[2vh] text-[2.5vh] flex flex-row   items-center">{firstItem?.rating}<AiFillStar className="text-dim-yellow mr-[1.5vh] " />  | <span className="text-[1.5vh]">{firstItem?.reviews.length} reviews</span> </p>
              </td>

              <td className="border-none">
                <img className="h-[30vh] w-[30vh] rounded-md " src={`http://localhost:4000/uploads${secondItem?.images[0]}`} alt="" />
                <h4 className="font-semibold text-[3vh] pt-[3vh] ">{secondItem?.title}</h4>
                <p className="font-semibold text-[2.5vh] ">{secondItem?.price}</p>
                <p className=" pt-[2vh] text-[2.5vh] flex flex-row  items-center">
                {secondItem?.rating}<AiFillStar className="text-dim-yellow mr-[1.5vh]" /> | <span className="text-[1.5vh]">{secondItem?.reviews.length} reviews</span> </p>
              </td>
            </tr>


            <tr>
              <th>
                title

              </th>

              <td>{firstItem ? firstItem.title : '__'}</td>
              <td>{secondItem ? secondItem.title : '__'}</td>

            </tr>

            <tr>
              <th>
                price
              </th>

              <td>
                {firstItem ? firstItem.price : '__'}
              </td>
              <td>
                {secondItem ? secondItem.price : '__'}
              </td>

            </tr>
            <tr>
              <th>

                sale
              </th>
              <td>{firstItem ? firstItem.sale : '__'}</td>
              <td>
                {secondItem ? secondItem.sale : '__'}
              </td>

            </tr>
            <tr>
              <th>
                rating

              </th>
              <td>
                {firstItem ? firstItem.rating : '__'}
              </td>
              <td>{secondItem ? secondItem.rating : '__'}</td>
            </tr>
            <tr>
              <th>

                salesPackage
              </th>
              <td>
                {firstItem ? firstItem.salesPackage : '__'}
              </td>
              <td>
                {secondItem ? secondItem.salesPackage : '__'}
              </td>
            </tr>
            <tr>

              <th>

                modal
              </th>
              <td>{firstItem ? firstItem.modal : '__'}</td>
              <td>{secondItem ? secondItem.modal : '__'}</td>
            </tr>

            <tr>
              <th>

                secondaryMat
              </th>
              <td>{firstItem ? firstItem.secondaryMat : '__'}</td>
              <td>{secondItem ? secondItem.secondaryMat : '__'}</td>
            </tr>
            <tr>
              <th>
                config

              </th>
              <td>{firstItem ? firstItem.config : '__'}</td>
              <td>{secondItem ? secondItem.config : '__'}</td>
            </tr>
            <tr>
              <th>

                color
              </th>
              <td>{firstItem ? firstItem.color[0].c : '__'}</td>
              <td>{secondItem ? secondItem.color[0].c : '__'}</td>
            </tr>
            <tr>
              <th>
                fillingMat
              </th>
              <td>{firstItem ? firstItem.fillingMat : '__'}</td>
              <td>

                {secondItem ? secondItem.fillingMat : '__'}
              </td>
            </tr>
            <tr>
              <th>
                load
              </th>
              <td>{firstItem ? firstItem.load : '__'}</td>
              <td>

                {secondItem ? secondItem.load : '__'}
              </td>
            </tr>
            <tr>
              <th>
                origin
              </th>
              <td>{firstItem ? firstItem.origin : '__'}</td>
              <td>

                {secondItem ? secondItem.origin : '__'}
              </td>
            </tr>
            <tr>
              <th>
                width
              </th>
              <td>{firstItem ? firstItem.width : '__'}</td>
              <td>

                {secondItem ? secondItem.width : '__'}
              </td>
            </tr>
            <tr>
              <th>
                height
              </th>
              <td>{firstItem ? firstItem.height : '__'}</td>
              <td>

                {secondItem ? secondItem.height : '__'}
              </td>
            </tr>
            <tr>
              <th>
                depth
              </th>
              <td>{firstItem ? firstItem.depth : '__'}</td>
              <td>

                {secondItem ? secondItem.depth : '__'}
              </td>
            </tr>
            <tr>
              <th>
                weight
              </th>
              <td>{firstItem ? firstItem.weight : '__'}</td>
              <td>

                {secondItem ? secondItem.weight : '__'}
              </td>
            </tr>
            <tr>
              <th>
                seatHeight
              </th>
              <td>{firstItem ? firstItem.seatHeight : '__'}</td>
              <td>

                {secondItem ? secondItem.seatHeight : '__'}
              </td>
            </tr>
            <tr>
              <th>
                legHeight
              </th>
              <td>{firstItem ? firstItem.legHeight : '__'}</td>
              <td>

                {secondItem ? secondItem.legHeight : '__'}
              </td>
            </tr>
            <tr>
              <th>
                status
              </th>
              <td>{firstItem ? firstItem.status : '__'}</td>
              <td>

                {secondItem ? secondItem.status : '__'}
              </td>
            </tr>
          </table>

        </div>


      </>}

    </div>
  )
}

export default ProductComparison








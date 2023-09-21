import { useSelector } from "react-redux"
import Banner from "../../components/Banner"
import { useEffect, useState } from "react"
import './index.css'
const ProductComparison = () => {

  const [firstItem, setFirstItem] = useState()
  const [secondItem, setSecondItem] = useState()

  const { itemOneId, itemTwoId } = useSelector(state => state.compare)

  useEffect(() => {

    getProducts()

  })

  const getProducts = async () => {
    if (itemOneId && itemTwoId) {
      // fetch both products
      const response1 = await fetch(`http://localhost:4000/shop/products/${itemOneId}`)
      const data1 = await response1.json()
      setFirstItem(data1)

      const response2 = await fetch(`http://localhost:4000/shop/products/${itemTwoId}`)
      const data2 = await response2.json()
      setSecondItem(data2)
    }
    else if (itemOneId && !itemTwoId) {
      // fetch only first product
      const response1 = await fetch(`http://localhost:4000/shop/products/${itemOneId}`)

      const data1 = await response1.json()

      setFirstItem(data1)
    }
    else if (!itemOneId && itemTwoId) {
      // fetch 2nd

      const response2 = await fetch(`http://localhost:4000/shop/products/${itemTwoId}`)
      const data2 = await response2.json()

      setSecondItem(data2)
    }
    else {
      return false
    }
  }
  //http request to get the data for both products

  return (
    <div className="w-full flex flex-col items-center">
      <Banner title="Product Comparison" path={["Home", "Comparison"]} />


      <div className="header">

      </div>

      <div className="w-full">
        <table className="w-[70%]
        m-[6vh]
        ">


          <tr>
            <td>
              <h3>

                Go to Product page for more
                Products

                <span>
                  view more
                </span>
              </h3>
            </td>

            <td>
              <img src="" alt="" />
              <h4>title</h4>
              <p>price</p>
              <p>rating</p>
            </td>

            <td>
              <img src="" alt="" />
              <h4>title</h4>
              <p>price</p>
              <p>rating</p>
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
            <td>{firstItem ? firstItem.color : '__'}</td>
            <td>{secondItem ? secondItem.color : '__'}</td>
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



    </div>
  )
}

export default ProductComparison








import { useSelector } from "react-redux"
import Banner from "../../components/Banner"
import { useEffect, useState } from "react"
const ProductComparison = () => {

  const [firstItem, setFirstItem] = useState([])
  const [secondItem, setSecondItem] = useState([])

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


      <div className="">
        <table>
          {firstItem && secondItem && <>
            <tr className="header">
              <th>
                <p>
                  Go to Product page for more
                  Products
                </p>
                <span>
                  view more
                </span>
              </th>
            </tr>
            <tr>
              <th>
                title

              </th>

              <td>{firstItem.title}</td>
              <td>{secondItem.title}</td>

            </tr>

            <tr>
              <th>
                price
              </th>

              <td>
                {firstItem.price}
              </td>
              <td>
                {secondItem.price}
              </td>

            </tr>
            <tr>
              <th>

                sale
              </th>
              <td>{firstItem.sale}</td>
              <td>
                {secondItem.sale}
              </td>

            </tr>
            <tr>
              <th>
                rating

              </th>
              <td>
                {firstItem.rating}
              </td>
              <td>{secondItem.rating}</td>
            </tr>
            <tr>
              <th>

                salesPackage
              </th>
              <td>
                {firstItem.salesPackage}
              </td>
              <td>
                {secondItem.salesPackage}
              </td>
            </tr>
            <tr>

              <th>

                modal
              </th>
              <td>{firstItem.modal}</td>
              <td>{secondItem.modal}</td>
            </tr>

            <tr>
              <th>

                secondaryMat
              </th>
              <td>{firstItem.secondaryMat}</td>
              <td>{secondItem.secondaryMat}</td>
            </tr>
            <tr>
              <th>
                config

              </th>
              <td>{firstItem.config}</td>
              <td>{secondItem.config}</td>
            </tr>
            <tr>
              <th>

                color
              </th>
              <td>{firstItem.color}</td>
              <td>{secondItem.color}</td>
            </tr>
            <tr>
              <th>
                fillingMat
              </th>
              <td>{firstItem.fillingMat}</td>
              <td></td>{secondItem.fillingMat}</tr>
            <tr>
              <th>
                load
              </th>
              <td>{firstItem.load}</td>
              <td></td>{secondItem.load}</tr>
            <tr>
              <th>
                origin
              </th>
              <td>{firstItem.origin}</td>
              <td></td>{secondItem.origin}</tr>
            <tr>
              <th>
                width
              </th>
              <td>{firstItem.width}</td>
              <td></td>{secondItem.width}</tr>
            <tr>
              <th>
                height
              </th>
              <td>{firstItem.height}</td>
              <td></td>{secondItem.height}</tr>
            <tr>
              <th>
                depth
              </th>
              <td>{firstItem.depth}</td>
              <td></td>{secondItem.depth}</tr>
            <tr>
              <th>
                weight
              </th>
              <td>{firstItem.weight}</td>
              <td></td>{secondItem.weight}</tr>
            <tr>
              <th>
                seatHeight
              </th>
              <td>{firstItem.seatHeight}</td>
              <td></td>{secondItem.seatHeight}</tr>
            <tr>
              <th>
                legHeight
              </th>
              <td>{firstItem.legHeight}</td>
              <td></td>{secondItem.legHeight}</tr>
            <tr>
              <th>
                status
              </th>
              <td>{firstItem.status}</td>
              <td></td>{secondItem.status}</tr>
          </>}
        </table>

      </div>


    </div>
  )
}

export default ProductComparison








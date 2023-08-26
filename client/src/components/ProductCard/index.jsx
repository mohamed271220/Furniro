import Ex from "../../assets/images/Ex.png";
const Card = ({ product }) => {
  return (
    <div  className="relative">


{/* underlying section  */}
    <div>
      <img src={Ex} className="w-[30vh]" alt=" " />
      <div>
        <h3>{product.title}</h3>
        <p>{product.ShortDescription}</p>
        <div>
          <p>{product.price - product.price * product.sale}</p>
          <p>
            <s>{product.price}</s>
          </p>
        </div>
      </div>
    </div>

<div className="h-full w-[30vh] p-10 absolute opacity-0  bg-slate-950 text-white bottom-0 transition-all
hover:cursor-pointer hover:bottom-30 hover:h-220 hover:opacity-100 ">
    <button>Add to cart</button>
    <div className="  text-20">
        <p>Something</p>
        <p>something</p>
        <p>something</p>
    </div>
</div>

    </div>
  );
};

export default Card;

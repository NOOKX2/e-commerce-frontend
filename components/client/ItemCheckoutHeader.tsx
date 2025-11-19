
function ItemCheckoutHeader() {
  return (
    <div className='flex justify-between items-center text-sm font-semibold text-gray-500 px-4'>
      <p className="flex-1">Product</p>
      <div className='flex items-center gap-8 md:gap-12'>
        <p className="w-24 text-center">Price</p>
        <p className="w-16 text-center">Quantity</p>
      </div>
    </div>
  )
}

export default ItemCheckoutHeader


function ItemCheckoutHeader() {
  return (
    <div className='hidden items-center justify-between px-4 text-sm font-semibold text-gray-500 md:flex'>
      <p className="flex-1">Product</p>
      <div className='flex items-center gap-8 md:gap-12'>
        <p className="w-24 text-center">Price</p>
        <p className="w-16 text-center">Quantity</p>
      </div>
    </div>
  )
}

export default ItemCheckoutHeader

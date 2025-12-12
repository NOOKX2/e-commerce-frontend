import Link from "next/link";

export default function OrderEmptyState() {
  return (
    <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <div className="text-6xl mb-4">📦</div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
      <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
      <Link
        href="/"
        className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Start Shopping
      </Link>
    </div>
  );
}
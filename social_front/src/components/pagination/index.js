
export default function Pagination({nCarta, setNCarta}) {
  return (
    <div className="mt-6 max-w-md rounded-xl mx-auto flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between">
        <a
          href="#"
           onClick={() => {
          setNCarta(Number(nCarta) - 1)
          }}

          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previo
        </a>
        <div className="text-2xl antialiased text-inherit"> <input className="w-12" type="text" name={nCarta} onChange={(e) => setNCarta(e.target.value ).clear} value={nCarta}></input> </div>
        <a
          href="#"
           onClick={() => {
          setNCarta(Number(nCarta) + 1)
          }}          
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Prossimo
        </a>
      </div>
    </div>
  )
}

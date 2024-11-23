import { ChevronLeft, ChevronRight } from 'lucide-react'


type Props = {}

const PaginationFooter = ({ currentPage, totalPages, onPageChange }: any) => (
    <div className="flex items-center justify-between px-4 py-3 border-t dark:border-gray-700">
      <div className="flex items-center">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Page <span className="font-medium">{currentPage}</span> of{" "}
          <span className="font-medium">{totalPages}</span>
        </p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md border dark:border-gray-700 disabled:opacity-50 
                   disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700
                   dark:bg-gray-800 dark:text-gray-300"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md border dark:border-gray-700 disabled:opacity-50 
                   disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700
                   dark:bg-gray-800 dark:text-gray-300"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )

export default PaginationFooter
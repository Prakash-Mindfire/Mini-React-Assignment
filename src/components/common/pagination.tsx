import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

type Props = {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
};

const Pagination = ({ page, totalPages, onChange }: Props) => {
    if (totalPages <= 1) return null;

    return (
        <div className="pagination" style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button disabled={page === 1} onClick={() => onChange(page - 1)}>
                <FiArrowLeft style={{verticalAlign:"middle"}}/> Prev
            </button>

            <span>
                Page {page} of {totalPages}
            </span>

            <button
                disabled={page === totalPages}
                onClick={() => onChange(page + 1)}
            >
                Next <FiArrowRight style={{verticalAlign:"middle"}}/>
            </button>
        </div>
    );
};

export default Pagination;

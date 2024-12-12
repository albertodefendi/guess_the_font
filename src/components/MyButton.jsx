export default function MyButton({ children, onClickFunction, className }) {
    return (
        <>
            <button
                className={`bg-custom-black-1 text-custom-violet rounded-lg h-fit py-2 px-6 hover:bg-custom-black-2 hover:text-custom-green duration-100 active:scale-[90%] ${className ? className : ""}`}
                onClick={onClickFunction}
            >
                {children}
            </button>
        </>
    )
}
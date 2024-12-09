export default function MyButton({ children, onClickFunction, classNames }) {
    return (
        <>
            <button
                className={`bg-custom-black text-custom-violet rounded-lg h-fit py-4 px-8 hover:bg-custom-black-1 hover:text-custom-green duration-100 active:scale-[90%] ${classNames}`}
                onClick={onClickFunction}
            >
                {children}
            </button>
        </>
    )
}